// CommentDialog.vue
<template>
  <div v-if="commentDialogVisible" class="dialog-overlay">
    <div class="dialog-container bg-black p-4 rounded-lg text-white flex flex-col relative overflow-hidden">
      <!-- Navigation Bar -->
      <div class="flex justify-between items-center mb-2">
        <button class="text-gray-400 hover:text-white" @click="closeDialog">
          <CloseIcon />
        </button>
        <span class="text-lg font-semibold">Comments</span>
        <button class="text-blue-500 hover:text-blue-400">Drafts</button>
      </div>

      <!-- Scrollable Content Container -->
      <div class="scrollable-content flex-grow overflow-y-auto custom-scrollbar">
        <!-- Tweet Information -->
        <div class="flex items-start mb-4">
          <img :src="tweet.profilePicture" alt="User Avatar" class="rounded-full w-10 h-10">
          <div class="ml-3 flex-1">
            <div class="flex items-center">
              <span class="font-bold text-white text-base">{{ tweet.nickname || tweet.username }}</span>
              <VerifiedIcon v-if="tweet.verified" class="ml-1 h-5 w-5 text-blue-500" />
            </div>
            <div class="text-gray-500 text-sm">@{{ tweet.username }} · {{ tweet.date }}</div>
            <div class="mt-1 text-sm">
              <p v-html="formattedContent(tweet.content)" class="text-white"></p>
            </div>
            <img v-if="tweet.imageUrl" :src="tweet.imageUrl" alt="Tweet Image" class="tweet-image" />
            <div class="text-gray-500 mt-1 text-sm">
              Replying to <span class="text-blue-400">@{{ tweet.username }}</span>
            </div>
          </div>
        </div>

        <!-- Comments Section -->
        <div class="comments-section mb-4">
          <h3 class="text-lg font-semibold mb-2">Comments</h3>
          <div v-for="comment in comments" :key="comment._id" class="mb-4">
            <div class="flex items-start">
              <img :src="comment.profilePicture" alt="Commenter Avatar" class="rounded-full w-8 h-8">
              <div class="ml-3 flex-1">
                <div class="flex items-center">
                  <span class="font-bold text-white text-sm">{{ comment.nickname || comment.username }}</span>
                  <span class="font-bold text-white text-xs ml-2">[#{{ comment.floor }}F]</span>
                  <span class="text-gray-500 text-xs ml-2">{{ comment.createdAt }}</span>
                  </div>
                <div class="mt-1 text-sm text-gray-300">
                  <p v-html="formattedContent(comment.content)" class="text-white"></p>
                </div>
                <!-- Comment Footer -->
                <div class="comment-footer flex items-center mt-2 text-gray-500">
                  <button @click="openReplyDialog(comment)" class="icon-button">
                    <MdiReply class="icon" />
                    <span></span>
                  </button>
                  <button class="icon-button">
                    <MdiRepeat class="icon" />
                    <span>{{ comment.retweets }}</span>
                  </button>
                  <button @click="openCommentDialog(comment)" class="icon-button">
                    <MdiComment class="icon" />
                    <span>{{ comment.comments.length }}</span>
                  </button>
                  <button class="icon-button">
                    <MdiHeart class="icon" />
                    <span>{{ comment.likes.length }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reply Section -->
      <div class="reply-section mt-4 flex items-start">
        <img :src="myProfilePicture" alt="User Avatar" class="rounded-full w-10 h-10">
        <div class="flex-1 ml-3">
          <textarea
            v-model="replyContent"
            class="custom-scrollbar bg-black text-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm"
            placeholder="Post your reply"
            rows="1"
            ref="replyTextarea"
            @input="autoResizeTextarea"
          ></textarea>
        </div>
      </div>

      <!-- Bottom Actions -->
      <div class="flex justify-between items-center mt-2">
        <div class="flex items-center space-x-4 text-gray-500">
          <button class="hover:text-blue-400"><ImageIcon /></button>
          <button class="hover:text-blue-400"><EmoticonIcon /></button>
          <button class="hover:text-blue-400"><PollIcon /></button>
          <button class="hover:text-blue-400"><CalendarIcon /></button>
          <button class="hover:text-blue-400"><MapMarkerIcon /></button>
        </div>
        <button class="reply-button bg-blue-500 text-white px-4 py-1.5 rounded-full" @click="handleReply">Reply</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import VerifiedIcon from 'vue-material-design-icons/CheckDecagram.vue';
import ImageIcon from 'vue-material-design-icons/Image.vue';
import EmoticonIcon from 'vue-material-design-icons/Emoticon.vue';
import PollIcon from 'vue-material-design-icons/Poll.vue';
import CalendarIcon from 'vue-material-design-icons/Calendar.vue';
import MapMarkerIcon from 'vue-material-design-icons/MapMarker.vue';
import MdiComment from 'vue-material-design-icons/Comment.vue'
import MdiReply from 'vue-material-design-icons/Reply.vue'
import MdiRepeat from 'vue-material-design-icons/Repeat.vue'
import MdiHeart from 'vue-material-design-icons/Heart.vue'

const props = defineProps({
  commentDialogVisible: Boolean,
  tweet: Object,
  comments: Array
});

const emit = defineEmits(['close', 'reply']);
const replyContent = ref('');
const replyTextarea = ref(null);
const myProfilePicture = ref('');

const formattedContent = (content) => {
  return content.replace(/\n/g, '<br />');
};

const closeDialog = () => {
  emit('close');
};

const handleReply = () => {
  if (!replyContent.value) return;
  emit('reply', replyContent.value);
  replyContent.value = '';
};

const autoResizeTextarea = () => {
  const textarea = replyTextarea.value;
  textarea.style.height = 'auto'; // Reset height
  textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
  if (textarea.scrollHeight > 72) { // 72px is the height for 3 lines
    textarea.style.height = '72px';
  }
};

const openReplyDialog = (comment) => {
}

const openCommentDialog = (comment) => {
}

const  getMyProfilePicture = () => {
    const pro = JSON.parse(localStorage.getItem('profile') as string)
    myProfilePicture.value = pro.profilePicture
}

getMyProfilePicture()

</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(92, 92, 92, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-container {
  width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

textarea {
  width: 100%;
  resize: none;
  overflow-y: auto; /* Allow vertical scrolling */
  max-height: 72px; /* Set max height for 3 lines */
}

textarea::placeholder {
  color: #6e767d;
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

/* Reply button styles */
.reply-button {
  transition: background-color 0.2s, transform 0.1s;
}

.reply-button:hover {
  background-color: #1a8cd8;
}

.reply-button:active {
  background-color: #0a75c2;
  transform: scale(0.95);
}

/* Container for both Tweet Information and Comments Section */
.scrollable-content {
  overflow-y: auto;
  flex-grow: 1;
  max-height: 60vh; /* Adjust based on your needs */
}

/* Comment Footer Styles */
.comment-footer {
  display: flex;
  justify-content: flex-start; /* Align buttons to the left */
  color: #888;
  gap: 100px; /* Add space between buttons */
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

.tweet-image {
  width: 258;
  height: 258;
  border-radius: 8px;
  margin: 8px 0;
}
</style>
