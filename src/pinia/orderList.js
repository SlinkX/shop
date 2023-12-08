// 用户信息
import {defineStore } from "pinia"
 
export const orderGoodStore = defineStore("orderGoodStore",{
    state:()=>{
        return{ 
            list:[],
            type:1
        }
    }
})