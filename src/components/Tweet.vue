<!-- src/components/Tweet.vue -->
<template>
    <div class="mb-4 p-4 border border-gray-700 rounded-lg">
      <div class="flex items-center mb-2">
        <img :src="tweet.avatar" alt="Avatar" class="w-10 h-10 rounded-full mr-2">
        <div>
          <h2 class="text-xl font-semibold">{{ tweet.username }}</h2>
          <p class="text-gray-500">{{ tweet.handle }}</p>
        </div>
      </div>
      <p>{{ tweet.content }}</p>
      <img v-if="tweet.image" :src="tweet.image" alt="Tweet Image" class="mt-2 rounded-lg">
      <div class="flex justify-between items-center mt-2 text-gray-500">
        <button class="flex items-center space-x-1">
          <mdi-comment />
          <span>{{ tweet.comments }}</span>
        </button>
        <button class="flex items-center space-x-1">
          <mdi-repeat />
          <span>{{ tweet.retweets }}</span>
        </button>
        <button class="flex items-center space-x-1">
          <mdi-heart />
          <span>{{ tweet.likes }}</span>
        </button>
        <button class="flex items-center space-x-1">
          <mdi-chart-bar />
          <span>{{ tweet.views }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import MdiComment from 'vue-material-design-icons/Comment.vue'
  import MdiRepeat from 'vue-material-design-icons/Repeat.vue'
  import MdiHeart from 'vue-material-design-icons/Heart.vue'
  import MdiChartBar from 'vue-material-design-icons/ChartBar.vue'
  
  const props = defineProps({
    tweet: Object
  })
  </script>
  
  <style scoped>
  </style>
  