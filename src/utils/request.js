import axios from "axios"
import configData from "@/config/index"
const {baseURL}=configData
import { ElMessage } from 'element-plus'
const instance = axios.create({
    baseURL,
    timeout:60000,
    headers:{
        shop:"e+",
        "Content-Type":"application/x-www-form-urlencoded",
        "Accept":"application/json",
    },
})
// 请求拦截
instance.interceptors.request.use((config)=>{ 
    const  uInfo =JSON.parse(localStorage.getItem("uInfo")||"{}")  
    if(uInfo.id){
        config.headers={
            ...config.headers,
            token:uInfo.id
        }
    return config
    }
    return config
},err=>{
    return Promise.reject(err)
})
// 响应拦截 
instance.interceptors.response.use((response)=>{ 
    console.log("response",response)
    if(response?.data?.code!==200){
        // 展示toast
        ElMessage({
            message: response?.data?.message||"服务报错",
            type: 'warning',
          })
    }
    return response.data
},err=>{ 
    ElMessage({
        message: "服务忙碌，稍后再试",
        type: 'warning',
      })
    return Promise.reject(err)
})
/**
 * 
 * @param {*} options {
 * url:"",
 * method
 * data 
 * headers
 * }
 */
export function request(options){
    const {method} =options
    const optionTrans = {...options}
        if(method.toUpperCase()==="GET"){
            optionTrans.params = options.data
            delete optionTrans.data 
        }
    return instance(optionTrans)
}