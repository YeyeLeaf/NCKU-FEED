<script setup>
import storeCard from './components/storeCard.vue'
import Footer from './components/Footerr.vue'
import Navbar1 from './components/Navbar1.vue'
import Navbar2 from './components/Navbar2.vue'
</script>

<template>
  
  <!-- <Navbar1 /> -->
   <Navbar2 />
  <div class="flex justify-around flex-wrap">
    <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE" />
  <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
  <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
  <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
  <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
  <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
  <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
  <storeCard linkImg="src/assets/leaf.png" altImg="leaf" name="YEYEYE"/>
  
  <Footer />
  </div>
</template>
<style scoped>
/*hi*/
</style>
