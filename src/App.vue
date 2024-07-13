<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import UserLogin from './views/UserLogin.vue';

export default {
  name: 'App',
  components: {
    UserLogin,
  }
};
</script>

<style>
@import './index.css';
</style>