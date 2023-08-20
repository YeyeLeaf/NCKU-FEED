<script setup>
$(document).ready(function () {
  $('.list-title').click(function (e) { 
    e.preventDefault();
    $('.toggle-list').slideToggle();
  });
});
// 參考：https://zhuanlan.zhihu.com/p/345055564
import { ref, onMounted, computed, onUpdated } from 'vue';
import RedButton from './RedButton.vue'

const props = defineProps(['List']);

// computed property that auto-updates when the prop changes
const list = computed(() => props.List);
const winner = ref(0); // 指定获奖下标 specified 为 true 时生效
const loading = ref(false); // 抽奖执行状态，防止用户多次点击
let panziElement = ref(null);


onMounted(() => {
  // 通过获取奖品个数，来改变 CSS 样式中每个奖品动画的旋转角度
// var(--nums) 实现 CSS 动画根据奖品个数，动态改变
   let root = document.querySelector(':root');
   root.style.setProperty('--nums', list.value.length);
});
onUpdated(() => {
  let root = document.querySelector(':root');

  root.style.setProperty('--nums', list.value.length);
  let bck = $(".bck-box .bck");
    if(bck.length == 1){
      bck.eq(0).css({transform: `translate(-174px, 174px) rotate(0deg) skew(0deg)`});
    }
    else if(bck.length == 2){
      bck.eq(0).css({transform: `translate(-174px, 0px) rotate(0deg) skew(0deg)`});
      bck.eq(1).css({transform: `translate(-174px, 348px) rotate(0deg) skew(0deg)`});
    }
    else{
      for (let i = 0; i < bck.length; i++) {
        bck.eq(i).css({
          transform: `rotate(${-i * 360 / bck.length}deg) skew(${-90 + 360 / bck.length}deg)`
        });
      }
  }
        })
function animationClass() {
// 对应 CSS 样式中定义的 class 属性值, 如果有更多的话可以继续添加
switch (winner.value) {
  case 0:
    return 'wr0';
  case 1:
    return 'wr1';
  case 2:
    return 'wr2';
  case 3:
    return 'wr3';
  case 4:
    return 'wr4';
  case 5:
    return 'wr5';
  case 6:
    return 'wr6';
  case 7:
    return 'wr7';
  case 8:
    return 'wr8';
  case 9:
    return 'wr9';
}
}

function start() {
if (!loading.value) {
  panziElement.value = document.querySelector('.panzi');
  panziElement.value.classList.remove(animationClass());
  winner.value = random(0, list.value.length - 1);
  winCallback();
  loading.value = true;
}
}

// 中奖返回方法
function winCallback() {
setTimeout(() => {
  /* 此处是为了解决当下次抽中的奖励与这次相同，动画不重新执行的 */
  /* 添加一个定时器，是为了解决动画属性的替换效果，实现动画的重新执行 */
  panziElement.value.classList.add(animationClass());
  panziElement.value.style.animationPlayState = 'running';
}, 0);
// 因为动画时间为 3s ，所以这里3s后获取结果，其实结果早就定下了，只是何时显示，告诉用户
setTimeout(() => {
  loading.value = false;
  alert("選中 "+list.value[winner.value].name+" !");
}, 3000);
}

// 随机一个整数的方法
function random(min, max) {
return parseInt(Math.random() * (max - min + 1) + min);
}

const deleteOp = (index) => {
  props.List.splice(index, 1);
}

</script>
<template>
  <div class="flex m-10 justify-around items-center flex-col lg:flex-row space-y-8">
      <div class="overall">
        <div class="zp-box">
          <div class="panzi">
            <div class="bck-box" :style="` transform: rotate(${-90+180/list.length}deg)`">
              <div
                class="bck"
                v-for="(i,index) in list"
                :key="index"
              ></div>
            </div>
            <div
              class="jiang"
              :style="`transform: rotate(${-index*360/list.length}deg) translateY(-7.5rem);`"
              v-for="(i,index) in list"
              :key="index"
            >
              <span class="Name">{{index}}</span>
            </div>
          </div>
          <div class="start-btn" @click="start()">Spin!</div>
        </div>
      </div>
      <div class="bg-[#eff0f3] lg:w-1/2 p-10 w-full">
        <h2 class="list-title lg:text-2xl text-xl font-bold text-center mb-5 cursor-pointer hover:bg-slate-300 transition-all duration-500">餐廳列表</h2>
        <hr class="border-2 border-[#ff8e3c]">
          <ul class="toggle-list h-72 overflow-y-scroll">
            <li v-for="(item, index) in list" :key="index" class="flex items-center justify-between my-4 z-10">
              <p class="text-lg">{{ index }}</p>
              <p class="text-lg">{{ item.name }}</p>
              <RedButton text="刪除" @click="deleteOp(index)"/>
            </li>
          </ul>
      </div>
  </div>
  </template>
 



<style  scoped>
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
.zp-box {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 23rem;
  height: 23rem;
  /* 抽奖按钮 */
  /* 盘子样式 */
  /* 下面的css样式为每个奖品的旋转动画，这里写了对应8个奖品的动画，如果想要更多的话，可以添加 */
  /* 例如： .wr8  @keyframes play8 */
}

.zp-box .start-btn {
  display: inline-block;
  background: #b80c0c;
  position: relative;
  z-index: 2;
  cursor: pointer;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 30px;
  font-weight: bold;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
}

.zp-box .start-btn::before {
  content: '';
  width: 0;
  height: 0;
  border: 2rem solid transparent;
  border-top: 3rem solid transparent;
  border-bottom: 3rem solid #b80c0c;
  position: absolute;
  top: -5rem;
  z-index: -1;
}

.zp-box .panzi {
  overflow: hidden;
  border-radius: 50%;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 10px solid #b80c0c;
  box-sizing: border-box;
  /* 每个奖项的样式 */
}

.zp-box .panzi .jiang {
  position: absolute;
}

.zp-box .panzi .jiang .Name {
  font-weight: bold;
  font-size: 18px;
  color: #b80c0c;
}

.zp-box .panzi .jiang .img img {
  height: 100%;
}

.zp-box .bck-box {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 50%;
  /* 转盘扇形背景 */
  /* 转盘背景色 */
}

.zp-box .bck-box .bck {
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 1;
  top: -50%;
  left: 50%;
  transform-origin: 0% 100%;
}

.zp-box .bck-box .bck:nth-child(2n) {
  background: #ffe0c9;
}

.zp-box .bck-box .bck:nth-child(2n + 1) {
  background: #ffad71;
}

.zp-box .wr0,
.zp-box .wr1,
.zp-box .wr2,
.zp-box .wr3,
.zp-box .wr4,
.zp-box .wr5,
.zp-box .wr6,
.zp-box .wr7,
.zp-box .wr8,
.zp-box .wr9 {
  animation-duration: 3s;
  animation-timing-function: ease;
  animation-fill-mode: both;
  animation-iteration-count: 1;
}

.zp-box .wr0 {
  animation-name: play0;
}

.zp-box .wr1 {
  animation-name: play1;
}

.zp-box .wr2 {
  animation-name: play2;
}

.zp-box .wr3 {
  animation-name: play3;
}

.zp-box .wr4 {
  animation-name: play4;
}

.zp-box .wr5 {
  animation-name: play5;
}

.zp-box .wr6 {
    animation-name: play6;
}

.zp-box .wr7 {
    animation-name: play7;
}
.zp-box .wr8 {
    animation-name: play8;
}
.zp-box .wr9 {
    animation-name: play9;
}

@keyframes play0 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 0));
  }
}

@keyframes play1 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 1));
  }
}

@keyframes play2 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 2));
  }
}

@keyframes play3 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 3));
  }
}

@keyframes play4 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 4));
  }
}

@keyframes play5 {
  to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 5));
  }
}

@keyframes play6 {
    to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 6));
    }
}

@keyframes play7 {
    to {
    transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 7));
    }
}
@keyframes play8 {
    to {
      transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 8));
    }
}

@keyframes play9 {
    to {
      transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 9));
    }
}
</style>
