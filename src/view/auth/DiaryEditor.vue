<script setup>
import Editor from '../../components/Editor.vue'
import { confirmAccess } from '../../eventBus.js';

confirmAccess();
$(document).ready(function () {
  $(window).scrollTop(0);
  $('.store-infor').hide();
  $('.navbar, .footer').css('opacity', '1');
  $('body').css('overflow', 'auto');
});
</script>
<template>
  <Editor/>
</template>

