<script setup>
import { ref } from 'vue';
const props = defineProps({
    stars: Object
})

const rating = ["環境整潔", "服務態度", "美味程度", "CP值"];
const isShow = ref(false);
const btnToggle = () => {
  isShow.value = !isShow.value;
}
const rated_number = ref([0,0,0,0]);
let ave = 0.0;
const objectToArray = () =>{
  if (!props.stars){
    return;
  }
  rated_number.value[0] = props.stars.cleanliness;
  rated_number.value[1] = props.stars.service;
  rated_number.value[2] = props.stars.deliciousness;
  rated_number.value[3] = props.stars.CPR;
  let sum = 0.0;
  for (let i = 0 ; i<4;i++){
    sum+=rated_number.value[i];
  }
  ave = sum/4.0;
}

objectToArray();
</script>
<template>
  <button class="bg-[#ff8e3c] text-white rounded-2xl py-1 px-2  w-20 relative whitespace-nowrap starButton">{{ ave }}&nbsp;<i class="fas fa-star" @click="btnToggle"></i>
    <div v-if="isShow" class="absolute detail bg-white border-2 border-[#ff8e3c] p-4 w-56 right-0 top-full z-10 showbox">
      <p v-for="(item, index) in rating" :key="index" class="text-black flex justify-between items-center">
        <span class="w-6/12">{{ item }}</span>
        <span>
          <i v-for="n in rated_number[index]" class="fas fa-star text-[#ff8e3c]"></i>
          <i v-for="n in (5 - rated_number[index])" class="far fa-star text-[#ff8e3c]"></i>
        </span>
      </p>
    </div>
  </button>
</template>

<style scoped>


@media only screen and (max-width: 500px){
  .starButton{
    width: 3.5rem;

  }
  .starButton i{
    font-size: 10px;
  }

  .starButton .showbox{
    width: 11rem;
  }
}

</style>