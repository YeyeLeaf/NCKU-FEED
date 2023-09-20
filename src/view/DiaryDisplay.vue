<script setup>
import PersonalInfo from '../components/PersonalInfo.vue';
import storePage from '../components/storePage.vue'
import axios from 'axios';
import { ref } from 'vue';
import { cur_post,wheelList, saveDataToLocalStorage, getDataFromLocalStorage} from '../eventBus';
import { user } from '../class.js';

if(cur_post.value) {
  saveDataToLocalStorage(cur_post.value);
}
else cur_post.value = getDataFromLocalStorage();

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

//取得餐廳資訊
const rest = ref({});

const getRestData = async () => {
  await fetch("http://127.0.0.1:5000/restaurants?restaurant_id=" + cur_post.value.restaurants_id, {
    method: "GET",
    headers: {
    "Authorization": `Bearer ${user.access_token}`,
    'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((result) => {
      console.log(result);
      rest.value = result;
    })
    .catch(function (error) {
      console.log(error);
    });
}
const add_to_wheel = (item) => {
  if(wheelList.value.length < 10){
    for(let i = 0; i < wheelList.value.length; i++){
      if(wheelList.value[i].name === item.name) return;
    }
    wheelList.value.push(item);
  }
  else{
    alert("Lucky wheel is already full");
  }
}

getRestData();

const openDetail = async () => {
  await new Promise(resolve => {
    $('.store-infor').siblings().css('opacity', '0.5');
    $('body').css('overflow', 'hidden');
    resolve();
  });

  $('.store-infor').css("display", "flex");
};

</script>
<template>
  <div class="flex justify-evenly min-h-screen">
    <div class="lg:w-3/5 m-12 lg:mr-0 lg:ml-0 mb-12 mt-12">
      <div class="flex mb-6">
        <img :src="author.profile_photo" class="w-24 rounded-full mr-4">
        <div class="flex flex-col justify-between">
          <h1 class="text-3xl font-bold">{{ cur_post.title }}</h1>
          <div class="flex justify-between text-[#525252]">
            <p class="mr-10">{{ rest.name }}</p>
            <p>作者：{{ author.nick_name }}</p>
          </div>
        </div>
        <button class="bg-[#b80c0c] text-white rounded-md w-32 p-1 hover:bg-[#ed0000] text-[15px] h-10" @click="openDetail">查看餐廳資訊</button>
      </div>
      <div v-html="cur_post.content"></div>
    </div>
    <div class="h-200 hidden lg:flex"> 
      <div class="w-0.5 h-full bg-gray-100"></div>
    </div>
    <div class="hidden lg:flex mt-16">
      <PersonalInfo :myImg="author.profile_photo" :name="author.nick_name" content="查看個人檔案" :isDairyPage="true"/>
  </div>
  <storePage :infor="rest" class="store-infor hidden" @addOp="add_to_wheel(rest)" :key="rest._id"/>
  </div>
</template>