<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import $ from 'jquery'

const filter = ref(["地區", "時段", "價位區間", "風味", "適合人數", "類型", "聚會類型", "寵物友善"]);
const secondFilter = ref([
    ["東區", "中西區", "北區", "永康區"],
    ["上午", "中午", "下午", "晚上", "凌晨"],
    ["100以內", "100-300", "300-500","500-1000", "1000以上"],
    ["台", "港", "中", "日", "韓", "泰", "美", "法", "義", "東南亞"],
    ["獨行俠" ,"兩個人剛剛好" ,"3-5人", "6-15人", "15人"],
    ["小吃", "甜品", "正餐", "飲品", "冰品", "宵夜"],
    ["朋友聚會", "情侶約會", "家庭親子", "家聚", "慶生"],
    ["寵物友善"]
]);
const secondOp = ref(-1);
const selectedOptions = ref([]);

for (let i = 0; i < secondFilter.value.length; i++) {
    selectedOptions.value.push([]);
}

onMounted(() => {
    $(document).ready(function () {
        $('.filterBtn').click(function (e) { 
            e.preventDefault();
            $('.filter-list').slideToggle();
        });
    });
});

const emit = defineEmits(['add-result', 'delete-result']);
const result = ref([]);
const editFilter = (item, selected, index) => {
    if (selected === true) {
        for(let i = 0; i < result.value.length; i++){
            if(result.value[i] === item){
                result.value.splice(i, 1);
                emit('delete-result', i);
            }
        }
    } else {
        result.value.push(item);
        emit('add-result', item);
    }
}
</script>

<template>
    <div class="max-w-sm m-10 mx-auto">
        <div class="rounded-2xl border border-[#ff8e3c]">
            <form action="">
                <button class="bg-[#ff8e3c] text-white rounded-l-2xl md:px-6 md:py-4 p-2 filterBtn"><i class="fas fa-sliders-h mr-2" style="color: #ffffff;"></i>篩選</button>
                <input type="text" class="pl-4 pr-10" placeholder="搜尋">
                <button type="submit">
                    <i class="fas fa-search" style="color: #d5d5d6;"></i>
                </button>
            </form>
        </div>
        <ul class="filter-list border border-[#525252] text-[#525252] m-2 rounded-b-2xl flex justify-between">
            <div class="p-1 border-r">
                <li v-for="(item, index) in filter" class="rounded-md p-1 hover:font-bold cursor-pointer flex justify-between items-center" :class="{ change : secondOp === index }" @click="secondOp = index"><span class="mx-2">{{ item }}</span><i class="fas fa-chevron-right"></i></li>
            </div>
            <div class="p-1 w-8/12">
                <li v-for="(item, index) in secondFilter[secondOp]" class="rounded-md block p-1 m-0.5 hover:font-bold" :class="{ change : selectedOptions[secondOp][index]}" >
                    <label class="cursor-pointer"><input type="checkbox" v-model="selectedOptions[secondOp][index]" @click="editFilter(item, selectedOptions[secondOp][index], index)" class="mr-2">{{ item }}</label>
                </li>
            </div>
        </ul>
    </div>
</template>

<style scoped>
input:focus {
    outline: none; 
}
input[type=checkbox]{
    cursor: pointer;
    position: relative;
    width: 16px;
    height: 16px;
    font-size: 14px;
}
input[type=checkbox]::after{
    position: absolute;
    top: 0;
    background-color: white;
    color: white;
    width: 16px;
    height: 16px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    content: ' ';
    border-radius: 2px;
    border: 0.1px solid #525252;
}
input[type=checkbox]:checked::after{
    background-color: #ff8e3c;
    font-family: "Font Awesome 5 Free"; 
    font-weight: 900; 
    content: "\f00c";
    font-size: 8px;
    border: none;
}
.change {
    background-color: #ffe0c9;
    font-weight: bold;
}
</style>