<script setup>
import storeCard from './components/storeCard.vue'
import Footer from './components/Footerr.vue'
import Navbar1 from './components/Navbar1.vue'
import Navbar2 from './components/Navbar2.vue'
import wheel from './components/wheel.vue'
</script>

<template>
  
  <!-- <Navbar1 /> -->
   <Navbar2 />
   <wheel />
  <div class="flex justify-center flex-wrap bg-[#eff0f3] p-5 m-10 rounded-3xl ">
    <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
    <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
    <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
    <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
    <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
    <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
    <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
    <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
  </div>
  <Footer />
</template>

<style scoped>
/*hi*/
</style>
