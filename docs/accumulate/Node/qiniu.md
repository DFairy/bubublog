# express上传图片到七牛云
实现思路：后端写接口给前端获得token，前端获得凭证后将图片上传到七牛云，并获得返回的图片url地址。

## 注册并创建空间
1. [注册地址](https://portal.qiniu.com/signup?code=3layyygwwtrv6)

2. 注册完成之后认证
3. 创建对象存储空间,找到`对象存储`，点击`新建存储空间`，按照上面的操作完成就可以了。

## 后端生成uptoken
[参考文档](https://developer.qiniu.com/kodo/sdk/1289/nodejs)
下面只是express的部分代码

1. 在七牛云中找到以下几个信息
点击[这里](https://portal.qiniu.com/user/key)找到 Access Key 和 Secret Key

2. 安装qiniu,express

3. 新建`config.js`,文件内容如下：
```js
//config.js
 
const qiniu = require('qiniu')
// 创建上传凭证
const accessKey = ''    //accessKey 
const secretKey = ''    //secretKey 
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
    scope: '',         //对象存储空间名字
    expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)
module.exports = {
    uploadToken
}
```
4. 写接口生成token
```js
//upload.js
 
const qnconfig = require('./config.js')
var express = require('express');
var app =new express();
  
app.get('/', (req, res, next) => {
    const token = qnconfig.uploadToken
    res.send({
        status: 1,
        message: '上传凭证获取成功',
        upToken: token,
    })
})

app.listen(3000)
```

## 前端获得凭证并且上传图片
下面用的elemnt的upload组件

`domain`是根据创建存储空间选择的地区来填的，[参考文档](https://developer.qiniu.com/kodo/manual/1671/region-endpoint)

前端调用，参考下面的代码，要引用axios，设置全局变量
```js
<template>
  <!-- upload -->
  <div class="upload">
    <el-upload
      class="avatar-uploader"
      :action= domain
      :http-request = upqiniu
      :show-file-list="false">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imageUrl: '',
      token: {},
      //这是根据你创建空间时所选择的地区
      domain: 'https://up.qiniup.com',
      // 这是七牛云空间的外链默认域名
      qiniuaddr: ''
    }
  },
  methods: {
    // 上传文件到七牛云
    upqiniu (req) {
      console.log(req)
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = 'dfairy' + Date.parse(new Date()) + Math.floor(Math.random() * 100) + '.' + filetype
      // 从后端获取上传凭证token
      this.axios.get('/api/upload').then(res => {
        console.log(res)
        const formdata = new FormData()
        formdata.append('file', req.file)
        formdata.append('token', res.data.upToken)
        formdata.append('key', keyname)
        // 获取到凭证之后再将文件上传到七牛云空间
        this.axios.post(this.domain, formdata, config).then(res => {
          this.imageUrl = 'http://' + this.qiniuaddr + '/' + res.data.key
          // console.log(this.imageUrl)
        })
      })
    }
  }
}
</script>
```
