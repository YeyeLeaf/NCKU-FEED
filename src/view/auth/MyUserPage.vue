<script setup>
import About from '../../components/About.vue'
import FeedName from '../../components/FeedName.vue'
import PersonalInfo from '../../components/PersonalInfo.vue'
import { user } from '../../class.js'
import { confirmAccess, cur_post } from '../../eventBus.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

confirmAccess();

const router = useRouter();

const postList = ref([]);
const getPost = async () => {
await fetch("http://127.0.0.1:5000/posts/user?uid="+ user.id, {
        method: "GET",
    })
    
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    })
    .then((result) => {
        console.log(result);
        let temp = result;
        postList.value = temp;
    })
    .catch(function (error) {
        console.log(error);
    });
}

getPost();

const openFeed = (item) => {
    cur_post.value = item;
    router.push('/diaryDisplay');
}
</script>

<template>
    <div class="flex-col lg:flex-row flex  lg:justify-evenly justify-center min-h-[700px]">
        <div class="lg:hidden mt-16 ">
            <PersonalInfo :myImg="user.profilePhoto" :name="user.nickName" content="編輯個人檔案" :isDairyPage="false"/>
        </div>

        <div class="flex flex-col lg:w-3/5 m-12 lg:mr-0 lg:ml-0 my-16 w-5/6">
            <About :info="user.selfIntro" class="mb-8"/>
            <FeedName v-for="(item, index) in postList" :key="index" :infor="item" class="mt-0" @click="openFeed(item)"/>
        </div>

        <div class="h-200 hidden lg:flex"> 
            <div class="w-0.5 h-full bg-gray-100"></div>
        </div>

        <div class="hidden lg:flex w-[15%] mt-12">
            <PersonalInfo :myImg="user.profilePhoto" :name="user.nickName" content="編輯個人檔案" :isDairyPage="false"/>
        </div>
    </div>

</template>

<style scoped>
</style>