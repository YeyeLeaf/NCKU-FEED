<script setup>
import RedButton from '../../components/RedButton.vue'
import { ref, onUpdated, computed } from 'vue'
import { user } from '../../class.js'
</script>

<template>
  <div class="flex justify-around flex-wrap lg:mt-32 lg:mb-24 mt-20 mb-20">
    <div class="border flex flex-col lg:w-1/2 w-3/4 py-10 lg:space-y-10 lg:px-12 space-y-6 px-8">
      <div class="flex justify-start space-x-10">
        <img src="../../assets/user_black.png" class="lg:w-32 w-24 rounded-full no-border">
        <div class="flex-col flex items-start justify-center space-y-2">
          <h class="text-3xl">leaf</h>
          <h class="text-base text-gray-500">點擊可更換頭像</h>
        </div>
      </div>
      <div class="flex w-full flex-col space-y-8">
        <div class="flex space-x-16">
          <h>暱稱</h>
          <input type="text" placeholder="blablabla" class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 lg:w-4/5 w-2/3 h-10">
        </div>
        <div class="flex space-x-8">
          <h>個人簡介</h>
          <textarea placeholder="blablabla" class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 lg:w-4/5 w-2/3 lg:h-40 h-60"></textarea>
        </div>
      </div>
      <router-link to="/personalEdit"><RedButton text="save" class="w-full"/></router-link> 
    </div>
  </div>
  </template>
  
  <style scoped>
  
  @import url('../../../paper.css');
  
  </style>
  
  
  
  