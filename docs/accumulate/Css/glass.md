# 毛玻璃效果

<glass-glass/>

```css
main {
  height: 350px;
  background: url(https://dfairy-1258930237.cos.ap-shanghai.myqcloud.com/%E4%BA%BA%E7%94%9F1.jpg)
    fixed center -50px / cover no-repeat;
  position: relative;
  color: #fff;
  section {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 1;
    width: 80%;
    height: 50%;
    box-sizing: border-box;
    padding: 66px 30px;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      filter: blur(10px);
      background: url(https://dfairy-1258930237.cos.ap-shanghai.myqcloud.com/%E4%BA%BA%E7%94%9F1.jpg)
        fixed center -50px / cover no-repeat;
      z-index: -1;
    }
  }
}
```
