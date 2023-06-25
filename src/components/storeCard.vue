<script setup>
defineProps({
    linkImg: String,
    altImg: String,
    name: String,
    tag: Array,
})
</script>

<template>
    <New />
    <div class="w-80 rounded-2xl shadow-md shadow-gray-300 p-4 flex flex-col h-96 justify-between mb-12">
        <img :src="linkImg" :alt="altImg" class="h-56 w-full rounded-2xl bg-lightOrange"/>
        <p class="text-xl">{{ name }}</p>
        <!-- <button v-for="(item, index) in tag" :key="index" class="bg-lightOrange rounded-full border border-Orange px-4 py-1 w-16">{{ item }}</button> -->
        <button class="bg-lightOrange rounded-full border border-Orange px-4 py-1 w-20">Tag 1</button>
        <div class="flex justify-between">
            <button class="bg-Orange text-white p-1 rounded-md">詳細資料</button>
            <button class="bg-darkRed text-white p-1 rounded-md">加入轉盤</button>   
        </div>
        
    </div>
</template>