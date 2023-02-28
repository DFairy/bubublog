# vue3使用i18n

1. 安装依赖
```js
npm install vue-i18n --save-dev
```

2. 新建文件夹`i18n`,文件夹下新建文件如下：
```
--lang
  --zh.js
  --en.js
--index.js
```
举例文件内容zh.js
```js
export default {
  login: {
    title: 'Cream后台登录系统',
    loginBtn: '登录',
    usernameRule: '用户名为必填项',
    passwordRule: '密码不能少于6位'
  }
  ...
}

```
举例文件内容en.js
```js
export default {
  login: {
    title: 'Cream Login System',
    loginBtn: 'Login',
    usernameRule: 'Username is required',
    passwordRule: 'Password cannot be less than 6 digits'
  }
  ...
}

```
index.js
```js
import { createI18n } from 'vue-i18n'
import zhLocal from './lang/zh'
import enLocal from './lang/en'
import store from '@/store'
const messages = {
  en: {
    msg: {
      ...enLocal
    }
  },
  zh: {
    msg: {
      ...zhLocal
    }
  }
}
function getLanguage() {//从存储中获取当前的language
  return store && store.getters && store.getters.language
}
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages
})
export default i18n

```

3. 首页main.js里面引入
```js
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
const app = createApp(App)
app.use(i18n)
app.mount('#app')
```

4. 使用

template中
```vue
<template>
  <p>{{$t('msg.login.title')}}</p>
</template>
```

script中
```vue
<script>
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
console.log(i18n.t('msg.login.title'))
</script>
```

js中
```js
import i18n from '@/i18n'
console.log(i18n.global.t('msg.login.title'))
```