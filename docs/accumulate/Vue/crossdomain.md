# 跨域
配置devserver
```js
devServer:{
    pert:8080,
    progress:true,//显示打包的进度条
    contentBase:distPath,//根目录
    open:true,//自动打开浏览器
    compress:true,//启动gzip打包
    //设置代理
    proxy:{
        '/api':'htttp://localhost:3000'//将本地/api/xxx代理到localhost:3000/api/xxx

        'api2':{//将本地、api/xxx代理到localhost:3000/xxx
            target:'http://localhost:3000',
            pathRewrite:{
                'api2'：''
            }
        }
    }
}
```