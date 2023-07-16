<script setup>
import { ref } from 'vue';
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import RedButton from './RedButton.vue';
import axios from 'axios';

class PostData {
  constructor() {
    this.content = ref("");
    this.title = ref("");
  }

  submit() {
    axios
      .post('https://jsonplaceholder.typicode.com/posts', { //等後端api
        content: post.content.value,
        title: post.title.value
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const post= new PostData();

const editorOptions = {
  modules: {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'], 
      [{ 'color': [] }, { 'background': [] }], 
      ['clean'] 
    ]
  },
  placeholder: "輸入內容..."
};

</script>
<template>
  <div class="mt-20">
    <input type="text" v-model="post.title.value" placeholder="請輸入標題..." class="w-full text-3xl p-4 focus:outline-none">
    <QuillEditor theme="snow" v-model:content="post.content.value" :options="editorOptions" content-type="html" class="mx-auto my-0 min-h-screen"/>
  </div>
  <RedButton text="送出" class="w-28 my-3 mx-auto" @click="post.submit" />
</template>

<style scoped src="../post.css">
</style>