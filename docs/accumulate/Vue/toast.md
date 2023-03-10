# 路由切换效果

通过vue+vue-router+transition来实现的效果，比较简单粗暴

## vue-router配置
我是根据index来配置是前进还是后退
```js
import Vue from 'vue'
import Router from 'vue-router'
const Choose = () =>import ('./views/choose.vue')
const Login = () =>import ('./views/login.vue')
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'choose',
            component: Choose,
            meta: { index: 1 }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: { index: 2 }
        }
    ]
})
```

## App.vue配置
```js
<template>
  <div id="app">
    <transition :name="transitionName">
       <router-view />
    </transition>   
  </div>
</template>

<script>
export default {
  data(){
    return{
      transitionName:''
    }
  },
  watch: {
    $route(to, from) {
      if(to.meta.index < from.meta.index) {
        this.transitionName = "slide-right"
      } else {
        this.transitionName = "slide-left"
      }
    }
}
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms ease;
    position: absolute;
  }
  .slide-left-enter, .slide-right-leave-active {
    transform: translate(100%, 0); 
  } 
 .slide-left-leave-active, .slide-right-enter { 
     transform: translate(-100%, 0); 
 } 
}
</style>
```
