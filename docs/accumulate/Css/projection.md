# 投影
## 单侧投影
<shadow-side/>
```css
.left {
    box-shadow: -7px 0 5px -5px #333;
    }

.right {
    box-shadow: 7px 0 5px -5px #333;
}

.top {
    box-shadow: 0 -7px 5px -5px #333;
}

.bottom {
    box-shadow: 0 7px 5px -5px #333;
}
```

## 立体投影
<shadow-solid/>
```css
.g-left{
    background: hsl(48, 100%, 50%);
    box-shadow: 0 0 5px 2px hsl(48, 100%, 45%);
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 5%;
        right: 5%;
        bottom: 0;
        border-radius: 10px;
        background: hsl(48, 100%, 20%);
        transform: translate(0, -15%) rotate(-4deg);
        transform-origin: center center;
        box-shadow: 0 0 10px 10px hsl(48, 100%, 20%);
        z-index: -1;
    }
}

.g-both {
    background: hsl(199, 98%, 48%);
    box-shadow: 0 0 5px 2px hsl(199, 98%, 40%);
    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 5%;
        right: 5%;
        bottom: 15%;
        border-radius: 10px;
        background: hsl(199, 98%, 20%);
        transform: translate(0, -20%) rotate(-4deg);
        transform-origin: center center;
        box-shadow: 0 0 20px 15px hsl(199, 98%, 20%);
        z-index: -1;
    }
    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 5%;
        right: 5%;
        bottom: 15%;
        border-radius: 10px;
        background: hsl(199, 98%, 20%);
        transform: translate(0, -20%) rotate(4deg);
        transform-origin: center center;
        box-shadow: 0 0 20px 15px hsl(199, 98%, 20%);
        z-index: -1;
    }
}



.g-slide {
    background: hsl(150, 62%, 52%);
    box-shadow: 0 0 5px 2px hsl(150, 62%, 40%);
    &::before {
        content: "";
        position: absolute;
        top: 15%;
        bottom: 20%;
        left: 90%;
        right: 5%;
        border-radius: 10px;
        background: hsl(150, 62%, 20%);
        transform: translate(105%, 10%) rotate(15deg);
        transform-origin: center center;
        box-shadow: 0 0 10px 7px hsl(150, 62%, 20%);
        z-index: -1;
    }
    &::after {
        content: "";
        position: absolute;
        top: 15%;
        bottom: 20%;
        left: 5%;
        right: 90%;
        border-radius: 10px;
        background: hsl(150, 62%, 20%);
        transform: translate(-105%, 10%) rotate(-15deg);
        transform-origin: center center;
        box-shadow: 0 0 10px 7px hsl(150, 62%, 20%);
        z-index: -1;
    }
}
```

## 长阴影
<shadow-long/>
```css
.long{
    position: relative;
    width: 150px;
    height: 150px;
    background: hsl(48, 100%, 50%);
    margin: 50px auto;
    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
    &::before {
        transform-origin: 0 50%;
        transform: translate(100%, 0) skewY(45deg) scaleX(.5);
        background: linear-gradient(90deg, rgba(0, 0, 0, .3), transparent);
    }
    &::after {
        transform-origin: 0 0;
        transform: translate(0%, 100%) skewX(45deg) scaleY(.5);
        background: linear-gradient(180deg, rgba(0, 0, 0, .3), transparent);
    }
}
```

## 彩色阴影
<shadow-color/>
```css
.avator{
    background: url(https://dfairy-1258930237.cos.ap-shanghai.myqcloud.com/%E4%BA%BA%E7%94%9F1.jpg
) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    width: 150px;
    height: 150px;
    border-radius: 50%;
     &::after {
        content: "";
        position: absolute;
        top: 10%;
        left: 0%;
        width: 100%;
        height: 100%;
        background: inherit;
        background-size: 100% 100%;
        border-radius: 50%;
        transform: scale(.95);
        filter: blur(10px) brightness(80%) opacity(.8);
        z-index: -1;
    }
}
```