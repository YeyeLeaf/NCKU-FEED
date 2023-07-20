<script setup>
defineProps({
    authorImg: String,
    name: String,
    comment: Number,
    heart: Number
})


</script>

<template>
    <div class="flex lg:w-full mb-2 justify-between shadow-md shadow-slate-300 rounded-md p-4 border-2 border-slate-100 cursor-pointer">
            <div class="flex space-x-8 items-center">
                <img :src="authorImg" class="w-20">
                <p class="text-2xl hidden lg:flex">{{ name }}</p>
            </div>
            <div class="flex flex-col lg:justify-end justify-between">
                <p class="text-2xl lg:hidden">{{ name }}</p>
                <div class="flex space-x-4 items-center">
                    <img src="../assets/comment.png" class="lg:w-8 lg:h-8 w-6 h-6">
                    <p class="text-lg">{{ comment }}</p>
                    <img src="../assets/heart_empty.png" class="lg:w-8 lg:h-8 w-6 h-6">
                    <p class="text-lg">{{ heart }}</p>
                </div>
            </div>
    </div>
</template>

