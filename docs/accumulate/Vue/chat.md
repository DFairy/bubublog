# 没啥关系的组件之间的通信
参考文章 [https://www.imooc.com/article/283227](https://www.imooc.com/article/283227)
vue通信之间有很多种通信方法，很常见的比如写一个组件，子传父，父传子；通过路由之间通信

下面我介绍的是相互之间没有关系的组件之间通信的方法
## 使用缓存
最简单通信的就是使用缓存

## 使用event-bus来订阅发布
我们可以使用订阅发布模式来做，并且挂载到Vue.protytype之上，也就是喜闻乐见的 event-bus

### 新建一个event-bus.js
```js
class Bus{
  constructor(){
    this.callbacks = {}
  }
  $on(name,fn){
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  $emit(name,args){
    if(this.callbacks[name]){
      // 存在 遍历所有callback
      this.callbacks[name].forEach(cb=> cb(args))
    }
  }
}
 
Vue.prototype.$bus = new Bus()
```

### 使用与监听
```js
// 使用
eventBus(){
    this.$bus.$emit('event-bus','消息')
}
 
// 监听
this.$bus.$on("event-bus",msg=>{
    this.msg = '接收event-bus消息:'+ msg
})
```
 
 
## 使用vuex
其实vuex很简单，简单的理解来说就是一个数据管理框架，大家将数据都放到一个地方，由这个地方指定的命令来存储和读取数据。

先上一段代码
```js
<!DOCTYPE html>
<html lang="en">
 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="../node_modules/vue/dist/vue.min.js"></script>
    <script src="../node_modules/vuex/dist/vuex.min.js"></script>
</head>
 
<body>
    <div id="app">
        <h2>{{msg}}</h2>
        <button @click='add'>点击</button>
        <counter></counter>
    </div>
 
    <script>
        const counter = {
            template: `
            <div>
                <div>{{count}}</div>
                <div>{{name}}</div>
                <div>{{username}}</div>
            </div>           
            `,
            computed: {
                count() {
                    return this.$store.state.count
                },
                name() {
                    return this.$store.state.name
                },
                username() {
                    return this.$store.getters.username
                }
            }
        }
        const store = new Vuex.Store({
            state: {
                count: 10,
                name: '姐姐'
            },
            getters: {
                username(state) {
                    return state.name + ',你好'
                }
            },
            mutations: {
                increment(state, num) {
                    state.count = num
                },
                changeName(state, username) {
                    state.name = username
                }
            },
            actions: {
                incrementAction(context, num) {
                    context.commit('increment', num)
                }
            }
 
        })
        new Vue({
            el: '#app',
            store,
            data: {
                msg: '使用'
            },
            components: {
                counter
            },
            methods: {
                add() {
                    this.$store.dispatch('incrementAction', 500)
                    this.$store.commit('changeName', '哥哥')
                }
            },
        })
    </script>
</body>
</html>
```

### 根据以上例子我们来解读vuex的规则
* state

state是vuex的公共状态，我们可以把它看作所有组件的data，取值是this.$store.state.count

* mutations

可以理解为所有组件的methods属性，mutations对象中保存着更改数据的回调函数,第一个参数是state, 第二参数是payload, 也就是自定义的参数。传值： this.$store.commit('changeName', '哥哥')

* actions

actions类似于mutations，不同在于actions提交的是mutations，而不是直接改变其状态；actions可以包含异步操作；actions中回调函数的第一个参数是context,是一个与store实例具有相同属性和方法的对象。传值：this.$store.dispatch('incrementAction', 500)

* getters

可以理解为所有组件的computed属性，getters的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。取值：this.$store.getters.username
