# css冷门属性
下面是一些冷门属性，还不太常用
## mask

[mask详解MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask)

[张鑫旭博客-CSS转场动画](https://www.zhangxinxu.com/wordpress/2019/05/css-transfer-animation/)

[mask的基本用法](https://www.cnblogs.com/coco1s/p/13253423.html)

### 基本语法
```css
{
    mask: url(mask.png);                       /* 使用位图来做遮罩 */
    mask: url(masks.svg#star);                 /* 使用 SVG 图形中的形状来做遮罩 */
    mask: linear-gradient(#000, transparent)   /* 使用渐变来做遮罩 */
}
```
示例css代码
```css
{
    background: url(image.png) ;
    mask: linear-gradient(90deg, transparent, #fff);
}
```

效果

![](https://ae01.alicdn.com/kf/Hd4aa33db9b2d412ca6fb85b451d34740B.jpg)

[codepen demo--mask基本用法](https://codepen.io/dfairy/pen/BajPdYo)
