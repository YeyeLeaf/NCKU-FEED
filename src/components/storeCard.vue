<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { user } from '../class.js'
import Star from './Star.vue'
import { textTruncation, isLogining, getJwtFromCookie } from '../eventBus';
const props = defineProps({
    infor: Object
})

const emit = defineEmits(['addOp', 'open-detail']);

const isCollected = ref(false);
const alreadyCollect = () => {
  if(isLogining.value){
    if(user.restaurant.includes(props.infor._id)){
      isCollected.value = true;
    }
  }
}
alreadyCollect();
const addCollect = async () => {
  const token = getJwtFromCookie();  
  await fetch("http://localhost:5000/user", {
    method: "PUT",
    headers: {
    "Authorization": `Bearer ${token}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "restaurant_id": props.infor._id
    })
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then((result) => {
    console.log(result);
    user.restaurant = result.restaurants_id;
  })
  .catch(function (error) {
    console.log(error);
  });
};

const delCollect = async () => {
  const token = getJwtFromCookie();  
  await fetch("http://localhost:5000/user", {
    method: "DELETE",
    headers: {
    "Authorization": `Bearer ${token}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "restaurant_id": props.infor._id
    })
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then((result) => {
    console.log(result);
    user.restaurant = result.restaurants_id;
    console.log(user.restaurant);
  })
  .catch(function (error) {
    console.log(error);
  });
};

const collect = () => {
    if(!isLogining.value) alert("登入以使用收藏功能");
    else{
      console.log(user.restaurant);
      if(user.restaurant.includes(props.infor._id)){
            delCollect();
            isCollected.value = false;
        }
      else{
            addCollect();
            isCollected.value = true;
      }
    }
}

const updateStatus = () => {
  if(!isLogining.value) alert("登入以使用收藏功能");
    else{
      console.log(user.restaurant);
      if(user.restaurant.includes(props.infor._id)){
            isCollected.value = false;
        }
      else{
            isCollected.value = true;
      }
    }
}

</script>

<template>
    <div class="mx-4 rounded-2xl shadow-md shadow-gray-300 p-5 flex flex-col h-96 justify-between my-6 bg-white box-border relative w-72">
        <!-- <div class="absolute top-6 left-8 text-[#b80c0c] cursor-pointer z-10" @click="collect">
            <i v-show="isCollected === false" class="far fa-bookmark"></i>
            <i v-show="isCollected === true" class="fas fa-bookmark"></i>
        </div> -->
        <div class="overflow-hidden rounded-2xl">
            <img src="src/assets/leaf.png" class="lg:h-48 h-52 w-full rounded-2xl hover:scale-110 transition-transform"/>
        </div>
        <div class="flex justify-between items-center">
            <p class="hidden lg:flex lg:text-xl">{{ textTruncation(infor.name,8) }}</p>
            <p class="text-lg lg:hidden">{{ textTruncation(infor.name,9) }}</p>
            <button class="bg-[#ff8e3c] text-white rounded-2xl py-1 px-2">{{ infor.star }}&nbsp;<i class="fas fa-star"></i></button>
        </div>
        <div class="flex overflow-x-scroll whitespace-nowrap">
            <button v-for="(tag, index) in infor.tags" :key="index" class="bg-[#ffe0c9] rounded-full border border-[#ff8e3c] px-2 lg:py-1 py-0.5 mr-2"># {{ tag }}</button>
        </div>
        <div class="flex justify-between">
            <button class="bg-Orange text-white p-1 rounded-md" @click="$emit('open-detail')">詳細資料</button>
            <button class="bg-darkRed text-white p-1 rounded-md AddPnazi hover:bg-[#ed0000]" @click="$emit('addOp')">加入轉盤</button>   
        </div>
        
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 11px;
  height: 11px;
  border-radius: 10px;
}
::-webkit-scrollbar:hover {
  background-color: #fff;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 10px;
  background: #ffe0c9;
  border: 2px solid transparent;
  background-clip: padding-box;
}
</style>