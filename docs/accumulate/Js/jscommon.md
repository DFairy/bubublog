# Js常用代码片段
## 下载一个excel文档
```js
//下载一个链接 
function download(link, name) {
    if(!name){
            name=link.slice(link.lastIndexOf('/') + 1)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}
//下载excel
download('http://111.229.14.189/file/1.xlsx')
```

## 在浏览器中自定义下载一些内容
```js
function downloadFile(name, content) {
    if(typeof name=='undefined'){
        throw new Error('The first parameter name id a must')
    }
    if(typeof content=='undefined'){
        throw new Error('The second parameter name id a must')
    }
    if(!(content instanceof Blob)){
        content= new Blob([content])
    }
    const link=URL.createObjectURL(content)
    //上述方法中的download()
    download(link,name)
} 
download('http://111.229.14.189/gk-api/util/download?file=1.jpg')
download('http://111.229.14.189/gk-api/util/download?file=1.mp4')
```

## 下载后端返回的流
数据是后端以接口的形式返回的,调用上面方法中的download方法进行下载

```js
download('http://111.229.14.189/gk-api/util/download?file=1.jpg')
 download('http://111.229.14.189/gk-api/util/download?file=1.mp4')

```

## 提供一个图片链接，点击下载
图片、PDF等文件，浏览器会默认执行预览，不能用downdload方法直接下载，需要先把图片、PDF等文件转换成blob，再调用download方法进行下载，转换的方式是使用axios请求对应的链接
```js
//可以用来下载浏览器会默认预览的文件类型，例如mp4,jpg等
import axios from 'axios'
//提供一个link，完成文件下载，link可以是  http://xxx.com/xxx.xls
function downloadByLink(link,fileName){
    axios.request({
        url:link,
        responseType:'blob'
    }).then(res=>{
        const link=URL.createObjectURL(res.data)
        //上述方法中的download()
        download(link,fileName)
    })
}
```
注意：会有同源策略的限制，需要配置转发

## 防抖
在一定时间间隔内，多次调用一个方法，只会执行一次.
```js
/**
 *
 * @param {*} func 要进行debouce的函数
 * @param {*} wait 等待时间,默认500ms
 * @param {*} immediate 是否立即执行
 */
export function debounce(func, wait=500, immediate=false) {
    var timeout
    return function() {
        var context = this
        var args = arguments

        if (timeout) clearTimeout(timeout)
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait)
        }
    }
}
```
使用方法
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <input id="input" />
        <script>
            function onInput() {
                console.log('1111')
            }
            const debounceOnInput = debounce(onInput)
            document
                .getElementById('input')
                .addEventListener('input', debounceOnInput) //在Input中输入，多次调用只会在调用结束之后，等待500ms触发一次   
        </script>
    </body>
</html>
```
如果第三个参数immediate传true，则会立即执行一次调用，后续的调用不会在执行，可以自己在代码中试一下

## 节流
多次调用方法，按照一定的时间间隔执行
```js
/**
 * 节流，多次触发，间隔时间段执行
 * @param {Function} func
 * @param {Int} wait
 * @param {Object} options
 */
export function throttle(func, wait=500, options) {
    //container.onmousemove = throttle(getUserAction, 1000);
    var timeout, context, args
    var previous = 0
    if (!options) options = {leading:false,trailing:true}

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime()
        timeout = null
        func.apply(context, args)
        if (!timeout) context = args = null
    }

    var throttled = function() {
        var now = new Date().getTime()
        if (!previous && options.leading === false) previous = now
        var remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            func.apply(context, args)
            if (!timeout) context = args = null
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining)
        }
    }
    return throttled
}
```
第三个参数还有点复杂，options

* leading，函数在每个等待时延的开始被调用，默认值为false
* trailing，函数在每个等待时延的结束被调用，默认值是true

 可以根据不同的值来设置不同的效果：

* leading-false，trailing-true：默认情况，即在延时结束后才会调用函数
* leading-true，trailing-true：在延时开始时就调用，延时结束后也会调用
* leading-true, trailing-false：只在延时开始时调用

使用方法
```html
!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <input id="input" />
        <script>
            function onInput() {
                console.log('1111')
            }
            const throttleOnInput = throttle(onInput)
            document
                .getElementById('input')
                .addEventListener('input', throttleOnInput) //在Input中输入，每隔500ms执行一次代码
        </script> 
    </body>
</html>
```

## cleanObject
使用场景是：后端列表查询接口，某个字段前端不传，后端就不根据那个字段筛选，例如name不传的话，就只根据page和pageSize筛选，但是前端查询参数的时候（vue或者react）中，往往会这样定义
```js
let res=cleanObject({
    name:'',
    pageSize:10,
    page:1
})
console.log("res", res) //输入{page:1,pageSize:10}   name为空字符串，属性删掉
```
给后端发送数据的时候，要判断某个属性是不是空字符串，然后给后端拼参数，这块逻辑抽离出来就是`cleanObject`，代码实现如下
```js
export const isFalsy = (value) => (value === 0 ? false : !value);

export const isVoid = (value) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object) => {
  // Object.assign({}, object)
  if (!object) {
    return {};
  }
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
```


## 检测页面是否滚动到页面底部
```js
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);

bottomVisible(); // true
```

## 将一个句子中每个单词首字母转换成大写字母
```js
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
capitalizeEveryWord('hello world!'); // 'Hello World!'
```

## 统计数组中某个值出现的次数
```js
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```