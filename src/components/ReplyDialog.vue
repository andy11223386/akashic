<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="bg-black p-4 rounded-lg text-white w-[600px] max-h-[80vh] flex flex-col relative overflow-y-auto">
      <!-- Navigation Bar -->
      <div class="flex justify-between items-center mb-2">
        <button class="text-gray-400 hover:text-white" @click="closeDialog">
          <CloseIcon />
        </button>
        <span class="text-lg font-semibold">Reply</span>
        <button class="text-blue-500 hover:text-blue-400">Drafts</button>
      </div>

      <div class="flex items-start">
        <img :src="tweet.profilePicture" alt="User Avatar" class="rounded-full w-10 h-10">
        <div class="ml-3 flex-1">
          <div class="flex items-center">
            <span class="font-bold text-white text-base">{{ tweet.nickname || tweet.username }}</span>
            <VerifiedIcon class="ml-1 h-5 w-5 text-blue-500" />
          </div>
          <div class="text-gray-500 text-sm">@{{ tweet.username }} · {{ tweet.date }}</div>
          <div class="mt-1 text-sm">
            <p v-html="formattedContent" class="text-white"></p>
          </div>
          <img v-if="tweet.imageUrl" :src="tweet.imageUrl" alt="Tweet Image" class="tweet-image" />
          <div class="text-gray-500 mt-1 text-sm">
            Replying to <span class="text-blue-400">@{{ tweet.username }}</span>
          </div>
        </div>
      </div>
      <div class="mt-4 flex items-start flex-grow">
        <img src="https://pbs.twimg.com/profile_images/1769013911205081088/6KYJIWKf_x96.jpg" alt="User Avatar" class="rounded-full w-10 h-10">
        <div class="flex-1 ml-3">
          <textarea
            v-model="replyContent"
            class="custom-scrollbar bg-black text-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-sm"
            placeholder="Post your reply"
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

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import VerifiedIcon from 'vue-material-design-icons/CheckDecagram.vue';
import ImageIcon from 'vue-material-design-icons/Image.vue';
import EmoticonIcon from 'vue-material-design-icons/Emoticon.vue';
import PollIcon from 'vue-material-design-icons/Poll.vue';
import CalendarIcon from 'vue-material-design-icons/Calendar.vue';
import MapMarkerIcon from 'vue-material-design-icons/MapMarker.vue';

const props = defineProps({
  visible: Boolean,
  tweet: Object
});

const emit = defineEmits(['close', 'reply']);
const replyContent = ref('');

const formattedContent = computed(() => {
  return props.tweet.content.replace(/\n/g, '<br />');
});

const closeDialog = () => {
  emit('close');
}

const handleReply = () => {
  if(!replyContent.value) return
  emit('reply', replyContent.value);
  replyContent.value = '';
}
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

textarea {
  width: 520px;
  height: 124px;
  resize: none;
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

/* Tweet image styles */
.tweet-image {
  width: 258;
  height: 258;
  border-radius: 8px;
  margin: 8px 0;
}
</style>
