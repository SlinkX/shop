import { createRouter, createWebHistory } from 'vue-router'
import pinina from '@/pinia/pinia'
import {uInfoStore} from "@/pinia/uinfo.js"

const uInfoData = uInfoStore(pinia)
console.log("路由里面的数据",uInfoData)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{isLogin:true},  
      component: ()=> import("../pages/home.vue")
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue')
    },
    {
      path:'/detail',
      name:'detail',
      component: ()=> import("../pages/goodDetail.vue")
    },
    {
      path: '/carList',
      name:'carList',
      component: () => import("../pages/carList.vue")
    },
    {
      path:'/settlement',
      name:'settlement',
      component: () => import("../pages/settlement.vue")

    },
    {
      path:'orderList',
      name:'orderList',
      compponent: ()=> import("../pages/orderList.vue")
    },
  ]
})

router.beforeEach((to,from,next) => {
console.log("跳转",to,from)
if(to.meta.isLogin){
  //判断登录
  if(JSON.stringify(uInfoData.uInfo)==="{}"){
    next({
      path:"/login",
      query:{
        toUrl: encodeURIComponent(from.fullPath)
      }
    })
  }else {
    next();
  }
}else{
  next()
}
})

export default router
