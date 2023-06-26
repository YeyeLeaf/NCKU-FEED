<script setup>
defineProps({
    authorImg: String,
    name: String,
    comment: String, //這邊先預設是字串，不過應該要是數字 還沒弄清楚應該要怎麼寫
    heart: String ,
})


</script>

<template>

    <div class="flex flex-col lg:w-full mb-4 justify-center">
        <div class="flex justify-between">
            <div class="flex space-x-8 items-center">
                <img :src="authorImg" class="w-20">
                <p class="text-2xl">{{ name }}</p>

            </div>

            <div class="flex space-x-4 items-end">
                <img src="../assets/comment.png" class="w-12 h-12">
                <p class="text-lg">{{ comment }}</p>
                <img src="../assets/heart_empty.png" class="w-12 h-12">
                <p class="text-lg">{{ heart }}</p>

            </div>
        </div>
        <div class="border-b-2 border-t-2 border-[#FF8E3C] mt-4"></div>

    </div>
    
</template>

