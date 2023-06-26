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
                <p class="text-2xl hidden lg:flex">{{ name }}</p>

            </div>

            <div class="flex flex-col lg:justify-end justify-between">
                <p class="text-2xl lg:hidden">{{ name }}</p>
                <div class="flex space-x-4 items-center">
                    <img src="../assets/comment.png" class="lg:w-12 lg:h-12 w-8 h-8">
                    <p class="text-lg">{{ comment }}</p>
                    <img src="../assets/heart_empty.png" class="lg:w-12 lg:h-12 w-8 h-8">
                    <p class="text-lg">{{ heart }}</p>

                </div>

            </div>

        </div>
        <div class="border-b-2 border-t-2 border-[#FF8E3C] mt-4"></div>

    </div>
    
</template>

