# 滚动条进度
效果：[https://codepen.io/dfairy/pen/XQzYEK](https://codepen.io/dfairy/pen/XQzYEK)

参考代码：[https://www.w3cplus.com/css/pure-css-create-scroll-indicator.html](https://www.w3cplus.com/css/pure-css-create-scroll-indicator.html)

```css
body {
    position: relative;
    padding: 50px;
    background-image: linear-gradient(to right top, #46bd87 50%, #eee 50%);
    background-size: 100% calc(100% - 100vh + 3px);
    background-repeat: no-repeat;
    z-index: 1;
}

body::after {
    content: "";
    position: fixed;
    top: 3px;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: -1;
}

```