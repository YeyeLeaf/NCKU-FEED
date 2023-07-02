import { reactive } from 'vue'
class User {
  constructor(){
    this.nickName = "";
    this.selfIntro = "";
    this.profilePhoto = "";
    this.restaurant = [];
    this.preference = [];
  }
}
export const user = reactive(new User); 