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
    <div class="flex lg:w-full w-full mb-2 justify-between shadow-md shadow-slate-300 rounded-md p-4 border-2 border-slate-100 cursor-pointer items-center px-7">
            <div class="flex space-x-8 items-center">
                <img :src="author.profile_photo" class="w-20 rounded-full">
                <p class="text-2xl hidden lg:flex font-bold">{{ author.nick_name }}</p>
                <p class="text-2xl hidden lg:flex">{{ infor.title }}</p>
            </div>
            <div class="flex flex-col lg:justify-end justify-between">
                <p class="text-2xl lg:hidden">{{ infor.title }}</p>
                <div class="flex space-x-4 items-center">
                    <!-- 
                      暫不開放貼文留言與點讚
                      <img src="../assets/comment.png" class="lg:w-8 lg:h-8 w-6 h-6">
                    <p class="text-lg">{{ comment }}</p> -->
                    <!-- <img src="../assets/heart_empty.png" class="lg:w-8 lg:h-8 w-6 h-6">
                    <p class="text-lg">{{ infor.like }}</p> -->
                </div>
            </div>
    </div>
</template>

