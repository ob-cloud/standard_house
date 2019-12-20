import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import { getCookie } from "./commont/js/commonMethods";

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hotelList',
      name: 'hotelList',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/hotelList.vue')
    },
    {
      path: '/hotelDetail',
      name: 'hotelDetail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/hotelDetail.vue')
    },
    {
      path: '/hotelSet',
      name: 'hotelSet',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/hotelSet.vue')
    },
    {
      path: '/roomState',
      name: 'roomState',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/roomState.vue')
    },
    {
      path: '/hotelErrorList',
      name: 'hotelErrorList',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/hotelErrorList.vue')
    },
    {
      path: '/hotelErrordetail',
      name: 'hotelErrordetail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/hotelErrordetail.vue')
    },
    { path: '*', redirect: '/login', hidden: true }
  ]
})
let whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  // 登录，next，未登录判断是否在登录白名单，是跳转，否，登录页
  let tarPath = to.path;
  if(getCookie('access_token')) {
    next();
  } else if(whiteList.indexOf(tarPath) >= 0){
    next();
  }else {
    next({
      path:'/login', 
      //query: {redirect: to.fullPath}
    })
  }
})
export default router;
