<template>
    <aside class="w-1/5 p-4 bg-black">
      <div class="flex flex-col items-start">
        <img src="https://via.placeholder.com/50" alt="Logo" class="mb-4">
        <nav class="flex flex-col space-y-4">
          <router-link to="/" class="flex items-center space-x-3 text-xl">
            <MdiHome />
            <span>Home</span>
          </router-link>
          <router-link to="/explore" class="flex items-center space-x-3 text-xl">
            <MdiMagnify />
            <span>Explore</span>
          </router-link>
          <router-link to="/notifications" class="flex items-center space-x-3 text-xl">
            <MdiBell />
            <span>Notifications</span>
          </router-link>
          <router-link to="/messages" class="flex items-center space-x-3 text-xl">
            <MdiEmail />
            <span>Messages</span>
          </router-link>
          <router-link to="/bookmarks" class="flex items-center space-x-3 text-xl">
            <MdiBookmark />
            <span>Bookmarks</span>
          </router-link>
          <router-link to="/communities" class="flex items-center space-x-3 text-xl">
            <MdiAccountGroup />
            <span>Communities</span>
          </router-link>
          <router-link to="/premium" class="flex items-center space-x-3 text-xl">
            <MdiCrown />
            <span>Premium</span>
          </router-link>
          <router-link to="/verified-orgs" class="flex items-center space-x-3 text-xl">
            <MdiCheckCircle />
            <span>Verified Orgs</span>
          </router-link>
          <router-link to="/profile" class="flex items-center space-x-3 text-xl">
            <MdiAccount />
            <span>Profile</span>
          </router-link>
          <router-link to="/more" class="flex items-center space-x-3 text-xl">
            <MdiDotsHorizontal />
            <span>More</span>
          </router-link>
          <button class="mt-4 px-4 py-2 bg-blue-500 rounded-full text-xl">Tweet</button>
        </nav>
      </div>
    </aside>
  </template>
<script setup lang="ts">
import MdiHome from 'vue-material-design-icons/Home.vue'
import MdiMagnify from 'vue-material-design-icons/Magnify.vue'
import MdiBell from 'vue-material-design-icons/Bell.vue'
import MdiEmail from 'vue-material-design-icons/Email.vue'
import MdiBookmark from 'vue-material-design-icons/Bookmark.vue'
import MdiAccountGroup from 'vue-material-design-icons/AccountGroup.vue'
import MdiCrown from 'vue-material-design-icons/Crown.vue'
import MdiCheckCircle from 'vue-material-design-icons/CheckCircle.vue'
import MdiAccount from 'vue-material-design-icons/Account.vue'
import MdiDotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue'
</script>

<style scoped>
/* Add any necessary scoped styles here */
</style>
