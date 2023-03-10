# 不规则形状
## 信息窗口
<irregular-inform/>
```css
.tip {
    width: 140px;
    height: 80px;
    border: 1px solid #00adb5;
    border-radius: 4px;
    position: relative;
    background-color: #fff;
    filter: drop-shadow(0px 2px 4px rgba(64, 158, 225, 0.9));
    &::before {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 10px 10px 10px;
        border-color: transparent transparent #fff transparent;
        position: absolute;
        top: -10px;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 2;
    }
    &::after {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 10px 10px 10px;
        border-color: transparent transparent #00adb5 transparent;
        position: absolute;
        top: -11px;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 1;
    }
}
```
## 镂空三角
<irregular-traingle/>
```css
@function sqrt($r) {
$x0: 1;
$x1: $x0;

@for $i from 1 through 10 {
    $x1: $x0 - ($x0 * $x0 - abs($r)) / (2 * $x0);
    $x0: $x1;
}

@return $x1 * 1px;
}

@mixin hollow-triangle-projecture($width,$color) {
background: linear-gradient(45deg, transparent sqrt($width * $width/2), $color 0) bottom left /50% 100% no-repeat,
linear-gradient(-45deg, transparent sqrt($width * $width/2), $color 0) bottom right /50% 100% no-repeat;
}

@mixin hollow-triangle-sunken($width,$color) {
background: linear-gradient(-45deg, transparent sqrt($width * $width/2), $color 0) bottom left /50% 100% no-repeat,
linear-gradient(45deg, transparent sqrt($width * $width/2), $color 0) bottom right /50% 100% no-repeat;
}

.hollow-triangle-projecture {
width: 60px;
height: 150px;
@include hollow-triangle-projecture(60, #00adb5)
}

.hollow-triangle-sunken {
width: 60px;
height: 150px;
@include hollow-triangle-sunken(60, #00adb5)
}
```
## 箭头
<irregular-arrow/>
```css
.arrow{
    width: 200px;
    height: 40px;
    background:
    linear-gradient(-135deg, transparent 10%, #04e6fb 10%, #65ff9a 100%)
    top right,
    linear-gradient(-45deg, transparent 10%, #04e6fb 10%, #65ff9a 100%)
    bottom right,
    linear-gradient(-135deg, #04e6fb 0, #65ff9a 90%, transparent 90%)
    top left,
    linear-gradient(-45deg, #04e6fb 0, #65ff9a 90%, transparent 90%)
    bottom left;
    background-size: 90% 50%;
    background-repeat: no-repeat;
}
```
## 内切直角
<irregular-inscribed/>
```css
.inscribed{
    background:
    linear-gradient(135deg, transparent 15px, #00adb5 0)
    top left,
    linear-gradient(-135deg, transparent 15px, #00adb5 0)
    top right,
    linear-gradient(-45deg, transparent 15px, #00adb5 0)
    bottom right,
    linear-gradient(45deg, transparent 15px, #00adb5 0)
    bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}
```

## 内切圆角
<irregular-circle/>
```html
<div class="circle">
    <div class="shadow">使用阴影的扩散半径实现内切圆角</div>
    <div class="shadow2">阴影实现缺点，单个标签最多是2边</div>
    <div class="linear">使用径向渐变实现内切圆角</div>
    <div class="linear2">径向渐变实现内切圆角可以是4边</div>
</div>
```
```css
.circle{
    div {
        position: relative;
        width: 20vw;
        height: 8vw;
        margin: 1vw auto;
        border-radius: 1vmin;
        // background: #e91e63;
        overflow: hidden;
        line-height: 8vw;
        color: #fff;
        text-align: center;
    }
}

.shadow {
    &::before {
        position: absolute;
        content: "";
        top: -2vw;
        left: -2vw;
        width: 4vw;
        height: 4vw;
        border-radius: 50%;
        box-shadow: 0 0 0 25vw #e91e63; 
        z-index: -1;
        animation: shadowmove 10s infinite;
    }
}

.shadow2 {
        &::before {
        position: absolute;
        content: "";
        top: -2vw;
        left: -2vw;
        width: 4vw;
        height: 4vw;
        border-radius: 50%;
        box-shadow: 0 0 0 15vw #e91e63; 
        z-index: -1;
    }

    &::after {
        position: absolute;
        content: "";
        bottom: -2vw;
        right: -2vw;
        width: 4vw;
        height: 4vw;
        border-radius: 50%;
        box-shadow: 0 0 0 15vw #e91e63; 
        z-index: -1;
    }
}

@keyframes shadowmove {
    0%{
        background: #e91e63; 
        box-shadow: 0 0 0 0 #e91e63; 
    }

    10% {
        background: transparent; 
        box-shadow: 0 0 0 0 #e91e63; 
    }

    50% {
        background: transparent; 
        box-shadow: 0 0 0 25vw #e91e63; 
    }
}

.linear {
    background-size: 100% 100%;
    background-image: radial-gradient(circle at 0 0, transparent 0, transparent 2vw, #03A9F5 2vw);
    background-repeat: no-repeat;
}

.linear2 {
    background-size: 70% 70%;
    background-image: 
        radial-gradient(circle at 100% 100%, transparent 0, transparent 2vw, #03A9F5 2vw),
        radial-gradient(circle at 0 0, transparent 0, transparent 2vw, #03A9F5 2vw),
        radial-gradient(circle at 100% 0, transparent 0, transparent 2vw, #03A9F5 2vw),
        radial-gradient(circle at 0 100%, transparent 0, transparent 2vw, #03A9F5 2vw);
    background-repeat: no-repeat;
    background-position: right bottom, left top, right top, left bottom;
}
```
## 波浪
<irregular-wave/>
```css
.wave{
    position: relative;
    width: 400px;
    height: 10vh;
    background: linear-gradient(180deg, #607d8b, #673ab7), rgba(0, 0, 0, .5);
    background-size: 100% 50px;
    background-repeat: no-repeat;  
    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 40px;
        right: 0;
        background-repeat: repeat-x;
        height: 10px;
        background-size: 20px 20px;
        background-image: radial-gradient(circle at 10px -5px, transparent 12px, #fff 13px, #fff 20px); 
    }   
    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 35px;
        right: 0;
        background-repeat: repeat-x;
        height: 15px;
        background-size: 40px 20px;
        background-image: radial-gradient(circle at 10px 15px, white 12px, transparent 13px);
    }
}
```