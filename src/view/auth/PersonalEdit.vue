<script setup>
import RedButton from '../../components/RedButton.vue'
</script>

<template>
<div class="flex justify-around flex-wrap lg:space-y-20 lg:mt-24 space-y-12 mt-12">
  <div class="bg-[#FF8E3C] rounded-3xl flex flex-col justify-center items-center lg:w-1/2 w-3/4 py-10 lg:space-y-6 lg:px-12 space-y-6 px-8">
    <img src="../../assets/user.png" class="lg:w-32 w-24">
    <input type="text" placeholder="暱稱" class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full h-10">
    <textarea placeholder="個人簡介" class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full lg:h-40 h-60"></textarea>
    <router-link to="/personalEdit"><RedButton text="送出" class="mx-4 lg:mx-20"/></router-link>
  </div>
</div>
</template>

<style scoped>
</style>