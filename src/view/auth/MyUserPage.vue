<script setup>
import About from '../../components/About.vue'
import FeedName from '../../components/FeedName.vue'
import PersonalInfo from '../../components/PersonalInfo.vue'
import { user } from '../../class.js'
import { confirmAccess } from '../../eventBus.js';

confirmAccess();

</script>

<template>
    <div class="flex flex-nowrap lg:justify-evenly justify-center">
        <div class="lg:hidden mt-12">
            <PersonalInfo :myImg="user.profilePhoto" :name="user.nickName" content="編輯個人檔案"/>
        </div>

        <div class="flex flex-col lg:w-3/5 m-12 lg:mr-0 lg:ml-0 mb-12 mt-12">
            <About :info="user.selfIntro"
            class="mb-8"/>
            <FeedName :authorImg="user.profilePhoto" name="標題" :comment="99" :heart="100" class="mt-0"/>
        </div>

        <div class="h-200 hidden lg:flex"> 
            <div class="w-0.5 h-full bg-gray-100"></div>
        </div>

        <div class="hidden lg:flex mt-16 w-[15%]">
            <PersonalInfo :myImg="user.profilePhoto" :name="user.nickName" content="編輯個人檔案"/>
        </div>
    </div>

</template>

<style scoped>
</style>