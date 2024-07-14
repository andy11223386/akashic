<template>
  <div class="mb-4 p-4 border border-gray-700 rounded-lg">
    <div class="flex items-center mb-2">
      <el-avatar :src="tweet.profilePicture" class="w-10 h-10 rounded-full mr-2"></el-avatar>
      <div>
        <h2 class="text-xl font-semibold">{{ tweet.username }}</h2>
        <p class="text-gray-500">{{ tweet.userId }}</p>
      </div>
    </div>
    <p v-html="formattedContent"></p>
    <el-image v-if="tweet.image" :src="tweet.image" alt="Tweet Image" class="mt-2 rounded-lg"></el-image>
    <div class="flex justify-between items-center mt-2 text-gray-500">
      <el-button type="text" class="flex items-center space-x-1">
        <mdi-comment />
        <span>{{ tweet.comments }}</span>
      </el-button>
      <el-button type="text" class="flex items-center space-x-1">
        <mdi-repeat />
        <span>{{ tweet.retweets }}</span>
      </el-button>
      <el-button type="text" class="flex items-center space-x-1">
        <mdi-heart />
        <span>{{ tweet.likes }}</span>
      </el-button>
      <el-button type="text" class="flex items-center space-x-1">
        <mdi-chart-bar />
        <span>{{ tweet.views }}</span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import 'element-plus/dist/index.css'
import { ElAvatar, ElImage, ElButton } from 'element-plus'
import MdiComment from 'vue-material-design-icons/Comment.vue'
import MdiRepeat from 'vue-material-design-icons/Repeat.vue'
import MdiHeart from 'vue-material-design-icons/Heart.vue'
import MdiChartBar from 'vue-material-design-icons/ChartBar.vue'

const props = defineProps({
  tweet: Object
})

const formattedContent = computed(() => {
  return props.tweet.content.replace(/\n/g, '<br />')
})
</script>

<style scoped>
</style>
