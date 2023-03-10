# 清除默认样式
## reset
```css
html,body{height:100%;}
html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0;}
header,footer,section,article,aside,nav,hgroup,address,figure,figcaption,menu,details{display:block;}
table{border-collapse:collapse;border-spacing:0;}
caption,th{text-align:left;font-weight:normal;}
html,body,fieldset,img,iframe,abbr{border:0;}
i,cite,em,var,address,dfn{font-style:normal;}
[hidefocus],summary{outline:0;}
li{list-style:none;}
h1,h2,h3,h4,h5,h6,small{font-size:100%;}
sup,sub{font-size:83%;}
pre,code,kbd,samp{font-family:inherit;}
q:before,q:after{content:none;}
textarea{overflow:auto;resize:none;}
label,summary{cursor:default;}
a,button{cursor:pointer;}
h1,h2,h3,h4,h5,h6,em,strong,b{font-weight:bold;}
del,ins,u,s,a,a:hover{text-decoration:none;}
body,textarea,input,button,select,keygen,legend{font:12px/1.14 Microsoft YaHei,arial,\5b8b\4f53;color:#333;outline:0;}
body{background:#fff;}
a,a:hover{color:#333;}
*{box-sizing: border-box;}
```

## 推荐默认样式
```css
/* 初始化 */
a,abbr,acronym,address,applet,area,article,aside,audio,b,base,basefont,bdi,bdo,big,blockquote,body,br,button,canvas,caption,center,cite,code,col,colgroup,datalist,dd,del,details,dir,div,dfn,dialog,dl,dt,em,embed,fieldset,figcaption,figure,font,footer,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,header,hr,html,i,iframe,img,input,ins,isindex,kbd,keygen,label,legend,li,link,map,mark,menu,menuitem,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,small,source,span,strike,strong,style,sub,summary,sup,table,tbody,td,textarea,tfoot,th,thead,time,title,tr,track,tt,u,ul,var,video,wbr,xmp {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
body {
	font: 14px/1 "PingFang SC", "Microsoft YaHei", sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
img {
	display: block;
	border: none;
}
dl,li,menu,ol,ul {
	list-style: none;
}
button,input,select,textarea {
	outline: none;
}
a,a:link,a:visited,a:hover,a:active {
	text-decoration: none;
}
/* 浮动方式 */
.fl {
	float: left;
}
.fr {
	float: right;
}
.clear {
	overflow: hidden;
	clear: both;
	height: 0;
	font-size: 0;
}
.clearfix::after {
	display: block;
	visibility: hidden;
	clear: both;
	height: 0;
	font-size: 0;
	content: "";
}
/* 定位方式 */
.pr {
	position: relative;
}
.pa {
	position: absolute;
}
.pf {
	position: fixed;
}
.center {
	margin: 0 auto;
}
/* 居中定位 */
.abs-ct {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.abs-cx {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}
.abs-cy {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}
/* 弹性布局 */
.flex-ct-x {
	display: flex;
	justify-content: center;
	align-items: center;
}
.flex-ct-y {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.flex-fs {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: space-between;
}
/* 动画模式 */
.td-camera {
	perspective: 1000;
}
.td-space {
	transform-style: preserve-3d;
}
.td-box {
	backface-visibility: hidden;
}
.gpu-speed {
	transform: translate3d(0, 0, 0);
}
/* 其他 */
.fullscreen {
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.page-at {
	overflow: auto;
	width: 100%;
	height: 100%;
}
.page-fs {
	overflow: hidden;
	width: 100%;
	height: 100%;
}
.round {
	border-radius: 100%;
}
```
## 去除input默认填充的背景颜色
```css
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
```
## 清除input[type=number]的默认样式
```css
input[type=number] {
    -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
```
## 清除移动端 a 标签等点击区域变色
```css
*{
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
```
## 清除移动端 input 样式
```css
input{
    border: none;
    -moz-appearance:none;
    -webkit-appearance : none ; /*解决ios上按钮的圆角问题*/
    border-radius: 0; /*解决ios上输入框圆角问题*/
    outline:medium; /*去掉鼠标点击的默认黄色边框*/
    background-color: transparent;
}
```

## 避免ios滑动滚动条卡顿
```css
*{
  -webkit-overflow-scrolling : touch
}
```

## 类似苹果电脑的进度条效果
```css
::-webkit-scrollbar {
    width: 5px;
    background-color: rgba(0,0,0,0.1);
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background:rgba(0,0,0,0.22);
}

::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #f5f5f5;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.22);
}
```

## mixin样式
```css
@mixin scroll {
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        display: none;
    }
}

@mixin center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin top {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

@mixin bottom {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

@mixin leftBottom {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}

@mixin left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

@mixin right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

@mixin rightBottom {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}

@mixin columnCenter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

@mixin columnTop {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

@mixin columnTopLeft {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

@mixin columnLeft {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

@mixin absCenter {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}

@mixin ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

@mixin ellipsis2($line) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: $line;
    word-break: keep-all;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
}

.slide-down-enter,
.slide-down-leave-to {
    transform: translate3d(0, -100%, 0)
}

.slide-down-enter-to,
.slide-down-leave,
.slide-up-enter-to,
.slide-up-leave,
.slide-right-enter-to,
.slide-right-leave,
.opacity-slide-up-enter-to,
.opacity-slide-up-leave {
    transform: translate3d(0, 0, 0)
}

.popup-slide-up-enter-to,
.popup-slide-up-leave {
    transform: translate3d(0, 0, 0);
    opacity: 1;
}

.slide-down-enter-active,
.slide-down-leave-active,
.slide-up-enter-active,
.slide-up-leave-active,
.fade-enter-active,
.fade-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.popup-slide-up-enter-active,
.popup-slide-up-leave-active {
    transition: all .2s linear;
}

.slide-up-enter,
.slide-up-leave-to {
    transform: translate3d(0, px2rem(138), 0)
}

.popup-slide-up-enter,
.popup-slide-up-leave-to {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
}

.slide-right-enter,
.slide-right-leave-to {
    transform: translate3d(-100%, 0, 0);
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave {
    opacity: 1;
}
```

