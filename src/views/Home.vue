<template>
  <div class="flex h-screen bg-black text-white">
    <LeftSidebar />
    <MainConet />
    <RightSidebar />
  </div>
</template>

<script setup lang="ts">
import LeftSidebar from '../components/LeftSidebar.vue'
import RightSidebar from '../components/RightSidebar.vue'
import MainConet from '../components/MainConent.vue'
</script>

<style scoped>
/* Add any necessary scoped styles here */
</style>