<script setup>

import { ref } from 'vue';
import RedButton from './RedButton.vue'

defineProps({
    myImg: String,
    name: String,
    content:String,
    isDairyPage:Boolean
})

</script>

<template>

    <!-- 大螢幕 -->
    <div class="lg:flex flex-col space-y-8 items-center hidden">
        <img :src="myImg" class="w-36 rounded-full">
        <p class="text-3xl text-center">{{ name }}</p>
        <div v-if="!isDairyPage">
            <router-link to="/personalEdit"><RedButton :text="content"/></router-link>
        </div>
        <div v-if="isDairyPage">
            <router-link to="/myUserPage"><RedButton :text="content"/></router-link>
        </div>
        

    </div>

    <!-- 小螢幕 -->
    <div class="flex flex-wrap space-x-8 lg:hidden justify-center">
        <div>
            <img :src="myImg" class="w-28 rounded-full">
        </div>
        <div class="flex flex-col justify-between">
            <p class="text-3xl text-center">{{ name }}</p>
            <div v-if="!isDairyPage">
                <router-link to="/personalEdit"><RedButton :text="content"/></router-link>
            </div>
            <div v-if="isDairyPage">
                <router-link to="/myUserPage"><RedButton :text="content"/></router-link>
            </div>
        </div>

    </div>
    
</template>