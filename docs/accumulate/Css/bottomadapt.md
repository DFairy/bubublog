# 底部自适应
<sticky-footer/>
```html
<body>
  <article>
    <div class="poem">
      ...
    </div>
  </article>
  <footer>底部始终在文档末尾，当文档较长时跟随在文档末尾，当文档较短时在窗口底部。</footer>
</body>
```

```css
html, body{
  height:100%;
}
article {
  min-height: 100%;
  .poem {
    padding-bottom: 41px;  // 这里应当是footer的固定高度
    zoom: 1;
  }
}
footer {
  padding: 10px;
  margin-top: -41px;  // 这里应当是footer的固定高度
}
```