//MainContent.vue
<template>
  <main class="w-3/5 border-x border-gray-700 overflow-y-auto custom-scrollbar" ref="mainContent" @scroll="handleScroll">
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
        <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="uploaded-image">
        <div class="flex justify-between items-center mt-2">
          <div class="flex space-x-2">
            <div class="icon-wrapper">
              <MdiImage @click="selectImage" />
            </div>
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
        <div v-for="tweet in tweets" :key="tweet._id" :ref="setTweetRef" class="tweet-container">
          <Tweet :tweet="tweet" />
        </div>
      </transition-group>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Tweet from '../components/Tweet.vue'
import { IAddTweetParams, ITweet } from '../types/services/post'

import MdiImage from 'vue-material-design-icons/Image.vue'
import MdiVideo from 'vue-material-design-icons/Video.vue'
import MdiPoll from 'vue-material-design-icons/Poll.vue'
import MdiTarget from 'vue-material-design-icons/Target.vue'
import MdiClock from 'vue-material-design-icons/Clock.vue'
import MdiMapMarker from 'vue-material-design-icons/MapMarker.vue'

import { usePostStore } from '../stores/post'
import { useUserStore } from '../stores/user'

const tweets = ref<Array<ITweet>>([])
const newTweetContent = ref('')
const imageUrl = ref('')
const currentTweet = ref(null)
const viewedTweet = ref([])
const tweetRefs = ref([])

const postStore = usePostStore()
const userStore = useUserStore()

const setTweetRef = el => {
  if (el) {
    tweetRefs.value.push(el)
  }
}

const mainContent = ref(null)

onMounted(() => {
  fetchTweets()
  initIntersectionObserver()
  mainContent.value.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  if (mainContent.value) {
    mainContent.value.removeEventListener('scroll', handleScroll)
  }
})

async function fetchTweets() {
  const res = await postStore.fetchAllTweet()
  if (!res) return
  tweets.value = res.data || []
}

async function postTweet() {
  if (newTweetContent.value.trim() !== '') {
    const username = localStorage.getItem('username')
    const newTweet: IAddTweetParams = {
      createdAt: Date.now().toString(),
      username: username,
      content: newTweetContent.value,
      comments: 0,
      retweets: 0,
      likes: [],
      views: 0,
      imageUrl: imageUrl.value, // Include image URL if available
    }

    const res = await postStore.doAddTweet(newTweet)
    if (res) {
      tweets.value.unshift(res.data)
      newTweetContent.value = ''
      imageUrl.value = ''
      const textarea = document.querySelector('textarea')!;
      textarea.value = ''; // Reset the content
      adjustTextareaHeight(textarea);
    } else {
      console.error('Failed to post tweet:', res.message)
    }
  }
}

function handleInput(event: Event) {
  const textarea = event.target as HTMLTextAreaElement
  adjustTextareaHeight(textarea)
}

function adjustTextareaHeight(textarea: HTMLTextAreaElement) {
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}

function selectImage() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async (event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      const imageUrlFromImgur = await uploadImageToImgur(file)
      if (imageUrlFromImgur) {
        imageUrl.value = imageUrlFromImgur
      }
    }
  }
  input.click()
}

async function uploadImageToImgur(file: File): Promise<string | null> {
  const clientId = 'YOUR_IMGUR_CLIENT_ID' // Replace with your Imgur client ID
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
      body: formData,
    })

    const data = await response.json()
    if (data.success) {
      return data.data.link
    } else {
      console.error('Imgur upload failed:', data)
      return null
    }
  } catch (error) {
    console.error('Imgur upload error:', error)
    return null
  }
}

let observer

function initIntersectionObserver() {
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentTweet.value = entry.target
      }
    })
  })

  tweetRefs.value.forEach(ref => {
    observer.observe(ref)
  })
}

function handleScroll() {
  const currentTopTweet = tweetRefs.value.find(ref => ref.getBoundingClientRect().top >= 0)
  if (currentTopTweet) {
    currentTweet.value = currentTopTweet
    const tweetId = currentTopTweet.querySelector('._id').innerText
    console.log('Current Tweet ID:', tweetId)
    
    // Check if the tweetId is in viewedTweet
    const index = viewedTweet.value.indexOf(tweetId)
    if (index === -1) {
      // If tweetId is not in viewedTweet, push it to the end
      viewedTweet.value.push(tweetId)
    } else {
      // If tweetId is already in viewedTweet, move it to the end
      viewedTweet.value.splice(index, 1)
      viewedTweet.value.push(tweetId)
    }
    console.log('Viewed Tweets:', viewedTweet.value)
  }
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

.uploaded-image {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  margin-top: 8px;
}

/* Icon hover and pressed effects */
.icon-wrapper:hover {
  color: #1da1f2;
}

.icon-wrapper:active {
  color: #0a84d0;
  transform: scale(0.95);
}
</style>
