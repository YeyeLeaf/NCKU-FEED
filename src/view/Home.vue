<script setup>
import storeCard from '../components/storeCard.vue'
import wheel from '../components/wheel.vue'
import searchBar from '../components/searchBar.vue'
import storePage from '../components/storePage.vue'
import { ref, onUpdated, computed } from 'vue'
import { user } from '../class.js'
import { isLogining ,getJwtFromCookie,isScrollingToBottom } from '../eventBus'

const recommendList = ref([]);
let pages=1;
const getRecommend = async ()=>{ 
  if (!isLogining.value){
    await fetch("http://localhost:5000/randomRecommend" , {
          method: "GET"
    })
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    })
    .then((result) => {
      recommendList.value = recommendList.value.concat(result.random_recommendation);
      //console.log(recommendList.value[0]);

    })
    .catch(function (error) {
        console.log(error);
    });

  }
  else{
    await fetch("http://localhost:5000/recommend/"+pages , {
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
      recommendList.value = recommendList.value.concat(result.recommendation);
      //console.log(recommendList.value[0]);

    })
    .catch(function (error) {
          console.log(error);
    });
    pages+=1;
  }
}
getRecommend();
window.addEventListener('scroll', async () => {
  if (isScrollingToBottom()) {
    try {
      if (pages<11 && isLogining.value){
        getRecommend();
      }
      else{
        pages=1;
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  }
});
const listData = ref([]);
const curr_restaurant = ref({});

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
const openDetail = async (item) => {
  curr_restaurant.value = item;
  console.log(item._id);

  await new Promise(resolve => {
    $('.store-infor').siblings().css('opacity', '0.5');
    $('body').css('overflow', 'hidden');
    resolve();
  });

  $('.store-infor').css("display", "flex");
};
</script>


<template>
  <div>
    <div class="flex justify-center">
      <a v-for="(value, index) in tab" :key="index" @click.prevent="Switch(index)" :class="{ change : index === num }" class="cursor-pointer px-5 p-2 text-xl font-bold text-[#525252]">{{ value }}</a>
    </div>
    <div v-show="num===0"><searchBar @add-result="addResult" @delete-result="deleteResult" @search-result="recommendList = $event"/></div>
    <div v-show="num===1"><wheel :List="listData" :RecommendList="recommendList"/></div>
    <div class=" bg-[#eff0f3] py-5 px-2 lg:m-10 m-6 rounded-3xl list">
      <h2 class="list-title lg:text-2xl text-xl font-bold text-center mb-5">所有商家</h2>
      <p class="text-lg lg:text-xl font-bold text-center mb-5">搜尋結果：<span v-for="item in filterResult">{{ item }}&nbsp;</span></p>
      <hr class="border-2 border-[#ff8e3c] text-center">
      <div class="flex justify-center flex-wrap">
        <storeCard v-for="(item, index) in recommendList" :key="index" :infor="item"  @addOp="add_to_wheel(item)" @open-detail="openDetail(item)"/>
      </div>
    </div>
  </div>
  <storePage :infor="curr_restaurant" class="store-infor hidden" @addOp="add_to_wheel(curr_restaurant)" :key="curr_restaurant._id"/>
</template>

<style scoped>
.change{
  border-bottom: 5px solid #ff8e3c;
  color: #ff8e3c;
  font-weight: bold;
}
</style>
