<template>
  <div class="tweet-container">
    <div class="tweet-header">
      <img :src="tweetData.profilePicture" class="avatar" />
      <div>
        <h2 class="username">{{ tweetData.nickname || tweetData.username }}</h2>
        <p class="handle">{{ tweetData.username }}</p>
        <p class="_id" style="display: none;">{{ tweetData._id }}</p>
      </div>
    </div>
    <p class="tweet-content" v-html="formattedContent"></p>
    <img v-if="tweetData.imageUrl" :src="tweetData.imageUrl" alt="Tweet Image" class="tweet-image" />
    <div class="tweet-footer">
      <button @click="openReplyDialog" class="icon-button">
        <MdiReply class="icon" />
        <span></span>
      </button>
      <button @click="doRetweet" class="icon-button" :class="{'retweet': isRetweet}">
        <MdiRepeat class="icon" />
        <span>{{ tweetData.retweets.length }}</span>
      </button>
      <button @click="openCommentDialog" class="icon-button">
        <MdiComment class="icon" />
        <span>{{ tweetData.comments.length }}</span>
      </button>
      <button @click="doLikeTweet" class="icon-button" :class="{'liked': isLiked}">
        <MdiHeart class="icon" />
        <span>{{ tweetData.likes.length }}</span>
      </button>
    </div>

    <ReplyDialog
      :visible.sync="visible"
      :tweet="tweetData"
      @reply="handleReply"
      @close="closeDialog"
    />

    <CommentDialog
      :commentDialogVisible.sync="commentDialogVisible"
      :tweet="tweetData"
      :comments="tweetData.comments"
      @reply="handleReply"
      @close="closeCommentDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, computed } from 'vue'
import MdiComment from 'vue-material-design-icons/Comment.vue'
import MdiReply from 'vue-material-design-icons/Reply.vue'
import MdiRepeat from 'vue-material-design-icons/Repeat.vue'
import MdiHeart from 'vue-material-design-icons/Heart.vue'
import ReplyDialog from './ReplyDialog.vue'
import CommentDialog from './CommentDialog.vue'
import { IAddCommentParams, ILikeTweetParams, IRetweetParams } from '../types/services/post'
import { usePostStore } from '../stores/post'

const postStore = usePostStore()

const props = defineProps({
  tweet: Object
})

// Reactive variable for tweet data
const tweetData = reactive({ ...props.tweet })

const visible = ref(false)
const commentDialogVisible = ref(false)

const formattedContent = computed(() => {
  return tweetData.content.replace(/\n/g, '<br />')
})

const username = localStorage.getItem('username')

const isLiked = computed(() => {
  return tweetData.likes.includes(username)
})

const isRetweet = computed(() => {
  return tweetData.retweets.includes(username)
})

const openReplyDialog = () => {
  visible.value = true
}

const closeDialog = () => {
  visible.value = false
}

const openCommentDialog = () => {
  commentDialogVisible.value = true
}

const closeCommentDialog = () => {
  commentDialogVisible.value = false
}

async function handleReply(replyContent) {
  const newComment: IAddCommentParams = {
    replyPostId: tweetData._id,
    replyTo: '',
    createdAt: Date.now().toString(),
    username: username,
    content: replyContent,
    comments: 0,
    retweets: 0,
    likes: [],
    views: 0,
  }
  const res = await postStore.doAddComment(newComment)

  if (!res) return
  visible.value = false
  getTweet()
}

async function doLikeTweet() {
  const likeTweetParams: ILikeTweetParams = {
    postId: tweetData._id,
    username: username
  }

  if (isLiked.value) {
    tweetData.likes = tweetData.likes.filter(like => like !== username)
  } else {
    tweetData.likes.push(username)
  }

  const res = await postStore.doLikeTweet(likeTweetParams)
  getTweet()
}

async function doRetweet() {
  const retweetParams: IRetweetParams = {
    postId: tweetData._id,
    username: username
  }

  if (isRetweet.value) {
    tweetData.retweets = tweetData.retweets.filter(retweet => retweet !== username)
  } else {
    tweetData.retweets.push(username)
  }

  const res = await postStore.doRetweet(retweetParams)
  getTweet()
}

async function getTweet() {
  const res = await postStore.fetchTweet({ postId: tweetData._id })
  if (res && res.data) {
    Object.assign(tweetData, res.data)
  }
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
  width: 516px;
  height: 516px;
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

.icon-button.liked {
  color: red;
}

.icon-button.retweet {
  color: #1da1f2;
}
</style>
