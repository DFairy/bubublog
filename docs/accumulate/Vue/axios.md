# axios
以下记载几个知识点


## post提交数据方式Content-Type
1. multipart/form-data:图片上传，文件上传
```js
let formData=new FormData()
for(let key in data){
    formData.append(key,data[key])
}
```
2. application/json：作为请求头告诉服务端消息主体是序列化的JSON字符串

## 并发请求axios.all() 
```js
 //并发请求
axios.all(
    [
        axios.get('http://127.0.0.1:5050',{params:{type:'a'}}),
        axios.get('http://127.0.0.1:5050',{params:{type:'b'}})
    ]
).then(
    axios.spread( (res1,res2) => {
        console.log(res1.data,res2.data)    
    })
)
```

## 请求配置(优先级从低到高)
1. 全局配置
```js
axios.defaults.baseURL=baseUrl
axios.defaults.timeout=5000
```

2. 实例配置
```js
let instance=axios.create()
instance.defaults.baseURL=baseUrl
```

3. 请求配置
```js
instance.get('/data.json',{
    timeout:5000
})
```

## 拦截器

1. 请求拦截器
```js
axios.interceptors.request.use(config=>{
    //在发送请求前做些什么
    return config
},err=>{
    //请求错误返回
    return Promise.reject(err)
})
```

2. 响应拦截器
```js
axios.interceptors.response.use(res=>{
    //请求成功对响应数据作出处理
    return res
},err=>{
    //响应错误
    return Promise.reject(err)
})
```

3. 例子
```js
//需要登录的接口
let instance=axios.create({})
instance.interceptors.request.use(config=>{
    config.headers.token=''
    return config
},err=>{
    //请求错误返回
    return Promise.reject(err)
})

//不需要登录的接口
let newInstance=axios.create({})
```

## 封装axiso
目录格式
```
--api
    --api.js
    --baseUrl.js
    --http.js
```
### api.js
```js
const API={
    //登录接口
    login:{
        method:'post',
        url:'/login.do'
    },
    ...
}
export default API
```
### baseUrl.js
```js
let baseUrl= "";   //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = ""
        break
    case 'production':
        baseUrl = ""   //生产环境url
        break
}
export default baseUrl;
```

### http.js
```js
import baseUrl from './baseUrl' 
import axios from 'axios'
import service from './api'
import router from '../../router';
import {ToastShow} from '../js/common' //显示toast方法

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',        
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}


/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
 const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            ToastShow('登录过期，请重新登录','error');
            // localStorage.removeItem('token');
            // store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        // 404请求不存在
        case 404:
            ToastShow('请求的资源不存在(404)','error'); 
            break;
        case 408:
            ToastShow('请求超时(408)','error'); 
            break;
        case 500:
            ToastShow('服务器错误(500)','error'); 
            break
        case 501:
            ToastShow('服务未实现(501)','error'); 
            break
        case 502:
            ToastShow('网络错误(502)','error'); 
            break
        case 503:
            ToastShow('服务不可用(503)','error'); 
            break
        case 504:
            ToastShow('网络超时(504)','error'); 
            break
        case 505:
            ToastShow('HTTP版本不受支持(505)','error'); 
            break
        default:
            ToastShow(`连接出错(${status})!`,'error');    
    }
 }

//创建实例
let instance=axios.create({
    baseURL:baseUrl,
    timeout:5000,//超时
    headers:{ //请求头
        token:''
    },
    params:{},//请求参数拼接在utl上
    data:{},//请求参数放在请求体
})

const Http={} //包裹请求方法的容器



//请求参数的统一
for(let key in service){
  
    let api=service[key]
    Http[key] = async function(
        params,//请求参数
        isFormData=false,//标识是否是form-data请求
        config={}//配置参数
    ){
       let newParams={}
       //content-type是否是form-data的判断
       if(params && isFormData){
           newParams=new FormData()
           for(let i in params){
               newParams.append(i,params[i])
           }
       }else{
           newParams=params
       }
       //不同请求的判断
       let response={}//请求的返回值
       if(api.method==='post'){
           try{
            response=await instance[api.method](api.url,newParams,config)
           }catch(err){
            response=err
           }
       }else if(api.method==='get'){
           config.params=newParams
           try{
               response=await instance[api.method](api.url,config)
           }catch(err){
               response=err
           }
       }
       return response
    }
}
//请求拦截器
instance.interceptors.request.use(config=>{
    //在发送请求前做些什么
    return config
},err=>{
    //请求错误返回
    ToastShow('请求错误，请稍后重试','error')
    return Promise.reject(err)
})


//响应拦截器
instance.interceptors.response.use(res=>{
    //请求成功对响应数据作出处理
    return res.data
},err=>{
    //响应错误
    const {response} =err
    if(response){
         // 请求已发出，但是不在2xx的范围 
         errorHandle(response.status, response.data.message);
         return Promise.reject(response);
    }else{
        // 处理断网的情况
        ToastShow('请求错误，请稍后重试','error')
        return Promise.reject(err);
       
    }
    
})

export default Http
```
### 调用
```js
//main.js
import Http from './http'
Vue.prototype.$Http = Http;
```
```js
async login(){
    let res=await this.$Http.login({},true)//post
    let res=await this.$Http.login({})//get
}
```
