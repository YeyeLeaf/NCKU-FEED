import { createApp } from 'vue';
import router from './router';
import './style.css';
import App from './App.vue';
import { user } from './class.js';
import { getUidFromCookie, setJwtToCookie, isLogining ,fadeOut ,isLargeScreen} from './eventBus.js';

const app = createApp(App);

router.beforeEach(async(to, from, next) => {
  const uid = getUidFromCookie();
  if (uid) {
    const params = new URLSearchParams();
    params.append('uid', uid);

    await fetch('http://localhost:5000/user?' + params.toString(), {
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((result) => {
        console.log(result);
        // JWT to Cookie
        setJwtToCookie(result.access_token, result.user_info.uid, 7);
        const test = getUidFromCookie();
        console.log('TEST' + test);
        //store user's data
        user.nickName = result.user_info.nick_name;
        user.profilePhoto = result.user_info.profile_photo;
        user.restaurant = result.user_info.restaurant_id;
        user.selfIntro = result.user_info.self_intro;
        user.id = result.user_info.uid;
        user.access_token = result.access_token;
      })
      .catch(function (error) {
        console.log(error);
      });
    isLogining.value = true;
  }
  next();
});
// 螢幕大小改變
window.addEventListener('resize', async () => {
  let screenWidth = document.body.clientWidth;
  if (screenWidth<500){
    isLargeScreen.value = false;
  }
  else{
    isLargeScreen.value = true;
  }
});
// 頁面重整
window.addEventListener('load', function() {
  let screenWidth = document.body.clientWidth;
  if (screenWidth<500){
    isLargeScreen.value = false;
  }
  else{
    isLargeScreen.value = true;
  }
});

window.onload = fadeOut();

app.use(router);
app.mount('#app');


