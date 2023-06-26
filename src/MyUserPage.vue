<script setup>
import Footer from './components/Footerr.vue'
import Navbar1 from './components/Navbar1.vue'
import About from './components/About.vue'
import FeedName from './components/FeedName.vue'
import PersonalInfo from './components/PersonalInfo.vue'
</script>

<template>

    <Navbar1 />
    <div class="flex flex-wrap lg:justify-around justify-center">
        <div class="block lg:hidden mt-12">
            <PersonalInfo myImg="src/assets/user_black.png" name="salmon"/>
        </div>

        <div class="flex flex-col lg:w-3/5 m-12 lg:mr-0 lg:ml-0 mb-12 mt-12">
            <About info="測試：Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati qui enim odit magni, non illo nisi sunt autem nobis porro, nulla pariatur nemo asperiores itaque, aperiam natus voluptas a? Consequatur.
    Rem accusamus odio soluta laborum aspernatur, libero perspiciatis, quis sequi, dignissimos omnis asperiores praesentium? Consequuntur culpa voluptas necessitatibus sequi, doloribus tempora dolore mollitia, soluta enim, magni possimus."
            class="mb-8"/>
            <FeedName authorImg="src/assets/user_black.png" name="標題" comment="99" heart="100" class="mt-0"/>
            <FeedName authorImg="src/assets/user_black.png" name="標題" comment="99" heart="100" class="mt-0"/>
            <FeedName authorImg="src/assets/user_black.png" name="標題" comment="99" heart="100" class="mt-0"/>
            <FeedName authorImg="src/assets/user_black.png" name="標題" comment="99" heart="100" class="mt-0"/>
        </div>

        <div class="h-200 hidden lg:block"> 
            <div class="w-0.5 h-full bg-gray-400"></div>
        </div>

        <div class="hidden lg:block mt-16">
            <PersonalInfo myImg="src/assets/user_black.png" name="salmon"/>
        </div>


        <Footer />
    </div>

</template>

<style scoped>
/*hi*/
</style>