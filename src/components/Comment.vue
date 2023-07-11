<script setup>
import Star from './Star.vue'
defineProps({
  img: String,
  content: String,
  stars: Array  
})
</script>
<template>
  <div class="flex w-full mb-2 justify-between items-center shadow-md shadow-slate-300 rounded-md p-4 border-2 border-slate-100">
    <div class="flex">
        <img :src="img" class="h-8 rounded-full mr-3">
        <p class="text-md text-left">{{ content }}</p>
    </div>
    <Star :stars="stars"/>
  </div>
</template>