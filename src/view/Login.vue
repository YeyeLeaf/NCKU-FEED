<script setup>
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { user } from '../class.js'
import { isLogining, changeNavbar, setJwtToCookie, getJwtFromCookie, getUidFromCookie } from '../eventBus.js';

const router = useRouter();


const signIn = async () => {
    const provider = await new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const additionalUserInfo = getAdditionalUserInfo(result);
        const isNewUser = additionalUserInfo.isNewUser;
        console.log(isNewUser);
        const userInfo = result.user;
        //console.log(JSON.stringify(userInfo));
        // TODO: send user object to backend api, user's data can be retrieve from user object
        if (isNewUser) {
          // Add to database and go to preference page -> fetch POST api
          axios
            .post('http://localhost:5000/user', { //等後端api
              "uid": userInfo.uid,
              "name": userInfo.displayName,
              "email": userInfo.email,
              "profile_photo": userInfo.photoURL
            })
            .then((response) => {
              console.log(response.data.access_token);
              // JWT to Cookie
              setJwtToCookie(response.data.access_token, response.data.user_info.uid, 7);
                  const test = getUidFromCookie();
                  console.log("TEST"+test);
                  //store user's data
                  user.nickName = response.data.user_info.nick_name;
                  user.profilePhoto = response.data.user_info.profile_photo;
                  user.restaurant = response.data.user_info.restaurant_id;
                  user.selfIntro = response.data.user_info.self_intro;
                  user.id = response.data.user_info.uid;
                  user.access_token = response.data.access_token;
                  router.push('/preference');
                  changeNavbar();
            })
            .catch((error) => {
              console.error(error);
            });
        }  else {
            // fetch login api and get jwt token -> fetch GET api
            const getUserData = async () => {
              const params = new URLSearchParams();
              params.append("uid", userInfo.uid); 

              await fetch("http://localhost:5000/user?" + params.toString(), {
                method: "GET"
              })
                .then((response) => {
                  if (response.status === 200) {
                    return response.json();
                  }
                })
                .then((result) => {
                  console.log(result);
                  // JWT to Cookie
                  setJwtToCookie(result.access_token, result.user_info.uid, 7);
                  const test = getUidFromCookie();
                  console.log("TEST"+test);
                  //store user's data
                  user.nickName = result.user_info.nick_name;
                  user.profilePhoto = result.user_info.profile_photo;
                  user.restaurant = result.user_info.restaurant_id;
                  user.selfIntro = result.user_info.self_intro;
                  user.id = result.user_info.uid;
                  user.access_token = result.access_token;
                  
                })
                .catch(function (error) {
                  console.log(error);
                });
            };
            (async () => {
              await getUserData();
              changeNavbar();
              router.push('/');
            })();
       }});
};



</script>

<template>
  <div class="home"></div>
  <!-- lg:mt-56 lg:mb-40 mt-52 mb-40 -->
  <div class="relative flex justify-center flex-wrap items-center h-screen">  
    <div class="flex flex-col justify-center items-center lg:space-y-10 lg:px-28 space-y-6 px-8">
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
.home{
  width: 100%;
  min-height: 100vh;
  background: url("../assets/login.svg") center center no-repeat;
  background-size: 100% 100%;
  position: absolute;
}

</style>

