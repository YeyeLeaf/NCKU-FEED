<script setup>
import About from '../components/About.vue';
import FeedName from '../components/FeedName.vue';
import PersonalInfo from '../components/PersonalInfo.vue';
import { cur_post,confirmAccess,otherUser} from '../eventBus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

confirmAccess();

const router = useRouter();
const showLoader = ref(true);

onMounted(() => {
    setTimeout(() => {
      showLoader.value = false;
    }, 3500);
});

const postList = ref([]);
const getPost = async () => {
await fetch("http://127.0.0.1:5000/posts/user?uid="+ cur_post.value.uid, {
        method: "GET",
    })
    
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
    })
    .then((result) => {
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
    <div >
        <div class="flex-col lg:flex-row flex  lg:justify-evenly justify-center min-h-[700px] userPage">
        <div class="lg:hidden mt-16 ">
            <PersonalInfo :myImg="otherUser.profile_photo" :name="otherUser.nick_name" content="編輯個人檔案" :isDairyPage="false" :isMe="false"/>
        </div>

        <div class="flex flex-col lg:w-3/5 m-12 lg:mr-0 lg:ml-0 my-16 w-[80%]">
            <About :info="otherUser.self_intro" class="mb-8"/>
            <div v-if="showLoader" class="loader"></div>
            <div v-else>
                <FeedName v-for="(item, index) in postList" :key="index" :infor="item" class="mt-0" @click="openFeed(item)"/>
            </div>        
        </div>

        <div class="h-200 hidden lg:flex"> 
            <div class="w-0.5 h-full bg-gray-100"></div>
        </div>

        <div class="hidden lg:flex w-[15%] mt-12 justify-center">
            <PersonalInfo :myImg="otherUser.profile_photo" :name="otherUser.nick_name" content="編輯個人檔案" :isDairyPage="false" :isMe="false"/>
        </div>
    </div>

    </div>
    

</template>

<style scoped>
@media only screen and (max-width: 1024px){
    .userPage{
        align-items: center;
    }

}
.loader {   
        display: inline-block;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db; 
        border-radius: 50%; 
        width: 40px; 
        height: 40px; 
        animation: spin 2s linear infinite; 
        margin: 0 auto;

    }

@keyframes spin {
  0% { transform: rotate(0deg); } 
  100% { transform: rotate(360deg); } 
}
</style>