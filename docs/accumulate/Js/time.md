# js操作时间

## 时间戳转化成YMD格式 
```js
    //  获取当前时间戳(毫秒)
    let date = Date.parse(new Date())

    console.log(date);
    /*
        *   timestamp 当前时间戳，毫秒
        *   formats 时间格式，包括：
        *               1. Y-m-d
        *               2. Y-m-d H:i:s
        *               3. Y年m月d日
        *               4. Y年m月d日 H时i分s秒
        */

    dateFormat = (timestamp, formats) => {
        formats = formats || 'Y-m-d';
        let zero = function(value) {
            if (value < 10) {
                return '0' + value;
            }
            return value;
        };
        let myDate = timestamp ? new Date(timestamp) : new Date();
        let year = myDate.getFullYear();//年
        let month = zero(myDate.getMonth() + 1);//月
        let day = zero(myDate.getDate());//日
        let hour = zero(myDate.getHours());//时
        let minite = zero(myDate.getMinutes());//分
        let second = zero(myDate.getSeconds());//秒

        return formats.replace(/Y|m|d|H|i|s/ig, function(matches) {
            return ({
                y: year,
                m: month,
                d: day,
                h: hour,
                i: minite,
                s: second
            })[matches];
        });
    };

    console.log(dateFormat(date, 'y/m/d h:i:s'));

```

## 倒计时
```html
    <div id="time"></div>
    <script type="text/javascript">
        var maxtime = 10 * 60; // 
        function CountDown() {
            if (maxtime >= 0) {
                minutes = Math.floor(maxtime / 60);
                seconds = Math.floor(maxtime % 60);
                msg = "还有" + minutes + "分" + seconds + "秒";
                document.all["time"].innerHTML = msg;
                if (maxtime == 5 * 60) alert("仅剩5分钟");
                --maxtime;
            } else {
                clearInterval(timer);
                alert("时间到!");
            }
        }
    timer = setInterval("CountDown()", 1000);
    </script>
```

## 获取最近一周(月),下一周(月)日期范围
```js
    /*
    * @param dateNow :Date类
    * @param intervalDays ：间隔天数
    * @param bolPastTime  ：Boolean,判断在参数date之前，还是之后，
    */
    getDateRange = (dateNow, intervalDays, bolPastTime) => {
        let oneDayTime = 24 * 60 * 60 * 1000;
        let list = [];
        let lastDay;
        if (bolPastTime === true) {
            lastDay = new Date(dateNow.getTime() - intervalDays * oneDayTime);
            list.push(formateDate(lastDay));
            list.push(formateDate(dateNow));
        } else {
            lastDay = new Date(dateNow.getTime() + intervalDays * oneDayTime);
            list.push(formateDate(dateNow));
            list.push(formateDate(lastDay));
        }
        return list;
    }
    function formateDate (time) {
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        return year + '-' + month + '-' + day + ''
    }

    var date = new Date();
    var list = getDateRange(date, 6, true)
    console.log("获取近一周日期范围：\n开始日期:" + list[0] + ";结束日期:" + list[1]);

    var list = getDateRange(date, 30, true)
    console.log("获取近一个月日期范围：\n开始日期:" + list[0] + ";结束日期:" + list[1]);

    var list = getDateRange(date, 0, true)
    console.log("获取今天日期范围：\n开始日期:" + list[0] + ";结束日期:" + list[1]);

    var list = getDateRange(date, 1, true)
    console.log("获取昨天日期范围：\n开始日期:" + list[0] + ";结束日期:" + list[0]);

    var list = getDateRange(date, 6, false)
    console.log("获取下一周日期范围：\n开始日期:" + list[0] + ";结束日期:" + list[1]);

    var list = getDateRange(date, 30, false)
    console.log("获取下一个月日期范围：\n开始日期:" + list[0] + ";结束日期:" + list[1]);

    /*
    获取近一周日期范围：
    开始日期:2019-12-04;结束日期:2019-12-10

    获取近一个月日期范围：
    开始日期:2019-11-10;结束日期:2019-12-10

    获取今天日期范围：
    开始日期:2019-12-10;结束日期:2019-12-10

    获取昨天日期范围：
    开始日期:2019-12-09;结束日期:2019-12-09

    获取下一周日期范围：
    开始日期:2019-12-10;结束日期:2019-12-16

    获取下一个月日期范围：
    开始日期:2019-12-10;结束日期:2020-01-09
    */

```

## 标准时间转换时间戳
```js
let date = new Date('2020-03-12 18:00:00');

// 有三种方式转化
let time1 = date.getTime();
let time2 = date.valueOf();
let time3 = Date.parse(date);

console.log(time1); 
console.log(time2); 
console.log(time3); 

```

## 倒计时发送验证码

```js
let flag = true;
let timer = null;
let time = 10;
function send() {
    if (!flag) {
        return false;
    }
    flag = false;
    let send = document.getElementById('send');
    timer = setInterval(() => {
        console.log(time);
        time--;
        send.innerText = `${time}s后重新发送`;
        if (time < 0) {
            window.clearInterval(timer);
            send.innerText = `发送验证码`;
            flag = true;
        }
    }, 1000)
}

```
