<template>
  <div class="flex h-screen bg-gray-900 text-white">
    <!-- Left Sidebar -->
    <aside class="w-1/5 p-4 bg-gray-800">
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
    <main class="w-3/5 border-x border-gray-700 overflow-y-auto">
      <div class="sticky top-0 z-10 bg-gray-900 bg-opacity-25 backdrop-filter backdrop-blur-lg">
        <div class="flex justify-around py-2 border-b border-gray-700">
          <button class="text-white font-semibold border-b-2 border-blue-500 pb-2">For you</button>
          <button class="text-gray-500 pb-2">Following</button>
        </div>
      </div>
      <div class="p-4">
        <div class="mb-4 p-4 border border-gray-700 rounded-lg">
          <textarea placeholder="What is happening?!" class="w-full p-2 bg-gray-800 border-none rounded-lg text-white"></textarea>
          <div class="flex justify-between items-center mt-2">
            <div class="flex space-x-2">
              <MdiImage />
              <MdiVideo />
              <MdiPoll />
              <MdiTarget />
              <MdiClock />
              <MdiMapMarker />
            </div>
            <button class="px-4 py-2 bg-blue-500 rounded-full">Post</button>
          </div>
        </div>
        <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
      </div>
    </main>

    <!-- Right Sidebar -->
    <aside class="w-1/5 p-4 bg-gray-800">
      <div class="mb-4">
        <input type="text" placeholder="Search" class="w-full p-2 bg-gray-900 border border-gray-700 rounded-full text-white">
      </div>
      <div class="mb-4 p-4 bg-gray-900 rounded-lg">
        <h2 class="text-xl font-bold mb-2">Subscribe to Premium</h2>
        <p>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <button class="mt-2 px-4 py-2 bg-blue-500 rounded-full">Subscribe</button>
      </div>
      <div>
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

<script setup>
import { ref, onMounted } from 'vue'
import Tweet from '../components/Tweet.vue'

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

const tweets = ref([])
const trends = ref([])

onMounted(() => {
  fetchTweets()
  fetchTrends()
})

function fetchTweets() {
  tweets.value = [
    { id: 1, username: 'John Doe', handle: '@johndoe', avatar: 'https://via.placeholder.com/50', content: 'This is a tweet content.', image: 'https://via.placeholder.com/600', comments: 430, retweets: 11000, likes: 155000, views: 2900000 },
    { id: 2, username: 'Jane Smith', handle: '@janesmith', avatar: 'https://via.placeholder.com/50', content: 'This is another tweet content.', comments: 300, retweets: 9500, likes: 140000, views: 2600000 },
  ]
}

function fetchTrends() {
  trends.value = [
    { id: 1, topic: 'Japan', tweets: '510K' },
    { id: 2, topic: 'Telegram', tweets: '826K' },
    { id: 3, topic: '#China', tweets: '16.8K' },
    { id: 4, topic: 'Taipei', tweets: '11.1K' },
    { id: 5, topic: '#Web3', tweets: '41K' },
    { id: 6, topic: '#zzzero', tweets: '235K' },
  ]
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}
</style>
