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
        <img :src="myImg" class="w-36">
        <p class="text-3xl">{{ name }}</p>
        <RedButton :text="content" class="" onclick="location.href='personalEdit.html'"/>

    </div>

    <div class="flex flex-wrap space-x-8 lg:hidden">
        <div>
            <img :src="myImg" class="w-28">
        </div>
        <div class="flex flex-col justify-between">
            <p class="text-3xl">{{ name }}</p>
            <RedButton :text="content" class="" onclick="location.href='personalEdit.html'"/>

        </div>

    </div>
    
</template>