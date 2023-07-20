<script setup>
    defineProps({
        text: String,
        Onclick: String
    })

</script>

<template>
    <div class="bg-[#B80C0C] 
                rounded-md 
                text-white 
                px-4
                lg:px-8
                py-1
                hover:bg-[#b54747]
                transition-all
                text-base lg:text-xl font-medium
                text-center
                cursor-pointer
                ">
        <button onclick="v-bind:location.href='Onclick'" class="align-center">{{ text }}</button>

    </div>

</template>