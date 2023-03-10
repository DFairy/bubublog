# 滚动吸顶
参考代码:[https://juejin.im/post/5caa0c2d51882543fa41e478](https://juejin.im/post/5caa0c2d51882543fa41e478)
以下三种方案，方案一和方案二三结合使用更佳
## 使用`position:sticky`实现
MDN传送门：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

效果：[https://codepen.io/dfairy/pen/jRaeLo?&editable=true](https://codepen.io/dfairy/pen/jRaeLo?&editable=true)

### 如何使用
使用条件：
1. 父元素不能 `overflow:hidden` 或者 `overflow:auto` 属性

2. 必须指定 `top`、`bottom`、`left`、`right` 4 个值之一，否则只会处于相对定位
3. 父元素的高度不能低于 `sticky` 元素的高度
4. `sticky` 元素仅在其父元素内生效

在需要滚动吸顶的元素加上以下样式便可以实现这个效果：
```css
.sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
}
```
### 兼容性
传送门：[https://www.caniuse.com/#search=sticky](https://www.caniuse.com/#search=sticky)

从上可以看出，兼容性不太好，所以要配合以下几种方式一起使用
## 使用原生的 offsetTop 实现
我们知道 offsetTop 是相对定位父级的偏移量，倘若需要滚动吸顶的元素出现定位父级元素，那么 offsetTop 获取的就不是元素距离页面顶部的距离。
以下是对offset作出处理
```js
getOffset: function(obj,direction){
    let offsetL = 0;
    let offsetT = 0;
    while( obj!== window.document.body && obj !== null ){
        offsetL += obj.offsetLeft;
        offsetT += obj.offsetTop;
        obj = obj.offsetParent;
    }
    if(direction === 'left'){
        return offsetL;
    }else {
        return offsetT;
    }
}
```
使用
```js
window.addEventListener('scroll', self.handleScrollTwo);

handleScrollTwo: function() {
   let self = this;
   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
   let offsetTop = self.getOffset(self.$refs.pride_tab_fixed);
   self.titleFixed = scrollTop > offsetTop;
}

```
## 使用 `obj.getBoundingClientRect().top` 实现
`obj.getBoundingClientRect()`可以告诉你某个元素相对浏览器视窗上下左右的距离。

tab 吸顶可以使用 obj.getBoundingClientRect().top 代替 scrollTop - offsetTop,代码如下：
```js
// html
    <div class="pride_tab_fixed" ref="pride_tab_fixed">
        <div class="pride_tab" :class="titleFixed == true ? 'isFixed' :''">
            // some code
        </div>
    </div>
    // vue
    export default {
            data(){
              return{
                titleFixed: false
          }
        },
        activated(){
              this.titleFixed = false;
          window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
              //滚动监听，头部固定
          handleScroll: function () {
                let offsetTop = this.$refs.pride_tab_fixed.getBoundingClientRect().top;
            this.titleFixed = offsetTop < 0;
            // some code
          }
        }
      }
```
