<script setup>
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const signIn = async () => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const additionalUserInfo = getAdditionalUserInfo(result);
        const isNewUser = additionalUserInfo.isNewUser;
        const user = result.user;
        console.log(JSON.stringify(user));
        // console.log({"uid": user.uid,
        //       "name": user.displayName,
        //       "email": user.email,
        //       "profile_photo": user.photoURL});
        // TODO: send user object to backend api, user's data can be retrieve from user object
        if (isNewUser) {
          // Add to database and go to preference page -> fetch POST api
          axios
            .post('http://localhost:5000/user', { //等後端api
              "uid": user.uid,
              "name": user.displayName,
              "email": user.email,
              "profile_photo": user.photoURL
            })
            .then((response) => {
              console.log(response);
              console.log({"uid": user.uid,
              "name": user.displayName,
              "email": user.email,
              "profile_photo": user.photoURL});
              router.push('/preference');
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
            // fetch login api and get jwt token -> fetch GET api
            try {
              const request = new
              Request("http://localhost:5000/user", {
                method: "POST",
                body: JSON.stringify({
                  "uid": user.uid,
                })
              })
              request.json().then((data) => {
                console.log(data);
              });
              // const response = axios.get('http://localhost:5000/user',{
              //   params: {
              //     "uid": user.uid,
              //   },
              // });
            } catch (error) {
              console.error(error);
            }
            router.push('/');
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // error handling
    });
};
</script>

<template>
  <!-- <div class="bg-custom-background">
      <img src="../assets/background.png" class="absolute top-0 w-full h-full object-cover">
  </div> -->
  <div class="bg-custom-background flex">
      <img src="../assets/login.svg" class="absolute w-full object-cover no-border lg:mt-20 mt-96">
  </div>
  <div class="relative flex justify-center flex-wrap items-center lg:mt-36 lg:mb-36 mt-52 mb-40">
    <div class="flex flex-col justify-center items-center py-10 lg:space-y-10 lg:px-28 space-y-6 px-8">
      <p class="text-black font-sans text-5xl lg:text-6xl font-semibold">CAN'T WAIT TO EAT!</p>
      <button class="bg-white text-gray-700 items-center flex" @click="signIn">
        <div class="flex lg:mx-12 mx-6 space-x-4">
          <img src="../assets/google.png" class="lg:w-8 lg:h-8 w-6 h-6 no-border">
          <h class="text-xl lg:text-2xl">Sign in with Google</h>
        </div>
      </button>
      <h class="text-black font-sans lg:text-lg text-base">解鎖收藏餐廳、評論餐廳、發表食記......等等功能</h>
    </div>
  </div>
</template>

<style scoped>

@import url('../../paper.css');
</style>

