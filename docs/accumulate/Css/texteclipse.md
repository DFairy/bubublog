# 文本溢出截断省略

## 单行文本溢出省略
```css
{
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}
```

## 多行文本溢出省略
1.纯css实现(兼容性一般)
```css
{
    -webkit-line-clamp:2;//行数
    display:-webkit-box
    -webkit-box-orient:vertical;
    overflow:hidden;
    text-overflow:ellipsis;
}
```

2.基于javascript的实现方案

文本为中英文混合时，省略号显示位置略有偏差
```js
<script type="text/javascript">
    const text = '这是一段很长的文本';
    const totalTextLen = text.length;
    const formatStr = () => {
        const ele = document.getElementsByClassName('demo')[0];
        const lineNum = 2;
        const baseWidth = window.getComputedStyle(ele).width;
        const baseFontSize = window.getComputedStyle(ele).fontSize;
        const lineWidth = +baseWidth.slice(0, -2);

        // 所计算的strNum为元素内部一行可容纳的字数(不区分中英文)
        const strNum = Math.floor(lineWidth / +baseFontSize.slice(0, -2));

        let content = '';

          // 多行可容纳总字数
        const totalStrNum = Math.floor(strNum * lineNum);
        const lastIndex = totalStrNum - totalTextLen;
        if (totalTextLen > totalStrNum) {
            content = text.slice(0, lastIndex - 3).concat('...');
        } else {
            content = text;
        }
        ele.innerHTML = content;
    }

    formatStr();

    window.onresize = () => {
        formatStr();
    };
</script>

<body>
    <div class='demo'></div>
</body>
```

3.css实现（按高度）

  3.1 不显示省略号
```css
    {
        overflow:hidden;
        max-height:40px;
        line-height:20px;
    }
```
  3.2 伪元素 + 定位实现多行省略
  ```css
    .demo {
        position: relative;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
    }
    .demo::after {
        content: "...";
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0 20px 0 10px;
    }
  ```




