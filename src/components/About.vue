<script setup>
defineProps({
    info: String,
})
</script>

<template>

    <div class="flex flex-col space-y-4 lg:w-full justify-center">
        <p class="lg:text-2xl text-xl font-montserrat">關於</p>
        <div class="border-b-4 border-t-4 border-[#FF8E3C]"></div>
        <p class="font-montserrat">{{ info }}</p>

        <p class="lg:text-2xl text-xl font-montserrat">食記</p>
        <div class="border-b-4 border-t-4 border-[#FF8E3C]"></div>
    
    </div>
</template>

