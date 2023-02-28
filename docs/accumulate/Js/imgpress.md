# 图片压缩

代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片压缩</title>
</head>
<body>
  <input type="file" id='upload'>
  <script>
      const ACCEPT = ['image/jpg', 'image/png', 'image/jpeg']; // 限定图片文件类型
      const MAXSIZE = 1024 * 1024 ; // 限定图片最大容量
      const MAXSIZE_STR = '1MB';


       //将图片转成base64类型
       function convertImageToBase64(file, callback) {
           let reader=new FileReader()
           reader.addEventListener('load',(e)=>{
            const base64Image = e.target.result;// 获取文件内容，等同于 reader.result
            callback && callback(base64Image)
            reader = null;
           })
           reader.readAsDataURL(file)//读取file对象的内容
       }


       //压缩算法
       function compress(base64Image,callback){
            let maxW = 1024;
            let maxH = 1024;
            const image = new Image();
            image.addEventListener('load',()=>{
              
                let ratio; // 压缩比
                let needCompress = false; // 是否需要压缩
                if(maxW<image.naturalWidth){
                    needCompress=true
                    ratio=image.naturalWidth/maxW
                    maxH=image.naturalHeight/ratio
                }
                if(maxH<image.naturalHeight){
                    needCompress=true
                    ratio=image.naturalHeight/maxH
                    maxW=image.naturalWidth/ratio
                }
                if(!needCompress){
                    maxW=image.naturalWidth
                    maxH=image.naturalHeight
                }
                const canvas=document.createElement('canvas')
                canvas.setAttribute('id','__compress__')
                canvas.width=maxW
                canvas.height=maxH
                canvas.style.visibility='hidden'
                document.body.append(canvas)

                const ctx=canvas.getContext('2d')
                ctx.clearRect(0,0,maxW,maxH)
                ctx.drawImage(image,0,0,maxW,maxH)// 渲染图片
                const compressImage=canvas.toDataURL('image/jpeg',0.1)//压缩图片
                callback && callback(compressImage)
                const _image=new Image()
                _image.src=compressImage
                document.body.appendChild(_image)//放到页面上
                canvas.remove(); // 移除 canvas

            })
            image.src = base64Image; // 将图片设置到 image 的 src 属性中
            document.body.appendChild(image);//放在页面中
       }


       //传给服务端
       function uploadToServer(compressImage){
        console.log('upload image to server...', compressImage);
       }

      //监听图片上传
      const upload=document.getElementById('upload')
      upload.addEventListener('change',function(e){
          const [file] =e.target.files
          if(!file){
              return
          }
          const { type: fileType, size: fileSize } = file;
          //图片类型检查
          if(!ACCEPT.includes(fileType)){
              alert('文件不支持' + fileType + '文件！')
              upload.value='';
              return;
          }
          //图片大小检查
          if(fileSize>MAXSIZE){
            alert('文件超出' + MAXSIZE_STR + '！');
            upload.value='';
            return;
          }

          //压缩文件
          convertImageToBase64(file,(base64Image)=>compress(base64Image,uploadToServer))

      })
     
  </script>
</body>
</html>
```