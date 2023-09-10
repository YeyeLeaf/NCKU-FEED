import { createRouter, createWebHistory } from 'vue-router';
import Home from '../view/Home.vue';
import MyUserPage from '../view/auth/MyUserPage.vue';
import Login from '../view/Login.vue';
import PersonalEdit from '../view/auth/PersonalEdit.vue';
import OtherUserPage from '../view/OtherUserPage.vue';
import DiaryEditor from '../view/auth/DiaryEditor.vue';
import Diary from '../view/Diary.vue';
import DiaryDisplay from '../view/DiaryDisplay.vue';
import Collect from '../view/auth/Collect.vue';
import Preference from '../view/auth/Preference.vue';

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
    { path: '/diaryDisplay', component: DiaryDisplay },
    { path: '/collect', component: Collect },
    { path: '/preference', component: Preference },
  ],
});
export default router;
