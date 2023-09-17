<script setup>
import storeCard from '../../components/storeCard.vue'
import storePage from '../../components/storePage.vue'
import { ref, onUpdated, computed } from 'vue'
import { user } from '../../class.js'
import { confirmAccess} from '../../eventBus.js';

confirmAccess();
const listData = ref([]);
const curr_restaurant = ref({});
const restaurant = ref([]);

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

const openDetail = async (item) => {
  curr_restaurant.value = item;

  await new Promise(resolve => {
    $('.store-infor').siblings().css('opacity', '0.5');
    $('body').css('overflow', 'hidden');
    resolve();
  });

  $('.store-infor').css("display", "flex");
};

const getCollect = async () => {
    for(let i = 0; i < user.restaurant.length; i++){
      await fetch("http://127.0.0.1:5000/restaurants?restaurant_id=" + user.restaurant[i], {
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
        restaurant.value.push(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
getCollect();
</script>

<template>
  <div>
    <div class=" bg-[#eff0f3] p-5 lg:m-10 m-5 rounded-3xl list min-h-[600px]">
      <h2 class="list-title text-2xl font-bold text-center mb-5">收藏清單</h2>
      <hr class="border-2 border-[#ff8e3c] text-center">
      <div class="flex justify-center flex-wrap">
        <storeCard v-for="(item, index) in restaurant" :key="index" :infor="item"  @addOp="add_to_wheel(item)" @open-detail="openDetail(item)"/>
      </div>
      <!-- 沒有美術能力卡住ＱＱ -->
      <div v-if="user.restaurant.length==0" class="flex space-y-20 justify-center items-center h-full">
        <h2 class="my-2">啪！什麼都沒有</h2>
      </div>
    </div>
  </div>
  <storePage :infor="curr_restaurant" class="store-infor hidden" @addOp="add_to_wheel(curr_restaurant)" :key="curr_restaurant._id"/>
</template>

<style scoped>
</style>