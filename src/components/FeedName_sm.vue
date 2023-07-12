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
            <div class="flex space-x-2 items-center">
                <img :src="authorImg" class="w-12">
                <p class="text-md hidden lg:flex">{{ name }}</p>
            </div>
            <div class="flex flex-col lg:justify-end justify-between">
                <p class="text-2xl lg:hidden">{{ name }}</p>
                <div class="flex items-center space-x-1">
                    <img src="../assets/comment.png" class="lg:w-6 lg:h-6 w-4 h-4">
                    <p class="text-sm">{{ comment }}</p>
                    <img src="../assets/heart_empty.png" class="lg:w-6 lg:h-6 w-4 h-4">
                    <p class="text-sm">{{ heart }}</p>
                </div>
            </div>
    </div>
</template>

