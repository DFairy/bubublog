# 居中
下面介绍几种常用的垂直居中方法 

```html
<div class="outer">
    <div class="content"></div>
</div>
```
```css
html,body{
    width: 100%;
    height: 100%;
}
```

### absolute + margin 负值
```css  
.outer {
    position: relative;
    width: 100%;
    height: 100%;
}

.content {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
    background-color: #a00;
}
```

### absolute + margin auto
```css
.outer {
    position: relative;
    width: 100%;
    height: 100%;
}

.content {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: #a00;
}
```

### absolute + translate
```css
.outer {
    position: relative;
    width: 100%;
    height: 100%;
}

.content {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #a00;
}
```

### flex布局(不用固定宽高)（不兼容 IE8）
```css
.outer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    width: 200px;
    height: 200px;
    background-color: #a00;
}
```

### 伪元素和 inline-block / vertical-align(不用固定宽高)（兼容 IE8）
```css
.box-wrap:before {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      margin-right: -0.25em; //微调整空格
}
.box {
     display: inline-block;
     vertical-align: middle;
}
```

### transform(不用固定宽高)(不兼容 ie8 以下)
```css
.box-wrap {
     width:100%;
     height:300px;
     background:rgba(0,0,0,0.7);
     position:relative;
}
.box{
    position:absolute;
    left:50%;
    top:50%;
    transform:translateX(-50%) translateY(-50%);
    -webkit-transform:translateX(-50%) translateY(-50%);
}
```
