<script setup>
import Star from './Star.vue';
import { storage} from '../firebase/firebaseConfig';
import { ref  } from 'vue';
import { user } from '../class.js';
import { textTruncation } from '../eventBus';

const props = defineProps({
    infor: Object,
    nowEdit:String
})

const emit = defineEmits(['delete-comment','edit-comment']);

const img = ref('');
const userName = ref('');
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
      userName.value = result.user_info.nick_name;
                  
  })
  .catch(function (error) {
    console.log(error);
  });
  
}
getUserPic();

const isMe = ref(false); 
if (props.infor.uid == user.id){
  isMe.value = true;
}

const deleteComment = async () => { 
  if (confirm("確定要刪除此評論嗎？")){
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
    }
  
};
</script>
<template>
  <div class="w-full mb-2 shadow-md shadow-slate-300 rounded-md p-4 border-2 border-slate-100">
    <div class="flex flex-col space-y-3">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <img :src="img" class="h-8 rounded-full mr-3">
          <p class="mr-5 font-bold whitespace-nowrap">{{ userName }}</p>
        </div>
        <div class="flex items-center">
          <div v-if="isMe" class="flex mr-5 rightSide">
            <i class="fa fa-pen hover:text-red-500 mr-3 cursor-pointer" :class=" nowEdit==infor._id?'text-red-500':'text-black-100' " @click="$emit('edit-comment')"></i>
            <i class="fa fa-trash hover:text-red-500 cursor-pointer" @click="deleteComment"></i>
          </div>
          <Star :stars="infor.rating"/>
        </div>
      </div>
      <p class="text-md text-left whitespace-wrap break-words">{{ infor.content }}</p>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 500px){
  .rightSide {
     margin-right: 0.3rem;
  }
  .rightSide i{
    font-size: 9px;
    margin-right: 0.5rem;
  }


}

</style>