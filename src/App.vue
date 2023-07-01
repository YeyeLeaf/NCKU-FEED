<script setup>
import storeCard from './components/storeCard.vue'
import Footer from './components/Footerr.vue'
import Navbar1 from './components/Navbar1.vue'
import Navbar2 from './components/Navbar2.vue'
import wheel from './components/wheel.vue'
import searchBar from './components/searchBar.vue'
import { ref } from 'vue'


const listData = ref([]);
const restaurant = ref([
  {
    img: "src/assets/leaf.png",
    alt: "leaf",
    Name: "YEYEYE"
  },
  {
    img: "src/assets/leaf.png",
    alt: "leaf",
    Name: "YeyeLeaf"
  },
  {
    img: "src/assets/leaf.png",
    alt: "leaf",
    Name: "築間"
  },
  {
    img: "src/assets/leaf.png",
    alt: "leaf",
    Name: "星巴巴"
  }
]);

const add_to_wheel = (item) => {
  if(listData.value.length < 10){
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
    }

const filterResult = ref([]);

const addResult = (item) => {
  filterResult.value.push(item);
}

const deleteResult = (i) => {
  filterResult.value.splice(i, 1);
}
</script>

<template>
  
  <!-- <Navbar1 /> -->
  <Navbar2 />
  <div class="flex justify-center">
    <a v-for="(value, index) in tab" :key="index" @click.prevent="Switch(index)" :class="{ change : index === num }" class="cursor-pointer px-5 py-3 text-xl font-bold text-[#525252]">{{ value }}</a>
  </div>
  <div v-show="num===0"><searchBar @add-result="addResult" @delete-result="deleteResult"/></div>
  <div v-show="num===1"><wheel :List="listData"/></div>
  <div class=" bg-[#eff0f3] p-5 m-10 rounded-3xl">
    <h2 class="list-title text-2xl font-bold text-center mb-5">所有商家</h2>
    <p class="text-lg font-bold text-center mb-5">搜尋結果：<span v-for="item in filterResult">{{ item }}&nbsp;</span></p>
    <hr class="border-2 border-[#ff8e3c] w-11/12 text-center">
    <div class="flex justify-center flex-wrap">
      <storeCard v-for="(item, index) in restaurant" :key="index" :linkImg="item.img" :altImg="item.alt" :name="item.Name" @addOp="add_to_wheel(item)"/>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.change{
  border-bottom: 5px solid #ff8e3c;
  color: #ff8e3c;
  font-weight: bold;
}
</style>
