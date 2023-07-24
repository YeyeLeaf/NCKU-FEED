<script setup>
import PersonalInfo from '../components/PersonalInfo.vue';
import axios from 'axios';
import { ref } from 'vue';

const post = ref({});
const name = "yeye";
axios.get('http://localhost:3000/tasks',{
    params: {
        "id": 1
    }
})
.then((response) => {
  console.log(response);
  post.value = response.data[0];
})
.catch((error) => console.log(error))
</script>
<template>
  <div class="flex justify-evenly">
    <div class="lg:w-3/5 m-12 lg:mr-0 lg:ml-0 mb-12 mt-12">
      <div class="flex mb-6">
        <img src="src/assets/user_black.png" class="w-24 rounded-full mr-4">
        <div class="flex flex-col justify-between">
          <h1 class="text-2xl font-bold">{{ post.title }}</h1>
          <div class="flex justify-between">
            <p>2023-02-01</p>
            <p>作者：{{ name }}</p>
          </div>
        </div>
      </div>
      <div v-html="post.content"></div>
    </div>
    <div class="h-200 hidden lg:flex"> 
      <div class="w-0.5 h-full bg-gray-100"></div>
    </div>
    <div class="hidden lg:flex mt-16">
      <PersonalInfo myImg="src/assets/user_black.png" name="salmon" content="查看個人檔案"/>
  </div>
  </div>
</template>