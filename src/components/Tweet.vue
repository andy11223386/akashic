<template>
  <div class="tweet-container">
    <div class="tweet-header">
      <img :src="tweet.profilePicture" class="avatar" />
      <div>
        <h2 class="username">{{ tweet.nickname || tweet.username }}</h2>
        <p class="handle">{{ tweet.username }}</p>
      </div>
    </div>
    <p class="tweet-content" v-html="formattedContent"></p>
    <img v-if="tweet.image" :src="tweet.image" alt="Tweet Image" class="tweet-image" />
    <div class="tweet-footer">
      <button @click="openReplyDialog" class="icon-button">
        <MdiReply class="icon" />
        <span></span>
      </button>
      <button class="icon-button">
        <MdiRepeat class="icon" />
        <span>{{ tweet.retweets }}</span>
      </button>
      <button @click="openCommentDialog" class="icon-button">
        <MdiComment class="icon" />
        <span>{{ tweet.comments.length }}</span>
      </button>
      <button class="icon-button">
        <MdiHeart class="icon" />
        <span>{{ tweet.likes }}</span>
      </button>
    </div>

    <!-- 使用 ReplyDialog 组件 -->
    <ReplyDialog
      :visible.sync="visible"
      :tweet="tweet"
      @reply="handleReply"
      @close="closeDialog"
    />

    <CommentDialog
      :commentDialogVisible.sync="commentDialogVisible"
      :tweet="tweet"
      :comments="tweet.comments"
       @close="closeCommentDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'
import MdiComment from 'vue-material-design-icons/Comment.vue'
import MdiReply from 'vue-material-design-icons/Reply.vue'
import MdiRepeat from 'vue-material-design-icons/Repeat.vue'
import MdiHeart from 'vue-material-design-icons/Heart.vue'
import MdiChartBar from 'vue-material-design-icons/ChartBar.vue'
import ReplyDialog from './ReplyDialog.vue'
import CommentDialog from './CommentDialog.vue'
import { IAddCommentParams } from '../types/services/post'
import { usePostStore } from '../stores/post'

const postStore = usePostStore()

const props = defineProps({
  tweet: Object
})

const visible = ref(false)
const commentDialogVisible = ref(false)

const formattedContent = computed(() => {
  return props.tweet.content.replace(/\n/g, '<br />')
})

const openReplyDialog = () => {
  visible.value = true
}

const closeDialog = () => {
  visible.value = false
}

const openCommentDialog = () => {
  console.log('openCommentDialog')
  commentDialogVisible.value = true
}

const closeCommentDialog = () => {
  commentDialogVisible.value = false
}

async function handleReply(replyContent) {
  const username = localStorage.getItem('username')
  console.log('Reply content:', replyContent)
  console.log('tweet', props.tweet)
  const newComment:IAddCommentParams = {
      replyPostId: props.tweet._id,
      replyTo: '',
      createdAt:  Date.now().toString(),
      username: username,
      content: replyContent,
      comments: 0,
      retweets: 0,
      likes: 0,
      views: 0,
  }
  const res = await postStore.doAddComment(newComment)

  if(!res) return
  visible.value = false
}
</script>

<style scoped>
.tweet-container {
  background-color: #000;
  color: #fff;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.tweet-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
}

.username {
  font-size: 16px;
  font-weight: bold;
}

.handle {
  color: #888;
}

.tweet-content {
  margin: 8px 0;
}

.tweet-image {
  width: 100%;
  border-radius: 8px;
  margin: 8px 0;
}

.tweet-footer {
  display: flex;
  justify-content: space-around;
  color: #888;
}

.icon-button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.icon-button .icon {
  width: 24px;
  height: 24px;
  margin-right: 4px;
}

.icon-button:hover {
  color: #1da1f2;
}

.icon-button:active {
  color: #0a84d0;
  transform: scale(0.95);
}


</style>
