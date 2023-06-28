<script setup>
import storeCard from './components/storeCard.vue'
import Footer from './components/Footerr.vue'
import Navbar1 from './components/Navbar1.vue'
import Navbar2 from './components/Navbar2.vue'
import wheel from './components/wheel.vue'
import { ref } from 'vue'
const listData = ref([{
    img: "",
    alt: "",
    Name: "Lucky Wheel!"
  }]);
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
    if(listData.value[0].Name === "Lucky Wheel!"){
      listData.value[0] = item;
    }
   else listData.value.push(item);
  }
  else{
    alert("Lucky wheel is already full");
  }
}
</script>

<template>
  
  <!-- <Navbar1 /> -->
   <Navbar2 />
   <wheel :List="listData"/>
  <div class="flex justify-center flex-wrap bg-[#eff0f3] p-5 m-10 rounded-3xl">
    <storeCard v-for="(item, index) in restaurant" :key="index" :linkImg="item.img" :altImg="item.alt" :name="item.Name" @addOp="add_to_wheel(item)"/>
  </div>
  <Footer />
</template>

<style scoped>
/*hi*/
</style>
