<script setup>
import storeCard from '../components/storeCard.vue'
import wheel from '../components/wheel.vue'
import searchBar from '../components/searchBar.vue'
import storePage from '../components/storePage.vue'
import { ref, onUpdated, computed } from 'vue'
import { user } from '../class.js'
import { isLogining ,getJwtFromCookie} from '../eventBus'

// to be fixed : 推薦餐廳會先跑空的出來，然後按一下其他任意鍵才會出現完整的 應該是順序問題 因為已確定recommendRes有存到餐廳
let recommendRestaurant = [{
  address: "",
  name: "",
  open_hour:  [],
  phone_number: "",
  service: [],
  star: 3.9,
  tags: [],
  website: ""
}];

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
        recommendRestaurant=result.random_recommendation;
        console.log(recommendRestaurant);

    })
    .catch(function (error) {
        console.log(error);
    });

  }
  else{
    const token = getJwtFromCookie();  
    await fetch("http://localhost:5000/recommend/4" , {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
    })
    .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
    })
    .then((result) => {
          recommendRestaurant=result.recommendation;
          console.log(recommendRestaurant);
    })
    .catch(function (error) {
          console.log(error);
    });
  }
}
getRecommend();


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
  <div>
    <div class="flex justify-center">
      <a v-for="(value, index) in tab" :key="index" @click.prevent="Switch(index)" :class="{ change : index === num }" class="cursor-pointer px-5 p-2 text-xl font-bold text-[#525252]">{{ value }}</a>
    </div>
    <div v-show="num===0"><searchBar @add-result="addResult" @delete-result="deleteResult"/></div>
    <div v-show="num===1"><wheel :List="listData"/></div>
    <div class=" bg-[#eff0f3] py-5 px-2 lg:m-10 m-6 rounded-3xl list">
      <h2 class="list-title lg:text-2xl text-xl font-bold text-center mb-5">所有商家</h2>
      <p class="text-lg lg:text-xl font-bold text-center mb-5">搜尋結果：<span v-for="item in filterResult">{{ item }}&nbsp;</span></p>
      <hr class="border-2 border-[#ff8e3c] text-center">
      <div class="flex justify-center flex-wrap">
        <storeCard v-for="(item, index) in recommendRestaurant" :key="index" :infor="item"  @addOp="add_to_wheel(item)" @open-detail="openDetail(item)"/>
      </div>
    </div>
  </div>
  <storePage :infor="curr_restaurant" class="store-infor hidden" @addOp="add_to_wheel(curr_restaurant)"/>
</template>

<style scoped>
.change{
  border-bottom: 5px solid #ff8e3c;
  color: #ff8e3c;
  font-weight: bold;
}
</style>
