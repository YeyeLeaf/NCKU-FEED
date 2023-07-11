<script setup>
import { ref } from 'vue';
defineProps({
  stars: Array
})



const rating = ["環境整潔", "服務態度", "美味程度", "CP值", "綜合評分"];
const isShow = ref(false);
const btnToggle = () => {
  isShow.value = !isShow.value;
}
</script>
<template>
  <button class="bg-[#ff8e3c] text-white rounded-2xl py-1 px-2 w-28 relative">{{ stars[4] }}&nbsp;<i class="fas fa-star" @click="btnToggle"></i>
    <div v-if="isShow" class="absolute detail bg-white border-2 border-[#ff8e3c] p-4 w-56 right-0 top-full z-10">
      <p v-for="(item, index) in rating" :key="index" class="text-black flex justify-between items-center">
        <span class="w-6/12">{{ item }}</span>
        <span>
          <i v-for="n in stars[index]" class="fas fa-star text-[#ff8e3c]"></i>
          <i v-for="n in (5 - stars[index])" class="far fa-star text-[#ff8e3c]"></i>
        </span>
      </p>
    </div>
  </button>
</template>