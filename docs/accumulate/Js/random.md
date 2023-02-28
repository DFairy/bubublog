# 随机js

## (m,n)之间的数
```js
function random(m, n) {
    return Math.round(Math.random() * (n - m)) + m;
}
```
## 数字千位分隔符
```js
function commafy(num) {
  return (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
```

## 随机颜色
```js
function ramDomColor(color) {
    if (color && (color.constructor == Array)) {
        let index = Math.floor(Math.random() * (color.length))
        return color[index];
    } else if (color && (color.constructor == String)) {
        return color
    } else {
      
        第一种实现
        return '#' + Math.floor(Math.random() * 0xffffff).toString(16);

        第二种实现
        return '#' + Math.floor(Math.random() * 16777215).toString(16);

        第三种实现
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let rgb = `rgb(${r},${g},${b})`;
        return rgb;

    }
}



```