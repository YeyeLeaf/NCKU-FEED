import { reactive } from 'vue'
class User {
  constructor(){
    this.nickName = "";
    this.selfIntro = "";
    this.profilePhoto = "";
    this.restaurant = [];
    this.preference = [];
    this.isPrefer = false;
  }
}
export const user = reactive(new User); 