<template>
    <div class="flex h-screen bg-black text-white">
      <LeftSidebar />
      <ProfileConent />
      <RightSidebar />
    </div>
  </template>
  
  <script setup lang="ts">
  import LeftSidebar from '../components/LeftSidebar.vue'
  import RightSidebar from '../components/RightSidebar.vue'
  import ProfileConent from '../components/ProfileContent.vue'
  </script>
  
  <style scoped>
  /* Add any necessary scoped styles here */
  </style>