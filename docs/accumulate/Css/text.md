# 文字特效
## 空心文字
<textshadow-hollow/>
```css
p{
    color: #fff;
    text-shadow: 0 0 2px red,
    0 0 2px red,
    0 0 2px red,
    0 0 2px red;
}
```

## 文字外发光
<textshadow-glow/>
```css
p{
    color:#fff;
    text-shadow: 0 0 0.1em, 0 0 0.3em;
}
```
## 文字渐变
<textshadow-clip/>
```css
p{
    color:transparent;
    background: linear-gradient(0deg, green 0%,yellow 50%,red 100%);
    -webkit-background-clip: text;
}
```

## 文字阴影
<textshadow-shadow/>
```css
p{
    color:red;
    text-shadow: 1px 1px pink,
    2px 2px pink,
    3px 3px pink;
}
```

## 立体文字阴影
<textshadow-solid/>
```css
@function makelongrightshadow($color) {
    $val: 0px 0px $color;
    @for $i from 1 through 10 {
        $color: fade-out(desaturate($color, 1%), .02);
        $val: #{$val}, #{$i}px #{$i}px #{$color};
    }
    @return $val;
}

@function makelongleftshadow($color) {
    $val: 0px 0px $color;
    @for $i from 1 through 10 {
        $color: fade-out(desaturate($color, 1%), .02);
        $val: #{$val}, -#{$i}px #{$i}px #{$color};
    }
    @return $val;
}
.right{
    text-shadow: makelongrightshadow(hsla(231, 50%, 30%, 1));
    color:hsl(231, 50%, 60%);
}
.left{
    text-shadow: makelongleftshadow(rgb(240, 105, 128));
    color:red;
}
```

## 条形文字
<textshadow-stripe/>
```css
p{
    position: relative;
    font-size: 50px;
    text-align: center;
    text-shadow: 4px 4px 1px #333;

    &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(-45deg, #fff 0%, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent 100%);
        background-size: 6px 6px;
        z-index: 1;
    }

    &::after {
        position: absolute;
        content: attr(data-name);
        top: -4px;
        left: -2px;
        right: 6px;
        bottom: 6px;
        color: #333;
        z-index: 2;
        text-shadow: 3px 3px #fff;
    }
}
```