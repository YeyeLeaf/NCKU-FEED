<script setup>
import Navbar1 from './components/Navbar1.vue';
import Navbar2 from './components/Navbar2.vue';
import Footer from './components/Footerr.vue';
import { isLogining } from './eventBus.js';
import { user } from './class.js';
import Loader from './components/loader.vue';
</script>


<template>
  <div id="top"></div>
  <Navbar1 v-if="isLogining" :myImg="user.profilePhoto"/>
  <Navbar2 v-else />
  <Loader />
  <router-view></router-view>
  <Footer class="relative"/>
</template>