# 文字输入效果
<text-input/>
```css
h1 {
    font: bold 200% Consolas, Monaco, monospace;
    border-right: 0.1em solid;
    width: 12.5em;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 3s steps(26, end),
        cursor-blink 0.5s step-end infinite alternate;
}

@keyframes typing {
    from {
        width: 0;
    }
}

@keyframes cursor-blink {
    50% {
        border-color: transparent;
    }
}
```