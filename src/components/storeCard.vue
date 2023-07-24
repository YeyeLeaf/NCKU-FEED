<script setup>
import { ref, onMounted, onUpdated } from 'vue'
import { user } from '../class.js'
import Star from './Star.vue'
const props = defineProps({
    infor: Object
})

const emit = defineEmits(['addOp', 'open-detail']);

const isCollected = ref(false);

const collect = () => {
    if(isCollected.value){
        for(let i = 0; i < user.restaurant.length; i++){
            if(user.restaurant[i] === props.infor.Name){
                user.restaurant.splice(i, 1);
            }
        }
    }
    else{
        for(let i = 0; i < user.restaurant.length; i++){
            if(user.restaurant[i] === props.infor.Name){
                isCollected.value = !isCollected.value;
                return;
            }
        }
        user.restaurant.push(props.infor.Name);
    }
    isCollected.value = !isCollected.value;
    console.log(user.restaurant);
}
</script>

<template>
    <div class="mx-6 rounded-2xl shadow-md shadow-gray-300 p-4 flex flex-col h-96 justify-between my-6 bg-white box-border relative w-52">
        <div class="absolute top-6 left-6 text-[#b80c0c] cursor-pointer" @click="collect">
            <i v-show="isCollected === false" class="far fa-bookmark"></i>
            <i v-show="isCollected === true" class="fas fa-bookmark"></i>
        </div>
        <img :src="infor.img" :alt="infor.alt" class="h-auto w-full rounded-2xl bg-lightOrange "/>
        <div class="flex justify-between items-center">
            <p class="text-xl">{{ infor.Name }}</p>
            <button class="bg-[#ff8e3c] text-white rounded-2xl py-1 px-2">{{ infor.star }}&nbsp;<i class="fas fa-star"></i></button>
        </div>
        <div>
            <button v-for="(tag, index) in infor.tags" :key="index" class="bg-[#ffe0c9] rounded-full border border-[#ff8e3c] px-4 py-1 min-w-16 mr-2">{{ tag }}</button>
        </div>
        <div class="flex justify-between">
            <button class="bg-Orange text-white p-1 rounded-md" @click="$emit('open-detail')">詳細資料</button>
            <button class="bg-darkRed text-white p-1 rounded-md AddPnazi" @click="$emit('addOp')">加入轉盤</button>   
        </div>
        
    </div>
</template>
