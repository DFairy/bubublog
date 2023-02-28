# vue3

下面内容记录自己在学习过程中遇到的报错问题以及新学习的知识

## 1.vue中引入scss样式变量，在全局使用

以`variable.scss`为例
1. 首先声明一个`variable.scss`并加入几个变量
```scss
$font-size-small-s: 10px;
$font-size-small : 12px;
$font-size-medium : 14px;
$font-size-medium-x : 16px;
$font-size-large : 18px;
$font-size-large-x : 22px;
```
2. 在`vue.config.js`文件中加上如下配置
```js
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData:`
                    @import "@/assets/scss/variable.scss";
                `
            }
        }
    }
}
```
3. 以上就可以在文件里面使用了，但是使用过程中遇到报错记载一下：

::: danger 报错
ValidationError: Invalid options object. Sass Loader has been initialized using an options object that does not match the API schema
:::

:heavy_check_mark:**解决方法:**
版本问题，版本过旧，重新安装sass-loader
```
npm uninstall --save-dev sass-loader
npm install --save-dev sass-loader@7.1.0
```

## 2.eslint报错
::: danger 报错
12:7   error  Missing space before function parentheses       space-before-function-paren
14:1   error  Expected indentation of 6 spaces but found 8    inden
:::

:heavy_check_mark:**解决方法:**
要么自己把空格问题编辑好，要么忽略配置

在文件夹`eslintrc.js`中加入
```
rules: {
    'indent': 0,
    'space-before-function-paren': 0
  }
```
::: danger 报错
Newline required at end of file but not found  eol-last
:::
:heavy_check_mark:**解决方法:**
最后一行加一下空格

## 3.Vue项目报错：net::ERR_CONNECTION_TIMED_OUT
ip地址问题也就是环境的问题
:heavy_check_mark:**解决方法:**
清除浏览器缓存重启一下或者在cue.config.js里面设置一下固定ip
