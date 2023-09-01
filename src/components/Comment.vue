<script setup>
import Star from './Star.vue';
import { storage} from '../firebase/firebaseConfig';
import {  ref as firebaseRef,getDownloadURL } from 'firebase/storage';
import { ref as vueRef } from 'vue';
import { user } from '../class.js';
import { textTruncation } from '../eventBus';

const props = defineProps({
    infor: Object
})

const emit = defineEmits(['delete-comment','edit-comment']);

const img = vueRef('');
//取得使用者大頭貼照片
const getUserPic = async () =>{
  if (!props.infor){
    return
  }
  await fetch("http://localhost:5000/user?uid="+props.infor.uid, {
    method: "GET",
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then((result) => {
      img.value = result.user_info.profile_photo;
                  
  })
  .catch(function (error) {
    console.log(error);
  });
  
}
getUserPic();

const isMe = vueRef(false);
if (props.infor.uid == user.id){
  isMe.value = true;
}
const deleteComment = async () => { 
  await fetch("http://localhost:5000/comments", {
    method: "DELETE",
    headers: {
    "Authorization": `Bearer ${user.access_token}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'id':props.infor._id
    })
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  emit('delete-comment')
};

</script>
<template>
  <div class="flex w-full mb-2 justify-between items-center shadow-md shadow-slate-300 rounded-md p-4 border-2 border-slate-100">
    <div class="flex">
        <img :src="img" class="h-8 rounded-full mr-3">
        <p class="text-md text-left">{{ textTruncation(infor.content,25) }}</p>
    </div>
    <div class="flex space-x-5">
      <div v-if="isMe" class="flex space-x-3 mt-2">
        <i class="fa fa-pen" @click="$emit('edit-comment')"></i>
        <i class="fa fa-trash" @click="deleteComment"></i>
      </div>
      <Star :stars="infor.rating"/>
    </div>
  </div>
</template>