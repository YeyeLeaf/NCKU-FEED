import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Login from './Login.vue'
import PersonalEdit from './PersonalEdit.vue'
import MyUserPage from './MyUserPage.vue'
import OtherUserPage from './OtherUserPage.vue'
import { user } from './class.js'


createApp(App).mount('#app')
createApp(Login).mount('#login')
createApp(PersonalEdit).mount('#personalEdit')
createApp(MyUserPage).mount('#myUserPage')
createApp(OtherUserPage).mount('#otherUserPage')

