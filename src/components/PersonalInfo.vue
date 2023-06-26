<script setup>
defineProps({
    myImg: String,
    name: String,
})
import RedButton from './RedButton.vue'
</script>

<template>

    <div class="flex flex-col space-y-8 lg:block hidden">
        <img :src="myImg" class="w-36">
        <p class="text-3xl">{{ name }}</p>
        <RedButton text="編輯個人檔案" class="" onclick="location.href='#'"/>

    </div>

    <div class="flex flex-wrap space-x-8 lg:hidden block">
        <div>
            <img :src="myImg" class="w-28">
        </div>
        <div class="flex flex-col justify-between">
            <p class="text-3xl">{{ name }}</p>
            <RedButton text="編輯個人檔案" class="" onclick="location.href='#'"/>

        </div>

    </div>

</template>