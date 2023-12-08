import {request} from "@/utils/request.js"
export function loginAPI(data){    
    return request({
        url:"/user/registerAndLogin",
        method:"post",
        data
    })
}
export function getTypesAPI(data){    
    return request({
        url:"/goods/type",
        method:"get",
        data
    })
}
 
export function getBrandAPI(data){    
    return request({
        url:"/goods/brand",
        method:"post",
        data
    })
} 
export function getGoodsAPI(data){    
    return request({
        url:"/goods/list",
        method:"post",
        data
    })
} 
export function getGoodsDetailAPI(data){    
    return request({
        url:"/goods/detail",
        method:"get",
        data
    })
} 
export function updateGoodsCarAPI(data){    
    return request({
        url:"/cart/save",
        method:"post",
        data,
        headers:{
            "Content-type":"application/json"
        }
    })
} 
export function updateGoodsNumCarAPI(data){    
    return request({
        url:"/cart/add",
        method:"post",
        data,
        headers:{
            "Content-type":"application/json"
        }
    })
} 
export function getCarListAPI(data){    
    return request({
        url:"/cart/query",
        method:"get",
        data
    })
} 
export function payOrderAPI(data){    
    return request({
        url:"/order/add",
        method:"post",
        data,
        headers:{
            "Content-type":"application/json"
        }
    })
    }
  
    export function geOrderListAPI(data){    
        return request({
            url:"/order/list",
            method:"get",
            data
        })
    } 