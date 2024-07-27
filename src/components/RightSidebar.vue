<template>
    <aside class="w-1/5 bg-black custom-scrollbar overflow-y-auto ">
      <div class="sticky top-0 z-10 bg-black bg-opacity-25 backdrop-filter backdrop-blur-lg p-4">
        <input type="text" placeholder="Search" class="w-full p-2 bg-black border border-gray-700 rounded-full text-white">
      </div>
      <div class="p-4">
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
       </div>
    </aside>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const trends = ref([
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
  ])
  </script>
  
  <style scoped>
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
  
  /* Sticky search bar */
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  </style>
  