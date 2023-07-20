import { createRouter, createWebHistory } from 'vue-router';
import Home from '../view/Home.vue';
import MyUserPage from '../view/auth/MyUserPage.vue';
import Login from '../view/Login.vue';
import PersonalEdit from '../view/auth/PersonalEdit.vue';
import OtherUserPage from '../view/OtherUserPage.vue';
import DiaryEditor from '../view/auth/DiaryEditor.vue';
import Diary from '../view/Diary.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/myUserPage', component: MyUserPage },
    { path: '/login', component: Login },
    { path: '/personalEdit', component: PersonalEdit },
    { path: '/userPage', component: OtherUserPage },
    { path: '/diaryEditor', component: DiaryEditor },
    { path: '/diary', component: Diary },
  ],
});
export default router;
