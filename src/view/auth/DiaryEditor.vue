<script setup>
import Editor from '../../components/Editor.vue';
import { confirmAccess, cur_restaurant_id } from '../../eventBus.js';
import { useRoute } from 'vue-router';

const route = useRoute(); 
const restaurantId = route.params.restaurant_id;
confirmAccess();
$(document).ready(function () {
  $(window).scrollTop(0);
  $('.store-infor').hide();
  $('.navbar, .footer').css('opacity', '1');
  $('body').css('overflow', 'auto');
});
</script>

<template>
  
  <Editor :id="cur_restaurant_id"/>
</template>

