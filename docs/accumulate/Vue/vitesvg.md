# 在vue3+vite项目中配置svg

1. 在文件夹`libs`下新建`svg-icon/index.vue`,`index.js`
index.vue
```vue
<template>
  <svg>
    <use :xlink:href="symbolId" :class="fillClass" :fill="color" />
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  fillClass: {
    type: String,
  },
})

const symbolId = computed(() => {
  return `#icon-${props.name}`
})
</script>

<style></style>

```

index.js
```js
import svgIcon from './svg-icon/index.vue'
export default {
  install(app) {
    app.component('m-svg-icon', svgIcon)
  },
}

```

2. 安装依赖
```js
npm install vite-plugin-svg-icons -D
```

3. vite.config.js
```js
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    }),
  ]
})

```

4. main.js
```js
import { createApp } from 'vue'
import App from './App.vue'
import libs from '@/libs'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(libs)
app.mount('#app')

```

5.引用
```vue
<template>
  <m-svg-icon name=''></m-svg-icon>
</template>
```
