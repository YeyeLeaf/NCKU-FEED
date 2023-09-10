<script setup>
import PersonalInfo from '../components/PersonalInfo.vue';
import axios from 'axios';
import { ref } from 'vue';
import { cur_post } from '../eventBus';
import { user } from '../class.js';

const author = ref({});

const getUserData = async () => {
  const params = new URLSearchParams();
  params.append("uid", cur_post.value.uid); 

  await fetch("http://localhost:5000/user?" + params.toString(), {
    method: "GET"
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((result) => {
      console.log(result);
      author.value = result.user_info;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getUserData();
</script>
<template>
  <div class="flex justify-evenly min-h-screen">
    <div class="lg:w-3/5 m-12 lg:mr-0 lg:ml-0 mb-12 mt-12">
      <div class="flex mb-6">
<img :src="author.profile_photo" class="w-24 rounded-full mr-4">
<div class="flex flex-col justify-between">
  <h1 class="text-3xl font-bold">{{ cur_post.title }}</h1>
  <div class="flex justify-between text-[#525252]">
    <p class="mr-10">{{ cur_post.release_time }}</p>
    <p>作者：{{ author.nick_name }}</p>
  </div>
</div>
      </div>
      <div v-html="cur_post.content"></div>
    </div>
    <div class="h-200 hidden lg:flex"> 
      <div class="w-0.5 h-full bg-gray-100"></div>
    </div>
    <div class="hidden lg:flex mt-16">
      <PersonalInfo :myImg="author.profile_photo" :name="author.nick_name" content="查看個人檔案"/>
  </div>
  </div>
</template>