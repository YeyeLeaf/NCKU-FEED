<script setup>
import storeCard from '../../components/storeCard.vue'
import storePage from '../../components/storePage.vue'
import { ref, onUpdated, computed } from 'vue'
import { user } from '../../class.js'

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
    alt: "starbaba",
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

const openDetail = (item) => {
  curr_restaurant.value = item;
  $('.store-infor').css("display", "flex");
  $('.store-infor').siblings().css('opacity', '0.5');
  $('body').css('overflow', 'hidden');
}
</script>

<template>
  <div v-if="user.isPrefer === false" >
    <div class=" bg-[#eff0f3] p-5 lg:m-10 m-5 rounded-3xl list">
      <h2 class="list-title text-2xl font-bold text-center mb-5">所有商家</h2>
      <hr class="border-2 border-[#ff8e3c] text-center">
      <div class="flex justify-center flex-wrap">
        <storeCard v-for="(item, index) in restaurant" :key="index" :infor="item"  @addOp="add_to_wheel(item)" @open-detail="openDetail(item)"/>
      </div>
    </div>
  </div>
  <storePage :infor="curr_restaurant" class="store-infor hidden" @addOp="add_to_wheel(curr_restaurant)"/>
</template>

<style scoped>
</style>