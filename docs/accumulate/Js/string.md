# 字符串

## 重复字符串
```js
const eightBits ='1'.repeat(8)//"11111111"
```

## 填充字符串到指定的长度
```js
const eightBits = '001'.padStart(8, '0')//"00000001"
const eightBits = '001'.padEnd(8, '0')//"00100000"
```

## 将字符串拆分成字符数组
```js
const word="apple"
const characters = [...word]// ["a", "p", "p", "l", "e"]
```

## 计算字符串的字符
```js
const word = "apple";
console.log(word.length) // 5
```
中文
```js
const word = "𩸽"
const characters = [...word]
console.log(characters.length) // 1
```

## 反转字符串的字符
```js
const word="apple"
const reverseworld=[...word].reverse().join("") //"elppa"
```

## 大写首字母
```js
const word = 'apply'
word = word[0].toUpperCase() + word.substr(1)//"Apple"
```
```js
const word = 'apply'
const characters=[...word]
characters[0]=characters[0]..toUpperCase()
word=characters.join('')
```
```css
text-transform: capitalize
```

## 多个分隔符分割字符串
```js
const list = "apples,bananas;cherries"
const fruits = list.split(/[,;]/) // ["apples", "bananas", "cherries"]
```

## 是否包含特定序列
```js
const text = "Hello, world! My name is Kai!"
console.log(text.includes("Kai")); // true
```

## 是否以特定学列开头或者结尾
```js
const text = "Hello, world! My name is Kai!"
console.log(text.startsWith("Hello")); // true
console.log(text.endsWith("Hello")); // false
```

## 替换所有字符串
```js
const text = "I like apples. You like apples."
console.log(text.replace(/apples/g, "bananas"));// "I like bananas. You like bananas."
console.log(text.replaceAll("apples", "bananas"));// "I like bananas. You like bananas."

```