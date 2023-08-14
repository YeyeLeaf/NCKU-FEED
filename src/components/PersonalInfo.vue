<script setup>
defineProps({
    myImg: String,
    name: String,
    content:String,
})
import RedButton from './RedButton.vue'
</script>

<template>

    <div class="lg:flex flex-col space-y-8 items-center hidden">
        <img :src="myImg" class="w-36 rounded-full">
        <p class="text-3xl text-center">{{ name }}</p>
        <router-link to="/personalEdit"><RedButton :text="content"/></router-link>

    </div>

    <div class="flex flex-wrap space-x-8 lg:hidden">
        <div>
            <img :src="myImg" class="w-28 rounded-full">
        </div>
        <div class="flex flex-col justify-between">
            <p class="text-3xl text-center">{{ name }}</p>
            <router-link to="/personalEdit"><RedButton :text="content"/></router-link>
        </div>

    </div>
    
</template>