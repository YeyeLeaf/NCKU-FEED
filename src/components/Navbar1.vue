// 已登入
<script setup>
import { ref } from 'vue';
import { isLogining, changeNavbar,setJwtToCookie, getJwtFromCookie,deleteCookie} from '../eventBus.js';
import RedButton from './RedButton.vue'
import { signOut } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import { useRouter } from 'vue-router';

defineProps({
    myImg: String,
});

const isOpen = ref(false);
const router = useRouter();

const logOut = async () => {
  const token = getJwtFromCookie();  
  await fetch("http://localhost:5000/logout", {
    method: "GET",
    headers: {
    "Authorization": `Bearer ${token}`
    }
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then(() => {
    // delete JWT from Cookie
    deleteCookie(token);
  })
  .catch(function (error) {
    console.log(error);
  });
  router.push('/');
  changeNavbar();
};
</script>

<template>
  <nav class="navbar flex items-center justify-between flex-wrap bg-[#FF8E3C] pt-4 lg:p-0 top-0 inset-x-0 z-10 relative">
    <div class="lg:flex items-center text-white ml-6 pb-4 lg:pb-0">
      <router-link to="/" class="flex items-center">
        <picture class="hidden lg:flex">
          <img src="../assets/nckufeed_white.svg" class="lg:h-20 lg:mx-2 lg:pl-8">
        </picture>
        <span class="font-mono font-black text-3xl tracking-tight">NCKU FEED</span>
      </router-link>
    </div>
    <div class="block lg:hidden mr-6 pb-4 lg:pb-0">
      <button @click="isOpen = !isOpen" class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-300 hover:border-gray-300">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z"/></svg>
      </button>
    </div>

    <!-- lg留著如果之後有需要讓他們排列在navbar就可以用 -->
    <div :class="{'dropdown-after': isOpen}" class=" w-full lg:flex lg:items-center lg:w-auto lg:hidden dropdown">
      <div class="text-base lg:flex-grow bg-[#ffbb8a]">
        <router-link to="/myUserPage" class="block ml-3 p-3 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">
            個人頁面
        </router-link>
        <router-link to="/collect" class=" p-3 block ml-3 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4">收藏清單</router-link>
        <button class="p-3 block ml-3 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4" @click="logOut">登出</button>
      </div>
    </div>

    <div class="hidden lg:flex mx-12 items-center space-x-12 mr-16">
            <router-link to="/collect">
            <picture>
              <img src="../assets/bookmark.png" class="h-6 lg:h-8">
            </picture>
            </router-link>
            <router-link to="/myUserPage">
            <picture>
              <img :src="myImg" class="h-6 lg:h-8 rounded-full">
             </picture>
            </router-link>
            <RedButton text="登出" class="" @click="logOut"/>
    </div>
  </nav>
</template>

<style scoped>

.dropdown {
  margin-top: 0px;
  height: 0px;
  transition: height 0.2s ease;
  overflow: hidden;
}

.dropdown-after {
  height: 144px;
  transition: height 0.2s ease;
}

</style>
