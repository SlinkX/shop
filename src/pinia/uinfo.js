//用户信息
import {defineStore} from "pinia"

export const uInfoStore = defineStore("uInfoStore",{
  state: ()=> {
    return{
      uInfo:JSON.parse(localStorage.getItem("uInfo")||"{}")
    }
  }
})