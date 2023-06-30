<script setup>
</script>

<template>
    <div class="rounded-2xl border border-[#ff8e3c] max-w-sm">
        <form action="">
            <button class="bg-[#ff8e3c] text-white rounded-l-2xl md:p-4 p-2"><i class="fas fa-sliders-h mr-2" style="color: #ffffff;"></i>篩選</button>
            <input type="text" class="pl-4 pr-10" placeholder="搜尋">
            <button type="submit" class="">
                <i class="fas fa-search" style="color: #d5d5d6;"></i>
            </button>
        </form>
    </div>
</template>

<style>
input:focus {
    outline: none; 
}
</style>