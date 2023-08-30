<script setup>
import { ref } from 'vue'
import RedButton from '../../components/RedButton.vue'
import { user } from '../../class.js'
import { confirmAccess, getJwtFromCookie } from '../../eventBus.js';
import { useRouter } from 'vue-router';

const router = useRouter();

confirmAccess();
const options = ref([
  "美式料理", "台灣美食", "速食", "泰式料理", "湯品", "披薩", "甜點", "街頭美食", "手搖飲", "咖啡廳", "燒烤", "印度料理", "港式料理", "素食", "早餐", "韓式料理", "義式料理", "海鮮"]);

const picked = ref([]);

const updateRecommand = async () => {
  const token = getJwtFromCookie();  
  await fetch("http://localhost:5000/user", {
    method: "PUT",
    headers: {
    "Authorization": `Bearer ${token}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "preference": picked.value
    })
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then((result) => {
    console.log(result);
    router.push("/");
  })
  .catch(function (error) {
    console.log(error);
    alert("上傳失敗，請再試一次");
    router.push("/preference");
  });
};
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <form action="" class="bg-white border-2 border-[#b80c0c] max-w-lg h-96 overflow-y-auto p-4">
      <h2 class="text-[#b80c0c] text-center text-2xl font-bold m-2">專屬於你的美食推薦</h2>
      <p class="text-center font-bold">透過對選項的喜好程度1~5評分來協助我們客製化美食推薦系統</p>
      <div v-for="(option, index) in options" :key="index" class="flex justify-between m-4">
        <p>{{ option }}</p>
        <div class="w-6/12 flex justify-evenly">
          1<input type="radio" :name="option" :value="1.0" v-model="picked[index]" required>
          <input type="radio" :name="option" :value="2.0" v-model="picked[index]" required>
          <input type="radio" :name="option" :value="3.0" v-model="picked[index]" required>
          <input type="radio" :name="option" :value="4.0" v-model="picked[index]" required>
          <input type="radio" :name="option" :value="5.0" v-model="picked[index]" required>5
        </div>
      </div>
      <RedButton text="送出" class="w-28 mx-auto" @click="updateRecommand" />
    </form>
  </div>
  
</template>

<style>
</style>