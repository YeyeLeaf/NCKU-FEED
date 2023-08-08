<script setup>
import { ref } from 'vue'
import FeedName_sm from './FeedName_sm.vue'
import Comment  from './Comment.vue';
import { user } from '../class.js'
const props = defineProps({
  infor: Object
});
$(document).ready(function () {
  $('.close').click(function (e) { 
    e.preventDefault();
    $('.store-infor').hide();
    $('.store-infor').siblings().css('opacity', '1');
    $('body').css('overflow', 'auto');
  });
});

const tab = ['評論', '食記'];
const num = ref(0);
const Switch = (index) => {
        num.value = index;
        let panziElement = ref(null);
        panziElement.value = document.querySelector('.panzi');
        panziElement.value.style.animationPlayState = 'paused'; 
    }

const isCollected = ref(false);

const collect = () => {
    if(isCollected.value){
        for(let i = 0; i < user.restaurant.length; i++){
            if(user.restaurant[i] === props.infor.Name){
                user.restaurant.splice(i, 1);
            }
        }
    }
    else{
        for(let i = 0; i < user.restaurant.length; i++){
            if(user.restaurant[i] === props.infor.Name){
                isCollected.value = !isCollected.value;
                return;
            }
        }
        user.restaurant.push(props.infor.Name);
    }
    isCollected.value = !isCollected.value;
    console.log(user.restaurant);
}
</script>
<template>
  <div class="bg-white fixed w-[800px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between z-10 rounded-2xl p-8 box-border">
      <div class="w-5/12 p-1 h-80">
        <img :src="infor.img" :alt="infor.alt" class="rounded-2xl h-44 w-full">
        <div class="flex justify-between items-center my-2">
          <h2 class="text-xl">{{ infor.Name }}</h2>
          <button class="bg-[#ff8e3c] text-white rounded-2xl py-1 px-2">{{ infor.star }}&nbsp;<i class="fas fa-star"></i></button>
        </div>
        <button v-for="(tag, index) in infor.tags" :key="index" class="bg-[#ffe0c9] rounded-full border border-[#ff8e3c] px-4 py-1 min-w-16 mr-2">{{ tag }}</button>
        <ul>
          <li class="my-2"><i class="fas fa-clock w-4" style="color: #525252;"></i>&nbsp;星期一 10:00~22:00</li>
        </ul>
        <a href="" class="my-2 cursor-pointer hover:underline"><i class="fas fa-map-marker-alt w-4" style="color: #525252;"></i>&nbsp;704台南市北區勝利路206巷8號</a>
        <p class="my-2"><i class="fas fa-phone-alt w-4" style="color: #525252;"></i>&nbsp;06 275 7575</p>
        <a href="" class="my-2 cursor-pointer hover:underline"><i class="fas fa-link w-4" style="color: #525252;"></i>&nbsp;網站連結：facebook.com</a>
      </div>
      <div class="w-7/12 p-1">
        <div class="flex justify-between items-center h-10 mb-1">
          <div>
            <a v-for="(value, index) in tab" :key="index" @click.prevent="Switch(index)" :class="{ change: index === num }" class="cursor-pointer py-2 font-bold text-[#9c9c9c] mr-2">{{ value }}</a>
          </div>
          <div>
            <button class="bg-[#b80c0c] text-white rounded-md w-24 p-1 mr-1" @click="$emit('addOp')">加入轉盤&nbsp;<i class="fas fa-plus-circle" style="color: #ffffff;"></i></button>
            <button v-if="isCollected === false" class="bg-[#b80c0c] text-white rounded-md w-24 p-1" @click="collect">收藏&nbsp;<i class="fas fa-bookmark"></i></button>
            <button v-if="isCollected === true" class="bg-[#b80c0c] text-white rounded-md w-24 p-1" @click="collect">取消收藏&nbsp;<i class="fas fa-bookmark"></i></button>
          </div>
        </div>
        <div class="border-y-2 mb-1 border-[#FF8E3C]"></div>
        <div class="h-80 overflow-hidden box-border">
          <div v-show="num===0" class="max-h-full overflow-y-scroll">
            <form action="" class="flex z-10 align-top p-4">
              <div class="flex">
                <img :src="user.profilePhoto" class="h-8 rounded-full mr-3">
                <textarea name="comment" cols="30" rows="5" maxlength="150" class="resize-none outline-none h-16 w-3/4" placeholder="撰寫評論...（上限150字）"></textarea>
              </div>
              <div>
                <button class="rounded-md bg-[#ff8e3c] text-white p-1 mb-1 w-full">評分選項</button>
                <button class="rounded-md bg-[#b80c0c] text-white p-1 w-full">送出</button>
              </div>
            </form>
            <Comment img="src/assets/leaf.png" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." :stars="[1.0, 2.0, 3.0, 4.0, 5.0]" />
            <Comment img="src/assets/leaf.png" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." :stars="[1.0, 2.0, 3.0, 4.0, 5.0]" />
            <Comment img="src/assets/leaf.png" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." :stars="[1.0, 2.0, 3.0, 4.0, 5.0]" />
          </div>
          <div v-show="num===1" class="max-h-full overflow-y-scroll">
            <div class="flex p-4">
              <img :src="user.profilePhoto" class="h-8 rounded-full mr-3">
              <router-link to="/diaryEditor" class="rounded-md bg-[#b80c0c] text-white py-1 px-2">撰寫食記</router-link>
            </div>
            <FeedName_sm authorImg="src/assets/user_black.png" name="標題" :comment="99" :heart="100" class="mt-0"/>
            <FeedName_sm authorImg="src/assets/user_black.png" name="標題" :comment="99" :heart="100" class="mt-0"/>
            <FeedName_sm authorImg="src/assets/user_black.png" name="標題" :comment="99" :heart="100" class="mt-0"/>
            <FeedName_sm authorImg="src/assets/user_black.png" name="標題" :comment="99" :heart="100" class="mt-0"/>
            <FeedName_sm authorImg="src/assets/user_black.png" name="標題" :comment="99" :heart="100" class="mt-0"/>
          </div>
        </div>
      </div>
      <span class="absolute top-1 right-3 close cursor-pointer text-lg">x</span>
  </div>
</template>

<style scoped>
.change {
  color: #525252;
}
::-webkit-scrollbar {
  width: 11px;
  height: 11px;
  border-radius: 10px;
}
::-webkit-scrollbar:hover {
  background-color: #ececec;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #9c9c9c;
  border: 2px solid transparent;
  background-clip: padding-box;
}
</style>