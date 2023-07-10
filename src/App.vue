<script setup>
import storeCard from './components/storeCard.vue'
import Footer from './components/Footerr.vue'
import Navbar1 from './components/Navbar1.vue'
import Navbar2 from './components/Navbar2.vue'
import wheel from './components/wheel.vue'
import searchBar from './components/searchBar.vue'
import Preference from './components/Preference.vue'
import storePage from './components/storePage.vue'
import { ref, onUpdated, computed } from 'vue'
import { user } from './class.js'

const listData = ref([]);
const curr_restaurant = ref({});
const restaurant = ref([
  {
    img: "src/assets/leaf.png",
    alt: "leaf",
    Name: "YEYEYE",
    tags: ["中午", "韓"],
    star: 4.5
  },
  {
    img: "src/assets/leaf.png",
    alt: "leaf",
    Name: "YeyeLeaf",
    tags: ["中午", "韓"],
    star: 4.5
  },
  {
    img: "src/assets/leaf.png",
    alt: "leaf",
    Name: "築間",
    tags: ["中午"],
    star: 4.5
  },
  {
    img: "src/assets/leaf.png",
    alt: "leaf",
    Name: "星巴巴",
    tags: ["下午", "飲品"],
    star: 4.5
  }
]);

const add_to_wheel = (item) => {
  if(listData.value.length < 10){
    for(let i = 0; i < listData.value.length; i++){
      if(listData.value[i] === item) return;
    }
   listData.value.push(item);
  }
  else{
    alert("Lucky wheel is already full");
  }
}
const tab = ['餐廳搜尋', '選擇障礙轉盤'];
const num = ref(0);
const Switch = (index) => {
        num.value = index;
        let panziElement = ref(null);
        panziElement.value = document.querySelector('.panzi');
        panziElement.value.style.animationPlayState = 'paused'; 
    }
// filter
const filterResult = ref([]);
const addResult = (item) => {
  filterResult.value.push(item);
}
const deleteResult = (i) => {
  filterResult.value.splice(i, 1);
}
const openDetail = (item) => {
  curr_restaurant.value = item;
  $('.store-infor').css("display", "flex");
  $('.store-infor').siblings().css('opacity', '0.5');
  $('body').css('overflow', 'hidden');
}
</script>

<template>
  
  <!-- <Navbar1 /> -->
  <Navbar2 />
  <!-- <Preference v-if="user.isPrefer == false"/> -->
  <div v-if="user.isPrefer === false" class="mt-20">
    <div class="flex justify-center">
      <a v-for="(value, index) in tab" :key="index" @click.prevent="Switch(index)" :class="{ change : index === num }" class="cursor-pointer px-5 p-2 text-xl font-bold text-[#525252]">{{ value }}</a>
    </div>
    <div v-show="num===0"><searchBar @add-result="addResult" @delete-result="deleteResult"/></div>
    <div v-show="num===1"><wheel :List="listData"/></div>
    <div class=" bg-[#eff0f3] p-5 m-10 rounded-3xl list">
      <h2 class="list-title text-2xl font-bold text-center mb-5">所有商家</h2>
      <p class="text-lg font-bold text-center mb-5">搜尋結果：<span v-for="item in filterResult">{{ item }}&nbsp;</span></p>
      <hr class="border-2 border-[#ff8e3c] w-11/12 text-center">
      <div class="flex justify-center flex-wrap">
        <storeCard v-for="(item, index) in restaurant" :key="index" :linkImg="item.img" :altImg="item.alt" :name="item.Name" :tags="item.tags" :star="item.star" @addOp="add_to_wheel(item)" @open-detail="openDetail(item)"/>
      </div>
    </div>
  </div>
  <storePage :infor="curr_restaurant" class="store-infor hidden"/>
  <Footer />
</template>

<style scoped>
.change{
  border-bottom: 5px solid #ff8e3c;
  color: #ff8e3c;
  font-weight: bold;
}
</style>
