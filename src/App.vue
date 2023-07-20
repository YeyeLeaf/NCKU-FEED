<script setup>
import Navbar1 from './components/Navbar1.vue';
import Navbar2 from './components/Navbar2.vue';
import Footer from './components/Footerr.vue';
</script>
<template>
  <Navbar1 myImg="src/assets/leaf.png" />
  <!-- <Navbar2 /> -->
  <router-view></router-view>
  <Footer />
</template>