<script setup>
import { ref } from 'vue';
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import RedButton from './RedButton.vue';
import axios from 'axios';

const props = defineProps({
  id: String
});

class PostData {
  constructor() {
    this.content = ref("");
    this.title = ref("");
  }

  submit() {
    axios
      .post('http://localhost:3000/tasks', { //等後端api
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
//https://jsonplaceholder.typicode.com/posts
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
console.log(props.id);
</script>
<template>
  <div>
    <input type="text" v-model="post.title.value" placeholder="請輸入標題..." class="w-full lg:text-3xl text-2xl p-4 focus:outline-none">
    <QuillEditor theme="snow" v-model:content="post.content.value" :options="editorOptions" content-type="html" class="mx-auto my-0 min-h-screen"/>
  </div>
  <router-link to="/diary"><RedButton text="送出" class="w-28 my-3 mx-auto" @click="post.submit" /></router-link>
</template>

<style scoped src="../post.css">
</style>