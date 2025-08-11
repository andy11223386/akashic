<!-- src/views/ProfileContent.vue -->
<template>
  <main class="w-3/5 border-x border-gray-700 overflow-y-auto custom-scrollbar">
    <div class="sticky top-0 z-10 bg-black bg-opacity-25 backdrop-filter backdrop-blur-lg">
      <div class="flex items-center px-4 py-2 border-b border-gray-700">
        <MdiArrowLeft class="text-white" />
        <div class="ml-4">
          <h1 class="text-2xl font-bold">{{ profile.nickname || profile.username }}</h1>
          <p class="text-gray-500">{{ profile.postsCount }} posts</p>
        </div>
      </div>
    </div>

    <div>
      <div class="relative">
        <img src="https://pbs.twimg.com/profile_banners/1768877240664911872/1710601034/1500x500" alt="Banner" class="w-full">
        <img :src="profile.profilePicture" alt="Avatar" class="avatar-img">
      </div>

      <div class="px-4 mt-12">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold">{{ profile.nickname || profile.username }}</h2>
            <p class="text-gray-500">@{{ profile.username }}</p>
            <p class="mt-2">{{ profile.bio }}</p>
            <p class="text-gray-500 mt-2">Joined {{ profile.createdAt }}</p>
            <p class="mt-2 text-gray-500">{{ profile.followingsCount }} Followings {{ profile.followersCount }} Followers</p>
          </div>

          <!-- ✅ 只有本人可編輯 -->
          <button
            v-if="isMe"
            @click="openEditProfile"
            class="px-4 py-2 bg-black border border-gray-700 rounded-full text-white"
          >
            Edit profile
          </button>
        </div>

        <div class="mt-4">
          <ul class="flex justify-between space-x-1 text-gray-500 w-full">
            <li
              v-for="(tab, index) in tabs"
              :key="index"
              :class="{'font-bold text-white border-b-4 border-blue-500': selectedTab === tab, 'text-gray-500': selectedTab !== tab}"
              class="flex-1 text-center cursor-pointer py-2"
              @click="selectedTab = tab"
            >
              {{ tab }}
            </li>
          </ul>
        </div>
      </div>

      <div class="px-4 py-4">
        <transition name="fade" tag="div">
          <div v-if="selectedTab === 'Posts'" key="posts">
            <Tweet v-for="tweet in tweets" :key="tweet._id" :tweet="tweet" />
          </div>
          <div v-else-if="selectedTab === 'Replies'" key="replies">
            <Tweet v-for="tweet in tweets" :key="tweet._id" :tweet="tweet" />
          </div>
          <div v-else-if="selectedTab === 'Retweet'" key="retweet">
            <Tweet v-for="tweet in retweets" :key="tweet._id" :tweet="tweet" />
          </div>
          <div v-else-if="selectedTab === 'Histories'" key="histories">
            <Tweet v-for="tweet in historyTweet" :key="tweet._id" :tweet="tweet" />
          </div>
          <div v-else-if="selectedTab === 'Media'" key="media">
            <!-- 你的 Media 區塊 -->
          </div>
          <div v-else-if="selectedTab === 'Likes'" key="likes">
            <Tweet v-for="tweet in likeTweet" :key="tweet._id" :tweet="tweet" />
          </div>
        </transition>
      </div>
    </div>

    <!-- ✅ 只有本人才會掛 Edit Dialog；也修正 props 名稱拼字 -->
    <EditProfileDialog
      v-if="isMe && showEditDialog"
      :profile="profile"
      @close="closeEditDialog"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Tweet from '../components/Tweet.vue'
import MdiArrowLeft from 'vue-material-design-icons/ArrowLeft.vue'
import EditProfileDialog from '../components/EditProfileDialog.vue'
import { IGetHistoryTweetParams, ITweet } from '../types/services/post'
import { usePostStore } from '../stores/post'
import { useUserStore } from '../stores/user'

const route = useRoute()
const postStore = usePostStore()
const userStore = useUserStore()

const tabs = ['Posts', 'Replies', 'Retweet', 'Histories', 'Media', 'Likes']
const selectedTab = ref('Posts')

const showEditDialog = ref(false)
const tweets = ref<Array<ITweet>>([])
const historyTweet = ref<Array<ITweet>>([])
const likeTweet = ref<Array<ITweet>>([])
const retweets = ref<Array<ITweet>>([])
const viewedTweet = ref<string[]>([])

const profile = ref({
  username: '',
  nickname: '',
  bio: '',
  followingsCount: 0,
  followersCount: 0,
  postsCount: 0,
  createdAt: '',
  profilePicture: '',
})

// 目前網址上的使用者
const routeUsername = computed(() => (route.params.username as string) || '')

// 登入者（自己）
const me = computed(() => {
  const saved = JSON.parse(localStorage.getItem('profile') || '{}')
  return { username: saved?.username || '' }
})

// ✅ 是否檢視自己的頁面
const isMe = computed(() => routeUsername.value && routeUsername.value === me.value.username)

onMounted(() => {
  // 第一次載入
  hydrateAll()
})

// 切換 /profile/:username 時自動重載
watch(routeUsername, () => {
  selectedTab.value = 'Posts'
  hydrateAll()
})

function openEditProfile() {
  showEditDialog.value = true
}

function closeEditDialog() {
  showEditDialog.value = false
  // 關閉後重抓個資與 Posts
  fetchProfile()
  fetchPosts()
}

function hydrateAll() {
  fetchProfile()
  fetchPosts()
  fetchHistoryTweets()
  fetchRetweets()
  fetchLikes()
}

async function fetchProfile() {
  // ✅ 本人/他人用不同 API
  const res = isMe.value
    ? await userStore.fetchProfile()
    : await userStore.fetchProfileByUsername(routeUsername.value)

  if (!res) return
  const d = res.data
  profile.value = {
    username: d.username,
    nickname: d.nickname,
    bio: d.bio,
    followingsCount: d.followingsCount,
    followersCount: d.followersCount,
    postsCount: d.postsCount ?? 0,
    createdAt: d.createdAt,
    profilePicture: d.profilePicture,
  }
}

async function fetchPosts() {
  const res = isMe.value
    ? await postStore.fetchMyTweet()
    : await postStore.fetchUserTweet(routeUsername.value)
  if (!res) return
  tweets.value = res.data || []
}

async function fetchRetweets() {
  const res = isMe.value
    ? await postStore.fetchMyRetweet()
    : await postStore.fetchUserRetweet(routeUsername.value)
  if (!res) return
  retweets.value = res.data || []
}

async function fetchLikes() {
  const res = isMe.value
    ? await postStore.fetchMyLikeTweet()
    : await postStore.fetchUserLikeTweet(routeUsername.value)
  if (!res) return
  likeTweet.value = res.data || []
}

async function fetchHistoryTweets() {
  // Histories 是「我」看過的貼文；不需分本人/他人
  const storedViewedTweet = localStorage.getItem('viewedTweet')
  if (storedViewedTweet) {
    viewedTweet.value = JSON.parse(storedViewedTweet)
  }
  const params: IGetHistoryTweetParams = { _ids: viewedTweet.value }
  const res = await postStore.fetchHistoryTweet(params)
  if (!res) return
  historyTweet.value = res.data || []
}
</script>

<style scoped>
/* 你的原樣式保留 */
.container { max-width: 1200px; margin: auto; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.custom-scrollbar::-webkit-scrollbar { width: 12px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #1a1a1a; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: #888; border-radius: 10px; border: 3px solid #1a1a1a; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #555; }
.sticky { position: -webkit-sticky; position: sticky; top: 0; z-index: 10; }
.avatar-img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; position: absolute; bottom: 0; left: 16px; transform: translateY(50%); border: 4px solid black; }
</style>
