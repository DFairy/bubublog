# vue3 全局使用 svg

1. 安装依赖

```js
npm install svg-sprite-loader --save-dev
```

2. 在`vue.config.js`中配置

```js
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  // 配置svg
  chainWebpack: (config) => {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons")) //放置svg的路径
      .end();

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons")) //放置svg的路径
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
  },
};
```

3. 在`src/components/SvgIcon`目录下新建`index.vue`组件

```vue
<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
});

/**
 * 判断是否为外部资源
 */
const external = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

//判断是否为外部图标
const isExternal = computed(() => {
  external(props.icon);
});

//外部图标样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${props.icon}) no-repeat 50% 50%`,
}));

//内部图标样式

const iconName = computed(() => `#icon-${props.icon}`);
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
```

4. 在 src 下新建`icons文件夹`，在 icons 文件夹下新建`svg文件`夹和`index.js`文件
   svg 文件夹放所有的 svg
   index.js 文件:

```js
import SvgIcon from "@/components/SvgIcon";

// 通过 require.context() 函数来创建自己的 context
const svgRequire = require.context("./svg", false, /\.svg$/);
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon));

export default (app) => {
  app.component("svg-icon", SvgIcon);
};
```

5. 首页 main.js 里面引入

```js
import { createApp } from "vue";
import App from "./App.vue";
import installIcon from "./icons";
const app = createApp(App);
installIcon(app);
app.mount("#app");
```

6. 全局引用

```vue
<template>
  <svg-icon icon="user" className="user"></svg-icon>
</template>
```
