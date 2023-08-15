<script setup>
defineProps({
    info: String,
})
</script>

<template>

    <div class="flex flex-col space-y-4 lg:w-full justify-center">
        <p class="lg:text-xl text-lg bg-[#ff8e3c] text-white px-4 py-1 lg:py-2 font-bold shadow-md shadow-slate-300 ">關於</p>
        <!-- <div class="border-b-4 border-t-4 border-[#FF8E3C]"></div> -->
        <p class="px-5">{{ info }}</p>

        <p class="lg:text-xl text-lg bg-[#ff8e3c] text-white px-4 py-1 lg:py-2 font-bold shadow-md shadow-slate-300">食記</p>
        <!-- <div class="border-b-4 border-t-4 border-[#FF8E3C]"></div> -->
    </div>
</template>

