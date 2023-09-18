<script setup>
import { ref, onUpdated } from 'vue';
import FeedName_sm from './FeedName_sm.vue';
import Comment  from './Comment.vue';
import { user } from '../class.js';
import { isLogining, cur_post ,isLargeScreen ,cur_restaurant} from '../eventBus';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  infor: Object
});


$(document).ready(function () {
  $('.close').click(function (e) { 
    e.preventDefault();
    $('.store-infor').hide();
    $('.store-infor').siblings().css('opacity', '1');
    $('body').css('overflow', 'auto');
  });
  cur_restaurant.value = props.infor;
});

const tab = ['評論', '食記'];
const num = ref(0);

//手機的排版
const toptab = ['餐廳資訊', '評論','食記'];
const topnum = ref(0);

//營業時間
const timeIsOpen = ref(false);

const Switch = (index) => {
        num.value = index;
        let panziElement = ref(null);
        panziElement.value = document.querySelector('.panzi');
        panziElement.value.style.animationPlayState = 'paused'; 
    }

    const Switch2 = (index) => {
        topnum.value = index;
        let panziElement = ref(null);
        panziElement.value = document.querySelector('.panzi');
        panziElement.value.style.animationPlayState = 'paused'; 
    }
////////////////////////////////////// Collect ///////////////////////////////////////////////////
const isCollected = ref(false);
const alreadyCollect = () => {
    if(user.restaurant.includes(props.infor._id)){
      console.log("HI");
      isCollected.value = true;
      console.log(isCollected.value);
    }
}
alreadyCollect();

const addCollect = async () => {
  await fetch("http://localhost:5000/user", {
    method: "PUT",
    headers: {
    "Authorization": `Bearer ${user.access_token}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "restaurant_id": props.infor._id
    })
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then((result) => {
    console.log(result);
    user.restaurant = result.restaurants_id;
  })
  .catch(function (error) {
    console.log(error);
  });
};

const delCollect = async () => {
  await fetch("http://localhost:5000/user", {
    method: "DELETE",
    headers: {
    "Authorization": `Bearer ${user.access_token}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "restaurant_id": props.infor._id
    })
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then((result) => {
    console.log(result);
    user.restaurant = result.restaurants_id;
  })
  .catch(function (error) {
    console.log(error);
  });
};

const collect = () => {
    if(!isLogining.value) alert("登入以使用收藏功能");
    else{
      if(user.restaurant.includes(props.infor._id)){
            delCollect();
            isCollected.value = false;
        }
      else{
            addCollect();
            isCollected.value = true;
      }
    }
}

////////////////////////////////////// Commemts ///////////////////////////////////////////////////
const commentList = ref([]);
const rating = ["環境整潔", "服務態度", "美味程度", "CP值"];
const isShow = ref(false);
const btnToggle = (event) => {
  event.preventDefault(); 
  isShow.value = !isShow.value;
}
const rated_number = ref([0.0,0.0,0.0,0.0]);
const tempScore = ref([0.0,0.0,0.0,0.0]);
const editCommentId = ref('');
const curr_edit = ref({});
const calculateAve = () =>{
  let sum =0.0;
  for (let i=0;i<4;i++){
    sum+=rated_number.value[i];
  }
  const average = sum / 4.0;
  rated_number.value.push(average);
}
const commentStr = ref('');
const isEditing = ref(false);

const getComment = async () => {
  if (!props.infor._id){
    return
  }
  await fetch("http://localhost:5000/comments?target_id="+props.infor._id, {
    method: "GET",
    headers: {
    "Authorization": `Bearer ${user.access_token}`,
    'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .then((result) => {
    //console.log(result);
    commentList.value = commentList.value.concat(result.comments);
  })
  .catch(function (error) {
    console.log(error);
  });
};

getComment();
const addComment = async (event) => {
  event.preventDefault(); 
  if(!isLogining.value){
    alert("登入以使用留言功能");
    return;
  } 
  if (commentStr.value == ''){
    alert("請為餐廳留下評論喔！");
    return
  }
  if (rated_number.value[0]==0 && rated_number.value[1]==0 && rated_number.value[2]==0 && rated_number.value[3]==0){
    alert("請為餐廳評分喔！");
    return
  }
  calculateAve();
  await fetch("http://localhost:5000/comments", {
    method: "POST",
    headers: {
    "Authorization": `Bearer ${user.access_token}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "target_id": props.infor._id,
        "content":commentStr.value,
        "rating":rated_number.value
    })
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  rated_number.value=[0,0,0,0];
  tempScore.value=[0,0,0,0];
  commentStr.value='';
  commentList.value.splice(0, commentList.value.length);
  getComment();
};

const deleteComment = () =>{
  commentList.value.splice(0, commentList.value.length);
  getComment();
  refresh();
}

const preEditCommentSetting = (item) =>{
  if (isEditing.value && curr_edit.value === item){
    isEditing.value = !isEditing.value;
    editCommentId.value = '';
    curr_edit.value=null;
    commentStr.value = "";
    tempScore.value = [0,0,0,0];
    rated_number.value = [0,0,0,0];
  }
  else{
    if(!isEditing.value  && curr_edit.value !== item){
      isEditing.value = !isEditing.value;
    }
    curr_edit.value = item;
    editCommentId.value = item._id;
    commentStr.value = item.content;
    tempScore.value = [item.rating.cleanliness,item.rating.service,item.rating.deliciousness,item.rating.CPR];
    rated_number.value = [item.rating.cleanliness,item.rating.service,item.rating.deliciousness,item.rating.CPR]; 

  }
}

const editComment = async (event) =>{
  event.preventDefault(); 
  if (commentStr.value == ''){
    alert("請為餐廳留下評論喔！");
    return
  }
  if (rated_number.value[0]==0 && rated_number.value[1]==0 && rated_number.value[2]==0 && rated_number.value[3]==0){
    alert("請為餐廳評分喔！");
    return
  }
  calculateAve();
  await fetch("http://localhost:5000/comments", {
    method: "PUT",
    headers: {
    "Authorization": `Bearer ${user.access_token}`,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "id": editCommentId.value,
        "content":commentStr.value,
    })
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  refresh();
  commentList.value.splice(0, commentList.value.length);
  getComment();

}

////////////////////////////////////// Posts ///////////////////////////////////////////////////
const postList = ref([]);
const getPost = async () => {
  await fetch("http://127.0.0.1:5000/posts/restaurant?restaurant_id="+ props.infor._id, {
          method: "GET",
    })
    
    .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
    })
    .then((result) => {
      console.log(result);
      let temp = result;
      postList.value = temp;
    })
    .catch(function (error) {
      console.log(error);
    });
}
getPost();

const openFeed = (item) => {
    cur_post.value = item;
    $(window).scrollTop(0);
    $('.store-infor').hide();
    $('.navbar, .footer').css('opacity', '1');
    $('body').css('overflow', 'auto');
    router.push('/diaryDisplay');
}

const showAlert = () =>{
  if(!isLogining.value){
    alert("登入以使用貼文功能");
    return;
  } 
}

////////////////////////////////////// Close tab refresh ////////////////////////////////////////////
//重設變數等
const refresh = () =>{
  rated_number.value=[0,0,0,0];
  tempScore.value=[0,0,0,0];
  commentStr.value='';
  isEditing.value = false;
  editCommentId.value = ''; 
}

</script>
<template>
  <div class="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex z-10 rounded-2xl box-border border storePage border-gray-300">
    <div v-if="isLargeScreen" class="lgStorePage flex justify-between">
      <div class="p-1 leftSide flex items-center">
          <img :src="infor.photos" class="rounded-2xl mb-2 w-full h-full">
        <div class="resInfo">
          <div class="flex justify-between items-center mt-2">
            <h2 class="text-xl">{{ infor.name }}</h2>
            <button class="whitespace-nowrap bg-[#ff8e3c] text-white rounded-2xl py-1 px-2">{{ infor.star }}&nbsp;<i class="fas fa-star"></i></button>
          </div>
          <div class="flex overflow-x-scroll my-2">
              <button v-for="(tag, index) in infor.tags" :key="index" class="bg-[#ffe0c9] rounded-full border border-[#ff8e3c] px-2 lg:py-1 py-0.5 mr-2 whitespace-nowrap"># {{ tag }}</button>
          </div>
          <ul>
            <li class="mb-2">
              <div class="relative">
                <div class="flex items-center"> 
                <i class="fas fa-clock w-4 break-all" style="color: #525252;"></i>&nbsp;
                <p @click="timeIsOpen = !timeIsOpen" class="hover:underline cursor-pointer">營業時間</p>   
                </div>
                <div v-if="timeIsOpen" class="absolute detail bg-white border-2 border-gray-300 p-4 w-60 left-1 z-20 time">
                    <span>
                        <ul v-if="timeIsOpen"><li v-for="(time, index) in infor.open_hour" :key="index" class="text-[13px] mt-1">{{ time }}</li></ul>
                    </span>
                </div>
              </div>
            </li>
          </ul>
          <a :href="infor.gmap_url" target="_blank" class="my-2 cursor-pointer hover:underline break-all"><i class="fas fa-map-marker-alt w-4" style="color: #525252;"></i>&nbsp;{{ infor.address }}</a>
          <p class="my-2"><i class="fas fa-phone-alt w-4 break-all" style="color: #525252;"></i>&nbsp;{{ infor.phone_number }}</p>
          <p><i class="fas fa-link w-4" style="color: #525252;"></i>&nbsp;網站連結：<a :href="infor.website" target="_blank" class="mt-2 cursor-pointer hover:underline break-all">{{ infor.website }}</a></p>
        </div>
      </div>
      <div class="p-1 rightSide">
        <div class="flex justify-between items-center h-10 mb-1">
          <div>
            <a v-for="(value, index) in tab" :key="index" @click.prevent="Switch(index)" :class="{ change: index === num }" class="cursor-pointer py-2 font-bold text-[#9c9c9c] mr-2">{{ value }}</a>
          </div>
          <div class="redButton">
            <button class="bg-[#b80c0c] text-white rounded-md w-24 p-1 mr-1 hover:bg-[#ed0000] text-[15px]" @click="$emit('addOp')">加入轉盤&nbsp;<i class="fas fa-plus-circle" style="color: #ffffff;"></i></button>
            <button v-if="isCollected === false" class="bg-[#b80c0c] text-white rounded-md w-24 p-1 hover:bg-[#ed0000] text-[15px]" @click="collect">收藏&nbsp;<i class="fas fa-bookmark"></i></button>
            <button v-if="isCollected === true" class="bg-[#b80c0c] text-white rounded-md w-24 p-1 hover:bg-[#ed0000] text-[15px]" @click="collect">取消收藏&nbsp;<i class="fas fa-bookmark"></i></button>
          </div>
        </div>
        <div class="border-y-2 mb-1 border-[#FF8E3C]"></div>
        <div class="box-border">
          <div v-show="num===0" class="max-h-full">
            <form action="" class="flex z-10 align-top p-4 justify-between mb-2">
              <div class="flex">
                <div class="space-y-2">
                  <img :src="user.profilePhoto" class="h-8 rounded-full mr-3">
                  <p v-if="isEditing" class="text-sm text-red-500">編輯</p>
                </div>
                <textarea name="comment" cols="30" rows="5" maxlength="150" class="border border-gray-300 rounded p-2 resize-none outline-none h-16 w-full" placeholder="撰寫評論...（上限150字）" v-model="commentStr"></textarea>
              </div>
              <div class="ml-4 relative">
                <button class="rounded-md bg-[#ff8e3c] text-white p-1 mb-1 w-full hover:bg-orange-600 whitespace-nowrap text-[15px]" @click="btnToggle">評分選項</button>
                <div v-if="isShow" class="absolute detail bg-white border-2 border-[#ff8e3c] p-4 w-56 right-1 z-10">
                    <p v-for="(item, index) in rating" :key="index" class="text-black flex justify-between items-center">
                      <span class="w-6/12">{{ item }}</span>
                      <span>
                        <i
                          v-for="n in 5" :key="n" class="far fa-star text-[#ff8e3c]" :class=" n<=tempScore[index]?'fas fa-star':'far fa-star' "
                          @mouseenter="tempScore[index]=n"
                          @mouseleave="tempScore[index]=rated_number[index]"
                          @click="rated_number[index]=n"
                        ></i>
                      </span>
                    </p>
                  </div>
                <button v-if="isEditing==false" class="rounded-md bg-[#b80c0c] text-white p-1 w-full hover:bg-[#ed0000] text-[15px]" @click="addComment">送出</button>
                <button v-if="isEditing==true" class="rounded-md bg-[#b80c0c] text-white p-1 w-full hover:bg-[#ed0000] text-[15px]" @click="editComment">完編</button>
              </div>
            </form>
            <div v-if="commentList.length==0">尚無評論</div>
            <Comment v-for="(item, index) in commentList" :key="index" :infor="item" :nowEdit="editCommentId" @delete-comment="deleteComment" @edit-comment="preEditCommentSetting(item)"/>
          </div>
          <div v-show="num===1" class="max-h-full">
            <div class="flex pl-4 pr-8 py-3 justify-between items-center">
              <img :src="user.profilePhoto" class="h-8 rounded-full">
              <button v-if="isLogining==false" class="rounded-md bg-[#b80c0c] text-white py-1 px-2 hover:bg-[#ed0000]" @click="showAlert">撰寫食記</button>
              <router-link to="/diaryEditor" v-if="isLogining==true" class="rounded-md bg-[#b80c0c] text-white py-1 px-2 hover:bg-[#ed0000]">撰寫食記</router-link>
              <div class="flex p-4 h-10">
                <textarea  class="outline-none opacity-0" ></textarea>
              </div>
            </div>
            <div class='mt-2' v-if="postList == null">尚無食記</div>
            <div class="mt-2" v-if="postList != null">
              <FeedName_sm v-for="(item, index) in postList" :key="index" :infor="item" class="mt-0" @click="openFeed(item)"/>
            </div>
          </div>
        </div>
      </div>
  </div>

  <div v-if='!isLargeScreen' class="smStorePage ">
    <div class="flex justify-between flex-col items-center mb-2 space-y-2 ">
        <div>
            <a v-for="(value, index) in toptab" :key="index" @click.prevent="Switch2(index)" :class="{ change: index === topnum }" class="cursor-pointer py-2 font-bold text-[#9c9c9c] mr-2 text-sm">{{ value }}</a>
        </div>
        <div class="redButton">
            <button class="bg-[#b80c0c] text-white rounded-md w-24 p-1 mr-1 hover:bg-[#ed0000] text-[15px]" @click="$emit('addOp')">加入轉盤&nbsp;<i class="fas fa-plus-circle" style="color: #ffffff;"></i></button>
            <button v-if="isCollected === false" class="bg-[#b80c0c] text-white rounded-md w-24 p-1 hover:bg-[#ed0000] text-[15px]" @click="collect">收藏&nbsp;<i class="fas fa-bookmark"></i></button>
            <button v-if="isCollected === true" class="bg-[#b80c0c] text-white rounded-md w-24 p-1 hover:bg-[#ed0000] text-[15px]" @click="collect">取消收藏&nbsp;<i class="fas fa-bookmark"></i></button>
        </div>
    </div>
    <div v-show="topnum===0" class="max-h-full">
        <div class="p-1 flex items-center flex-col">
          <div class="overflow-hidden w-full">
            <img :src="infor.photos" class="rounded-2xl mb-2 w-[300px] h-[220px]">
          </div>
            
            <div class="resInfo">
                <div class="flex justify-between items-center mt-2">
                    <h2 class="text-xl">{{ infor.name }}</h2>
                    <button class="whitespace-nowrap bg-[#ff8e3c] text-white rounded-2xl py-1 px-2">{{ infor.star }}&nbsp;<i class="fas fa-star"></i></button>
                </div>
                <div class="flex overflow-x-scroll my-2">
                    <button v-for="(tag, index) in infor.tags" :key="index" class="bg-[#ffe0c9] rounded-full border border-[#ff8e3c] px-2 lg:py-1 py-0.5 mr-2 whitespace-nowrap"># {{ tag }}</button>
                </div>
                <ul>
                    <li class="mb-2">
                      <div class="relative">
                        <div class="flex items-center"> 
                        <i class="fas fa-clock w-4 break-all" style="color: #525252;"></i>&nbsp;
                        <p @click="timeIsOpen = !timeIsOpen" class="hover:underline cursor-pointer">營業時間</p>   
                        </div>
                        <div v-if="timeIsOpen" class="absolute detail bg-white border-2 border-gray-300 p-4 w-60 left-1 z-20 time">
                            <span>
                                <ul v-if="timeIsOpen"><li v-for="(time, index) in infor.open_hour" :key="index" class="text-[13px]">{{ time }}</li></ul>
                            </span>
                        </div>
                      </div>
                    </li>
                </ul>
                <a :href="infor.gmap_url" target="_blank" class="my-2 cursor-pointer hover:underline break-all"><i class="fas fa-map-marker-alt w-4" style="color: #525252;"></i>&nbsp;{{ infor.address }}</a>
                <p class="my-2"><i class="fas fa-phone-alt w-4 break-all" style="color: #525252;"></i>&nbsp;{{ infor.phone_number }}</p>
                <p><i class="fas fa-link w-4" style="color: #525252;"></i>&nbsp;網站連結：<a :href="infor.website" target="_blank" class="mt-2 cursor-pointer hover:underline break-all">{{ infor.website }}</a></p>
            </div>
        </div>

    </div>

          <div v-show="topnum===1" class="max-h-full">
            <form action="" class="flex z-10 align-top p-4 justify-between mb-2">
              <div class="flex">
                <div class="space-y-2">
                  <img :src="user.profilePhoto" class="h-8 rounded-full mr-3">
                  <p v-if="isEditing" class="text-sm text-red-500">編輯中</p>
                </div>
                <textarea name="comment" cols="30" rows="5" maxlength="150" class="border border-gray-300 rounded p-2 resize-none outline-none h-16 w-full" placeholder="撰寫評論...（上限150字）" v-model="commentStr"></textarea>
              </div>
              <div class="ml-4">
                <button class="rounded-md bg-[#ff8e3c] text-white p-1 mb-1 w-full hover:bg-orange-600 whitespace-nowrap text-[15px]" @click="btnToggle">評分選項</button>
                <div v-if="isShow" class="absolute detail bg-white border-2 border-[#ff8e3c] p-4 w-56 right-10 z-10">
                    <p v-for="(item, index) in rating" :key="index" class="text-black flex justify-between items-center">
                      <span class="w-6/12">{{ item }}</span>
                      <span>
                        <i
                          v-for="n in 5" :key="n" class="far fa-star text-[#ff8e3c]" :class=" n<=tempScore[index]?'fas fa-star':'far fa-star' "
                          @mouseenter="tempScore[index]=n"
                          @mouseleave="tempScore[index]=rated_number[index]"
                          @click="rated_number[index]=n"
                        ></i>
                      </span>
                    </p>
                  </div>
                <button v-if="isEditing==false" class="rounded-md bg-[#b80c0c] text-white p-1 w-full hover:bg-[#ed0000] text-[15px]" @click="addComment">送出</button>
                <button v-if="isEditing==true" class="rounded-md bg-[#b80c0c] text-white p-1 w-full hover:bg-[#ed0000] text-[15px]" @click="editComment">完編</button>
              </div>
            </form>
            <div v-if="commentList.length==0">尚無評論</div>
            <Comment v-for="(item, index) in commentList" :key="index" :infor="item" :nowEdit="editCommentId" @delete-comment="deleteComment" @edit-comment="preEditCommentSetting(item)"/>
          </div>

          <div v-show="topnum===2" class="max-h-full">
            <div class="flex p-4 items-center">
              <img :src="user.profilePhoto" class="h-8 rounded-full mr-3">
              <router-link to="/diaryEditor" class="rounded-md bg-[#b80c0c] text-white py-1 px-2 hover:bg-[#ed0000]">撰寫食記</router-link>
            </div>
            <div class='mt-2' v-if="postList == null">尚無食記</div>
            <div class="mt-2" v-if="postList != null">
              <FeedName_sm v-for="(item, index) in postList" :key="index" :infor="item" class="mt-0" @click="openFeed(item)"/>
            </div>
          </div>

    </div>
    <span class="absolute top-1 right-3 close cursor-pointer text-lg" @click="refresh">x</span>

  </div>

    


</template>

<style scoped>
.change {
  color: #525252;
}
::-webkit-scrollbar {
  width: 11px;
  height: 11px;
  border-radius: 10px;
}
::-webkit-scrollbar:hover {
  background-color: #ececec;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #9c9c9c;
  border: 2px solid transparent;
  background-clip: padding-box;
}

/* 電腦 */
@media only screen and (max-width: 1500px) {
  .storePage{
    width: 63%;
    height: 80%;
    padding: 2rem;
  }
  .lgStorePage{
    flex-direction: row;
    overflow: auto;
  }
  .lgStorePage .leftSide{
    width: 42%;
    flex-direction: column;
  }
  .lgStorePage .resInfo{
    width: 100%;
    overflow-y: scroll;
  }
  .lgStorePage .leftSide img{
    width: 100%;
    height: 50%;
    object-fit: cover;
  }
  .lgStorePage .rightSide{
    width: 56%;
    overflow-y: scroll;
  }
  
}

/* 橫式平板 */
@media only screen and (max-width: 1050px) {
  .storePage{
    width: 75%;
    height: 75%;
  }
  .lgStorePage{
    flex-direction: column;
    overflow:auto;
  }
  .lgStorePage .leftSide{
    width: 100%;
    height: 70%;
    flex-direction: row;
  }
  .lgStorePage .resInfo{
    width: 55%;
    height: 100%;
  }

  .lgStorePage .leftSide img{
    width: 45%;
    height: 100%;
    object-fit: cover;
    margin-right: 3%;
  }
  .lgStorePage .rightSide{
    width: 100%;
    height: 100%;
    overflow-y: visible;
  }
}


/* 手機 */ /* 直式平板 */
@media only screen and (max-width: 800px) {
  .storePage{
    width: 80%;
    height: 80%;
    padding: 2rem;
    font-size: 15px;
  }
  .lgStorePage{
    flex-direction: column;
  }
  .lgStorePage .leftSide{
    width: 100%;
    height: 100%;
    flex-direction:column;
  }
  .lgStorePage .leftSide img{
    width: 100%;
    height: 50%;
    object-fit: cover;
    margin-right: 0%;
  }
  .lgStorePage .resInfo{
    width: 100%;
    height: 100%;
    overflow-y: visible;
  }
  .lgStorePage button{
    font-size: 14px;
  }

  .lgStorePage .rightSide{
    height: 100%;
  }
  .lgStorePage .time{
    width: 290px;
    left: 10px;

  }
}

/* 手機 */
@media only screen and (max-width: 500px){

  .storePage{
    width:80%;
    height: 75%;
    flex-direction: column;
    padding: 2rem;
    overflow-y: scroll;
    font-size: 10px;
  }
  .smStorePage .resInfo img{
    object-fit: cover;
  }
  .smStorePage .resInfo{
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .smStorePage h2{
    font-size:large;
  }
  .smStorePage button{
    font-size: 13px;
  }
  .smStorePage button i{
    display: none;
  }
  .smStorePage .redButton button{
    width:4rem;
  }
  .smStorePage .time {
    padding: 10px;
    left: 5%;
    width: 230px;
  }
  .smStorePage .time li{
    font-size: 8px;
    transform: scale(0.9);
  }
}

</style>