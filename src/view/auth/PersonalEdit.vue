<script setup>
import RedButton from '../../components/RedButton.vue'
import { user } from '../../class.js'
import { confirmAccess, getJwtFromCookie} from '../../eventBus.js';
import { useRouter } from 'vue-router';

import { storage} from '../../firebase/firebaseConfig';
import { ref, uploadBytes,getDownloadURL } from 'firebase/storage';

confirmAccess();

const router = useRouter();

let imageUpload = null;

const handleFileChange = async (event) => {
  imageUpload = event.target.files[0];
  console.log(imageUpload);
  uploadImageToFirebase();
}

//and get url of the image
const uploadImageToFirebase = async () =>{
  if (imageUpload === null) return;
  const imageRef = ref(storage,'userIcon/'+user.id);
  await uploadBytes(imageRef, imageUpload); // Wait for the upload to finish

  const url = await getDownloadURL(ref(storage, 'userIcon/' + user.id));
  user.profilePhoto = url;

}

const updateUserInfo = async () => {
  const token = getJwtFromCookie();  
  await fetch("http://localhost:5000/user", {
    method: "PUT",
    headers: {
    "Authorization": `Bearer ${token}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "profile_photo": user.profilePhoto,
      "name": user.nickName,
      "self_intro": user.selfIntro
    })
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then((result) => {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  });
  router.push('/myUserPage');
};

</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
      <div class="border flex flex-col w-3/4 py-10 lg:space-y-10 lg:px-12 space-y-6 px-8">
        <div class="flex justify-start items-center space-x-10">
         <img :src="user.profilePhoto" class="lg:w-32 w-24 no-border" style="border-radius: 9999px">
          <div class="flex-col flex items-start justify-center space-y-2">
            <input type="file" @change="handleFileChange"/>
            <h class="text-base text-gray-500 btn-secondary-outline">點擊以更換頭像</h>
          </div>
        </div>
        <div class="flex w-full flex-col space-y-8">
          <div class="flex space-x-16">
            <h>暱稱</h>
            <input type="text" placeholder="blablabla" class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 lg:w-4/5 w-2/3 h-10" v-model="user.nickName">
          </div>
          <div class="flex space-x-8">
            <h>個人簡介</h>
            <textarea placeholder="blablabla" class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 lg:w-4/5 w-2/3 lg:h-40 h-60" v-model="user.selfIntro"></textarea>
          </div>
        </div>
     
      </div>
      <router-link to="/personalEdit"><RedButton text="save" class="w-[10%] flex items-center justify-center mt-3" :onclick="updateUserInfo"/></router-link> 

  </div>
</template>
  
  <style scoped>
  
  /* @import url('../../../paper.css'); */
   
  </style>
  
  
  
  