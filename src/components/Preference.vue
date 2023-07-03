<script setup>
import { ref } from 'vue'
import RedButton from './RedButton.vue'
import { user } from '../class.js'
const options = ref([
  "美式料理", "台灣美食", "速食", "泰式料理", "湯品", "披薩", "甜點", "街頭美食", "手搖飲", "咖啡廳", "燒烤", "印度料理", "港式料理", "素食", "早餐", "韓式料理", "義式料理", "海鮮"]);
</script>

<template>
  <div class="flex justify-center items-center my-12">
    <form action="" class="bg-white border-2 border-[#b80c0c] max-w-lg h-96 overflow-y-auto p-4">
      <h2 class="text-[#b80c0c] text-center text-2xl font-bold m-2">專屬於你的美食推薦</h2>
      <p class="text-center font-bold">透過對選項的喜好程度1~5評分來協助我們客製化美食推薦系統</p>
      <div v-for="(option, index) in options" :key="index" class="flex justify-between m-4">
        <p>{{ option }}</p>
        <div class="w-6/12 flex justify-evenly">
          1<input type="radio" :name="option" value="1" required>
        <input type="radio" :name="option" value="2" required>
        <input type="radio" :name="option" value="3" required>
        <input type="radio" :name="option" value="4" required>
        <input type="radio" :name="option" value="5" required>5
        </div>
      </div>
      <RedButton text="送出" class="w-28 mx-auto" @click="user.isPrefer = true" />
    </form>
  </div>
  
</template>

<style>
</style>