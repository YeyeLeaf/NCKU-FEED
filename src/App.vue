<script setup>
import Navbar1 from './components/Navbar1.vue';
import Navbar2 from './components/Navbar2.vue';
import Footer from './components/Footerr.vue';
import { isLogining } from './eventBus.js';
import { user } from './class.js';
</script>


<template>
  <Navbar1 v-if="isLogining" :myImg="user.profilePhoto"/>
  <Navbar2 v-else />
  <router-view></router-view>
  <Footer class="relative"/>
</template>