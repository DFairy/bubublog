# 自适应布局

## 媒体查询方式
1. css内部
```css
@media screen and (min-device-width:100px) and (max-device-width:300px){

}
```

2. style标签
```html
<style media="(min-device-width:100px) and (max-device-width:300px)">
</style>
```

3. link引入
```html
<link href="common.css" media="(min-device-width:100px) and (max-device-width:300px)">
```

## 自适应布局
```js
var redirect=()=>{
    let userAgent=navigator.userAgent.toLowerCase();
    let device=/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/;
    if(device.test(userAgent)){
        //跳转到移动端页面
        window.location.href='mobile.html'
    }else{
        //跳转到pc端页面
        window.location.href='pc.html'
    }
}
```

## rem布局
```js
//designWidth:设计稿的实际宽度值，需要根据实际设置
//maxWidth:制作稿的最大宽度值，需要根据实际设置
//这段js的最后面有两个参数记得要设置，一个为设计稿实际宽度，一个为制作稿最大宽度，例如设计稿为750，最大宽度为750，则为(750,750)
;(function(designWidth, maxWidth) {
    var doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement("style"),
    tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 540;
        width>maxWidth && (width=maxWidth);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function(e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(750, 750);
```
1. 根据设计稿大小，调整里面的最后两个参数值。
2. 使用1rem=100px转换你的设计稿的像素，例如设计稿上某个块是100px*300px,换算成rem则为1rem*3rem。