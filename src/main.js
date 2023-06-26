import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Login from './Login.vue'
import PersonalEdit from './PersonalEdit.vue'


createApp(App).mount('#app')
createApp(Login).mount('#login')
createApp(PersonalEdit).mount('#personalEdit')

