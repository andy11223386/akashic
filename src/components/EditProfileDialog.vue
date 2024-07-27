<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-black rounded-lg w-full max-w-md overflow-hidden edit-dialog">
        <!-- Navigation bar -->
        <div class="flex items-center justify-between px-4 py-2 bg-black bg-opacity-75 rounded-t-lg">
          <svg @click="closeDialog" viewBox="0 0 24 24" aria-hidden="true" class="close-icon cursor-pointer" style="width: 24px; height: 24px;">
            <g>
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </g>
          </svg>
          <h2 class="text-white font-semibold">Edit profile</h2>
          <button @click="saveProfile" class="px-4 py-2 bg-blue-500 text-white rounded-full save-button">Save</button>
        </div>
        <div class="relative banner-container">
          <img src="https://pbs.twimg.com/profile_banners/1768877240664911872/1710601034/1500x500" alt="Banner" class="w-full h-32 object-cover banner-img">
          <img src="https://pbs.twimg.com/profile_images/1769013911205081088/6KYJIWKf_400x400.jpg" alt="Avatar" class="absolute avatar-img">
        </div>
        <div class="px-6 py-4 mt-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-500">Name</label>
            <input type="text" v-model="editProfile.nickname" class="mt-1 block w-full bg-gray-800 text-white p-2 border border-gray-700 rounded-md" placeholder="Name">
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-500">Bio</label>
            <textarea v-model="editProfile.bio" maxlength="200" class="mt-1 block w-full bg-gray-800 text-white p-2 border border-gray-700 rounded-md bio-textarea custom-scrollbar" placeholder="Bio"></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-500">Location</label>
            <input type="text" v-model="editProfile.location" class="mt-1 block w-full bg-gray-800 text-white p-2 border border-gray-700 rounded-md" placeholder="Location">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits, onMounted } from 'vue'
  import { useUserStore } from '../stores/user'
  import { IUpdateProfileParams } from '@/types/services/user'
  
  const props = defineProps({
    profile: Object
  })
  
  const userStore = useUserStore()
  const emit = defineEmits(['close'])
  
  const editProfile = ref({
    nickname: '',
    bio: '',
    location: ''
  })
  
  onMounted(() => {
    editProfile.value.nickname = props.profile.nickname
    editProfile.value.bio = props.profile.bio
  })
  
  async function saveProfile() {
    const res = await userStore.updateProfile({ nickname: editProfile.value.nickname, bio: editProfile.value.bio } as IUpdateProfileParams)
    if (!res) return
    closeDialog()
  }
  
  function closeDialog() {
    emit('close')
  }
  </script>
  
  <style scoped>
  .edit-dialog {
    margin-top: 40px;
    background-color: #000; /* Set the background color of the dialog to black */
  }
  
  .avatar-img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    bottom: -40px;
    left: 16px;
    border: 4px solid #1a1a1a;
    cursor: pointer;
  }
  
  input, textarea {
    background-color: #222;
    color: white;
  }
  
  input::placeholder, textarea::placeholder {
    color: #888;
  }
  
  .bg-gray-900 {
    background-color: #1a1a1a;
  }
  
  .bg-gray-800 {
    background-color: #222222;
  }
  
  .text-gray-500 {
    color: #888;
  }
  
  .max-w-md {
    max-width: 583px;
  }
  
  .save-button, .close-button {
    transition: transform 0.1s, box-shadow 0.1s;
  }
  
  .save-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .save-button:active {
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .close-icon:hover {
    transform: scale(1.1);
  }
  
  .close-icon:active {
    transform: scale(0.9);
  }
  
  .close-icon {
    fill: #efeff4;
    width: 24px;
    height: 24px;
  }
  
  .bio-textarea {
    resize: none;
    height: 150px;
  }
  
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
  
  .banner-img {
    width: 583px;
    height: 197px;
    object-fit: cover;
  }
  </style>
  