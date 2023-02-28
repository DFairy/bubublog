# 数组



## String
```js
const name = 'Zelda';
const letters = [...name]; // 'Z', 'e', 'l', 'd', 'a'
```

## 扁平化
### toString
```js
let arr=[1,[[2],[3,4]]]
console.log(arr.toString().split(",").map(item=>+item));//[1,2,3,4]
```
### flatten函数
```js
function flatten(arr){
    let result=[];
    for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            result=result.concat(flatten(arr[i]))
        }else{
            result.push(arr[i])
        }
    }
    return result;
}
```
### reduce
```js
function flatten(arr){
    return arr.reduce((pre,current)=>{
        return pre.concat(Array.isArray(current)?flatten(current):current)
    },[])
}
```


## 数组去重
```js
function noRepeat(arr){
    return [...new Set(arr)];
}
```

## 数组最大值
```js
function arrayMax(arr){
    return Math.max(...arr);
}
```

## 返回以size为长度的数组分割的原数组
```js
function chunk(arr,size){
    return Array.from({
        length:Math.ceil(arr.length/size)
    },(v,i)=>{
        arr.slice(i*size,i*size+size)
    })
}
```

## 检查数组中某元素出现的次数
```js
function countRepeat(arr,value){
    return arr.reduce((a,v)=>v===value?a+1:a+0,0)
}
```
## 数组所有元素出现的个数
```js
function countAllRepeat(arr){
   return arr.reduce((prev,next)=>{
       prev[next] = (prev[next] + 1) || 1; 
        return prev; 
   },{}) 
}
```

## 对比俩个数组并返回其中不同的元素
```js
function compareArr(arr1,arr2){
    return arr1.filter(v=>!arr2.includes(v))
}
```

## 对比俩个数组并返回其中相同的元素
```js
function compareArr(arr1,arr2){
    return arr1.filter(v=>arr2.includes(v))
}
```

## 从右删除n个元素
```js
function deleteRight(arr,n){
    return n<arr.length?arr.slice(0,arr.length-n):[]
}
```

## 返回数组中第n个元素
```js
function nthElement(arr, n = 0) {
  return (n >= 0 ? arr.slice(n, n + 1) : arr.slice(n))[0]
}
```

## 数组乱排
```js
function shuffle(arr) {
  let array = arr
  let index = array.length

  while (index) {
    index -= 1
    let randomInedx = Math.floor(Math.random() * index)
    let middleware = array[index]
    array[index] = array[randomInedx]
    array[randomInedx] = middleware
  }

  return array
}
```



