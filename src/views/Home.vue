<template>
  <div class="flex h-screen bg-black text-white">
    <!-- Left Sidebar -->
    <aside class="w-1/5 p-4 bg-black">
      <div class="flex flex-col items-start">
        <img src="https://via.placeholder.com/50" alt="Logo" class="mb-4">
        <nav class="flex flex-col space-y-4">
          <a href="#" class="flex items-center space-x-3 text-xl">
            <MdiHome />
            <span>Home</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-xl">
            <MdiMagnify />
            <span>Explore</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-xl">
            <MdiBell />
            <span>Notifications</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-xl">
            <MdiEmail />
            <span>Messages</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-xl">
            <MdiBookmark />
            <span>Bookmarks</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-xl">
            <MdiAccountGroup />
            <span>Communities</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-xl">
            <MdiCrown />
            <span>Premium</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-xl">
            <MdiCheckCircle />
            <span>Verified Orgs</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-xl">
            <MdiAccount />
            <span>Profile</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-xl">
            <MdiDotsHorizontal />
            <span>More</span>
          </a>
          <button class="mt-4 px-4 py-2 bg-blue-500 rounded-full text-xl">Tweet</button>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="w-3/5 border-x border-gray-700 overflow-y-auto custom-scrollbar">
      <div class="sticky top-0 z-10 bg-black bg-opacity-25 backdrop-filter backdrop-blur-lg">
        <div class="flex justify-between items-center px-4 py-2 border-b border-gray-700">
          <h1 class="text-2xl font-bold">Home</h1>
        </div>
        <div class="flex justify-around py-2 border-b border-gray-700">
          <button class="text-white font-semibold border-b-2 border-blue-500 pb-2">For you</button>
          <button class="text-gray-500 pb-2">Following</button>
        </div>
      </div>
      <div class="p-4">
        <div class="mb-4 p-4 border border-gray-700 rounded-lg">
          <textarea
            v-model="newTweetContent"
            placeholder="What is happening?!"
            class="w-full p-2 bg-black border-none rounded-lg text-white resize-none transparent-border"
            @input="handleInput"
          ></textarea>
          <div class="flex justify-between items-center mt-2">
            <div class="flex space-x-2">
              <MdiImage />
              <MdiVideo />
              <MdiPoll />
              <MdiTarget />
              <MdiClock />
              <MdiMapMarker />
            </div>
            <button @click="postTweet" class="px-4 py-2 bg-blue-500 rounded-full">Post</button>
          </div>
        </div>
        <transition-group name="fade" tag="div">
          <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
        </transition-group>
      </div>
    </main>

    <!-- Right Sidebar -->
    <aside class="w-1/5 bg-black custom-scrollbar overflow-y-auto p-4">
      <div class="sticky top-0 z-10 bg-black bg-opacity-25 backdrop-filter backdrop-blur-lg">
        <div class="p-4">
          <input type="text" placeholder="Search" class="w-full p-2 bg-black border border-gray-700 rounded-full text-white">
        </div>
      </div>
      <div class="mb-4 p-4 bg-black rounded-lg border border-gray-700">
        <h2 class="text-xl font-bold mb-2">Subscribe to Premium</h2>
        <p>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <button class="mt-2 px-4 py-2 bg-blue-500 rounded-full">Subscribe</button>
      </div>
      <div class="p-4 bg-black rounded-lg border border-gray-700">
        <h2 class="text-xl font-bold mb-2">Trends for you</h2>
        <ul>
          <li v-for="trend in trends" :key="trend.id" class="mb-2">
            <a href="#" class="text-blue-500">{{ trend.topic }}</a>
            <p class="text-gray-500">{{ trend.tweets }} Tweets</p>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Tweet from '../components/Tweet.vue'
import { IAddTweetParams, ITweet } from '../types/services/post'

import MdiHome from 'vue-material-design-icons/Home.vue'
import MdiMagnify from 'vue-material-design-icons/Magnify.vue'
import MdiBell from 'vue-material-design-icons/Bell.vue'
import MdiEmail from 'vue-material-design-icons/Email.vue'
import MdiBookmark from 'vue-material-design-icons/Bookmark.vue'
import MdiAccountGroup from 'vue-material-design-icons/AccountGroup.vue'
import MdiCrown from 'vue-material-design-icons/Crown.vue'
import MdiCheckCircle from 'vue-material-design-icons/CheckCircle.vue'
import MdiAccount from 'vue-material-design-icons/Account.vue'
import MdiDotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue'
import MdiImage from 'vue-material-design-icons/Image.vue'
import MdiVideo from 'vue-material-design-icons/Video.vue'
import MdiPoll from 'vue-material-design-icons/Poll.vue'
import MdiTarget from 'vue-material-design-icons/Target.vue'
import MdiClock from 'vue-material-design-icons/Clock.vue'
import MdiMapMarker from 'vue-material-design-icons/MapMarker.vue'

import { usePostStore } from '../stores/post'

const tweets = ref<Array<ITweet>>([])
const trends = ref([])
const newTweetContent = ref('')

const postStore = usePostStore()

onMounted(() => {
  fetchTrends()
})

function fetchTrends() {
  trends.value = [
    { id: 1, topic: 'Japan', tweets: '510K' },
    { id: 2, topic: 'Telegram', tweets: '826K' },
    { id: 3, topic: '#China', tweets: '16.8K' },
    { id: 4, topic: 'Taipei', tweets: '11.1K' },
    { id: 5, topic: '#Web3', tweets: '41K' },
    { id: 6, topic: '#zzzero', tweets: '235K' },
    { id: 1, topic: 'Japan', tweets: '510K' },
    { id: 2, topic: 'Telegram', tweets: '826K' },
    { id: 3, topic: '#China', tweets: '16.8K' },
    { id: 4, topic: 'Taipei', tweets: '11.1K' },
    { id: 5, topic: '#Web3', tweets: '41K' },
    { id: 6, topic: '#zzzero', tweets: '235K' },
    { id: 1, topic: 'Japan', tweets: '510K' },
    { id: 2, topic: 'Telegram', tweets: '826K' },
    { id: 3, topic: '#China', tweets: '16.8K' },
    { id: 4, topic: 'Taipei', tweets: '11.1K' },
    { id: 5, topic: '#Web3', tweets: '41K' },
    { id: 6, topic: '#zzzero', tweets: '235K' },
  ]
}

async function postTweet() {
  if (newTweetContent.value.trim() !== '') {
    const newTweet: IAddTweetParams = {
      createdAt: Date.now().toString(),
      username: 'Akashic',
      userId: '@Akashic2046',
      profilePicture: 'https://via.placeholder.com/50',
      content: newTweetContent.value,
      comments: 0,
      retweets: 0,
      likes: 0,
      views: 0,
    }

    // Send newTweet to the backend
    const res = await postStore.doAddTweet(newTweet)
    console.log('res', res)
    if (res) {
      tweets.value.unshift(res.data)
      newTweetContent.value = ''
      const textarea = document.querySelector('textarea')!;
      textarea.value = ''; // Reset the content
      adjustTextareaHeight(textarea);
    } else {
      console.error('Failed to post tweet:', res.message)
    }
  }
}

async function getAllTweet() {
  const res = await postStore.fetchAllTweet()
  console.log('res.data', res.data)
  if (!res) return
  tweets.value = res.data || []
  
  console.log('tweets.value', tweets.value)
  console.log('tweets.value[0]', tweets.value)
}

function handleInput(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  adjustTextareaHeight(textarea);
}

function adjustTextareaHeight(textarea: HTMLTextAreaElement) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

getAllTweet()
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

/* Additional styles */
textarea {
  resize: none; /* Prevent resizing */
  border: none; /* Remove default border */
}

.transparent-border {
  border: none; /* No border */
  outline: none; /* No outline */
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
