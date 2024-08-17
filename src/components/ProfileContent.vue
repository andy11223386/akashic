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
          <button @click="openEditProfile" class="px-4 py-2 bg-black border border-gray-700 rounded-full text-white">Edit profile</button>
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

          </div>
          <div v-else-if="selectedTab === 'Likes'" key="likes">
            <Tweet v-for="tweet in likeTweet" :key="tweet._id" :tweet="tweet" />
          </div>
        </transition>
      </div>
    </div>
    <EditProfileDialog v-if="showEditDialog" :profil="profile" @close="closeEditDialog" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Tweet from '../components/Tweet.vue'
import MdiArrowLeft from 'vue-material-design-icons/ArrowLeft.vue'
import EditProfileDialog from '../components/EditProfileDialog.vue'
import { IGetHistoryTweetParams, ITweet } from '../types/services/post'
import { usePostStore } from '../stores/post'
import { useUserStore } from '../stores/user'

const tweets = ref<Array<ITweet>>([])
const historyTweet = ref<Array<ITweet>>([])
const likeTweet = ref<Array<ITweet>>([])
const retweets = ref<Array<ITweet>>([])
const viewedTweet = ref<string[]>([])
const postStore = usePostStore()
const userStore = useUserStore()
const tabs = ['Posts', 'Replies', 'Retweet', 'Histories', 'Media', 'Likes']
const selectedTab = ref('Posts')
const showEditDialog = ref(false)

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

onMounted(() => {
  const pro = JSON.parse(localStorage.getItem('profile') as string)

  profile.value = {
    username: pro.username,
    nickname: pro.nickname,
    bio: pro.bio,
    followingsCount: pro.followingsCount,
    followersCount: pro.followersCount,
    createdAt: pro.createdAt,
    postsCount: 0,
    profilePicture: pro.profilePicture
  }

  console.log('profile.value', profile.value.profilePicture)
  fetchMyTweets()
  fetchProfile()
  fetchHistoryTweets()
  fetchMyRetweet()
})

function openEditProfile() {
  showEditDialog.value = true
}

function closeEditDialog() {
  showEditDialog.value = false;
  fetchProfile()
  fetchMyTweets()
}

async function fetchHistoryTweets() {
  const storedViewedTweet = localStorage.getItem('viewedTweet')
  if (storedViewedTweet) {
    viewedTweet.value = JSON.parse(storedViewedTweet)
  }

  const getHistoryTweetParams: IGetHistoryTweetParams = {
    _ids: viewedTweet.value
  }
  console.log('getHistoryTweet', getHistoryTweetParams)

  const res = await postStore.fetchHistoryTweet(getHistoryTweetParams)
  if (!res) return
  historyTweet.value = res.data || []
}

async function fetchMyRetweet() {
  const res = await postStore.fetchMyRetweet()
  if (!res) return
  retweets.value = res.data || []
}

async function fetchMyTweets() {
  const res = await postStore.fetchMyTweet()
  if (!res) return
  tweets.value = res.data || []
}
async function fetchProfile() {
  const res = await userStore.fetchProfile()
  console.log('res', res.data)
  if (!res) return
  profile.value = {
      username: res.data.username,
      nickname: res.data.nickname,
      bio: res.data.bio,
      followingsCount: res.data.followingsCount,
      followersCount: res.data.followersCount,
      postsCount: 0,
      createdAt: res.data.createdAt,
      profilePicture: res.data.profilePicture,
    };
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Custom scroll bar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 12px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 3px solid #1a1a1a;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
}

.avatar-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  left: 16px;
  transform: translateY(50%);
  border: 4px solid black;
}

</style>
