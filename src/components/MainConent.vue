<template>
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
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
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
  
  const postStore = usePostStore()
  const userStore = useUserStore()
  
  onMounted(() => {
    fetchTweets()
  })

  async function fetchTweets() {
  const res = await postStore.fetchAllTweet()
  console.log('res.data', res.data)
  if (!res) return
  tweets.value = res.data || []
  
  console.log('tweets.value', tweets.value)
  console.log('tweets.value[0]', tweets.value)
  }
  
  async function postTweet() {
    if (newTweetContent.value.trim() !== '') {
      const username = localStorage.getItem('username')
      const newTweet: IAddTweetParams = {
        createdAt: Date.now().toString(),
        username: username,
        profilePicture: 'https://via.placeholder.com/50',
        content: newTweetContent.value,
        comments: 0,
        retweets: 0,
        likes: 0,
        views: 0,
      }
  
      // Send newTweet to the backend
      const res = await postStore.doAddTweet(newTweet)
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
  
  function handleInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    adjustTextareaHeight(textarea)
  }
  
  function adjustTextareaHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
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
  </style>
  