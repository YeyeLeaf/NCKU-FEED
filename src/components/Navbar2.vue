// 未登入

<script setup>
import RedButton from './RedButton.vue'

</script>

<template>
    <nav class="flex items-center justify-between flex-wrap bg-[#FF8E3C] p-4 lg:p-0 fixed top-0 inset-x-0 z-10">
        <div class="lg:flex items-center text-white mr-6 ml-4">
            <a href="index.html" class="flex items-center">
                <picture class="hidden lg:flex">
                    <img src="../assets/nckufeed_white.svg" class="lg:h-20 lg:mx-2 lg:pl-8">
                </picture>
                <span class="font-mono font-bold text-2xl tracking-tight">NCKU FEED</span>
            </a>
        </div>
        <div class="lg:flex item-center">
            <h1 class="pt-1 text-white font-sans text-lg hidden lg:block">登入以收藏餐廳與發表食記</h1>
            <RedButton text="登入" class="mx-4 lg:mx-20" onclick="location.href='login.html'"/>
        </div>

      </nav>

</template>