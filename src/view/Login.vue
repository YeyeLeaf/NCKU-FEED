<script setup>
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const signIn = async () => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const additionalUserInfo = getAdditionalUserInfo(result);
        const isNewUser = additionalUserInfo.isNewUser;
        const user = result.user;
        console.log(JSON.stringify(user))
        // TODO: send user object to backend api, user's data can be retrieve from user object
        if (isNewUser) {
            // Add to database and go to preference page -> fetch POST api
        } else {
            // fetch login api and get jwt token -> fetch GET api
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // error handling
    });
};
</script>

<template>
  <div class="bg-custom-background">
      <img src="../assets/background.png" class="absolute top-0 w-full h-full object-cover">
  </div>
  <div class="relative flex justify-center flex-wrap items-center space-y-52 mt-40 mb-16">
    <div class="bg-[#FF8E3C] rounded-3xl flex flex-col justify-center items-center py-10 lg:space-y-10 lg:px-28 space-y-6 px-8">
      <p class="text-white font-sans text-3xl lg:text-5xl font-semibold">登入</p>
      <h1 class="text-white font-sans lg:text-lg text-base">解鎖收藏餐廳、評論餐廳、發表食記......等等功能</h1>
      <button class="bg-white text-gray-700 p-1 items-center rounded-md border border-gray-500 flex px-4 lg:px-10 py-2" @click="signIn">
        <img src="../assets/google.png" class="w-6 mr-4">
        <h1 class="text-sm lg:text-base">Sign in with Google</h1>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
