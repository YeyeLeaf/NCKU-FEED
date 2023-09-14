<script setup>
import { ref } from 'vue';
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import RedButton from './RedButton.vue';
import axios from 'axios';
import { user } from '../class.js';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: String,
  resName:String
});

const router = useRouter();
class PostData {
  constructor() {
    this.content = ref("");
    this.title = ref("");
  }

  submit() {
    axios
      .post('http://127.0.0.1:5000/posts', { 
        "uid": user.id,
        "title": post.title.value,
        "content": post.content.value,
        "restaurants_id": props.id
      }, {
        headers: {
          "Authorization": `Bearer ${user.access_token}`,
          'Content-Type': 'application/json', 
        }
      })
      .then((response) => {
        console.log(response);
        router.push('/diary');
      })
      .catch((error) => {
        console.error(error);
        alert("發佈失敗，請再試一次！");
      })
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
    <div class="flex mx-4 mt-3 items-center justify-center">
      <i class="fas fa-seedling text-green-400 lg:text-4xl text-2xl mr-2"></i>
      <p class="lg:text-2xl text-xl">{{ resName }}</p>
    </div>
    <input type="text" v-model="post.title.value" placeholder="請輸入標題..." class="w-full lg:text-3xl text-2xl p-4 focus:outline-none">
    <QuillEditor theme="snow" v-model:content="post.content.value" :options="editorOptions" content-type="html" class="mx-auto my-0 min-h-screen"/>
  </div>
  <RedButton text="送出" class="w-28 my-3 mx-auto" @click="post.submit" />
</template>

<style scoped src="../post.css">
</style>