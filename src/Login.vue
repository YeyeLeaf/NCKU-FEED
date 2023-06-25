<script setup>
import storeCard from './components/storeCard.vue'
import Footer from './components/Footerr.vue'
import Navbar1 from './components/Navbar1.vue'
import Navbar2 from './components/Navbar2.vue'
</script>

<template>
  
  <!-- <Navbar1 /> -->
  <div class="bg-custom-background">
      <img src="./assets/background.png" class="absolute w-full h-full object-cover">
  </div>
  <Navbar2 /> 
  <div class="relative flex justify-around flex-wrap space-y-40 mt-44">
    <div class="bg-[#FF8E3C] rounded-3xl flex flex-col justify-center items-center py-10 lg:space-y-10 lg:px-28 space-y-6 px-8">
      <p class="text-white font-sans text-3xl lg:text-5xl font-semibold">登入</p>
      <h1 class="text-white font-sans lg:text-lg text-base">解鎖收藏餐廳、評論餐廳、發表食記......等等功能</h1>
      <button class="bg-white text-gray-700 p-1 items-center rounded-md border border-gray-500 flex px-4 lg:px-10 py-2">
        <img src="./assets/google.png" class="w-6 mr-4">
        <h1 class="text-sm lg:text-base">Sign in with Google</h1>
      </button>
      <button class="bg-white text-gray-700 p-1 items-center rounded-md border border-gray-500 flex px-2 lg:px-8 py-2">
        <img src="./assets/facebook.png" class="w-6 mr-4">
        <h1 class="text-sm lg:text-base">Sign in with Facebook</h1>
      </button>
    </div>

    <Footer />
  </div>

</template>

<style scoped>
/*hi*/
</style>
