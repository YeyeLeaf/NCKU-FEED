<script setup>
import { ref } from 'vue';

const props = defineProps({
    infor: Object,
})

const author = ref({});

const getUserData = async () => {
  const params = new URLSearchParams();
  params.append("uid", props.infor.uid); 

  await fetch("http://localhost:5000/user?" + params.toString(), {
    method: "GET"
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((result) => {
      //console.log(result);
      author.value = result.user_info;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getUserData();
</script>

<template>
    <div class="flex lg:w-full mb-2 justify-between shadow-md shadow-slate-300 rounded-md p-4 border-2 border-slate-100 cursor-pointer">
            <div class="flex items-center">
                <img :src="author.profile_photo" class="w-8 rounded-full mr-3">
                <p class="font-bold mr-6">{{ author.nick_name }}</p>
                <p class="text-md hidden lg:flex">{{ infor.title }}</p>
            </div>
            <div class="flex flex-col lg:justify-end justify-between">
                <p class="text-2xl lg:hidden">{{ infor.title }}</p>
                <div class="flex items-center space-x-1">
                    <!-- 
                      暫不開放貼文留言與點讚
                      <img src="../assets/comment.png" class="lg:w-6 lg:h-6 w-4 h-4">
                    <p class="text-sm">{{ infor.comments.length }}</p> -->
                    <!-- <img src="../assets/heart_empty.png" class="lg:w-6 lg:h-6 w-4 h-4">
                    <p class="text-sm">{{ infor.like }}</p> -->
                </div>
            </div>
    </div>
</template>

