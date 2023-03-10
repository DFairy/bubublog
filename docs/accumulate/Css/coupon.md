# 优惠券
## 第一种
<voucher-coupon/>
```css
 @mixin coupon($color,$left,$height,$dashed) {
        position: relative;
        width:400px;
        height: $height;
        background-image: 
            radial-gradient(circle at 1px 8px, transparent 6px, $color 6px, $color 0px),
            radial-gradient(circle at 199px 8px, transparent 6px, $color 6px, $color 0px);
        background-size: 200px 18px;
        background-position: 0 0,$left 0;
        background-repeat-x: no-repeat;
        box-sizing: border-box;
        cursor: pointer;
        &::before {
            position: absolute;
            content: "";
            left:$dashed;
            top: 0;
            bottom : 0;
            width: 0;
            border-left: 1px dashed #fff;
        }
  }
  @mixin wave($width,$height) {
        position: relative;
        width: $width;
        height: $height;
        background: linear-gradient(90deg, #945700 0%, #f49714 100%);
        filter: drop-shadow(-7px 4px 3px #333);
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 5px;
        text-shadow: -2px -2px 2px #333;

        &::before,
        &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom :0;
        }

        &::before {
            width: 10px;
            background-image: radial-gradient(circle at -5px 10px, transparent 12px, #fff 13px, #fff 0px);
            background-size: 20px 20px;
            background-position: 0 15px;
        }

        &::after {
            width: 15px;
            background-image: radial-gradient(circle at 15px 10px, #fff 12px, transparent 13px, transparent 0px);
            background-size: 20px 40px;
            background-position: 0 15px;
        }
  }

```
## 第二种  
<voucher-coupon1/>
```css
@mixin hollow-circle-vertical($color,$r,$height,$top) {
    height: $height;
    position: relative;
    background: radial-gradient(circle at right bottom, transparent $r, $color 0) top right / 51% $top no-repeat,
    radial-gradient(circle at left bottom, transparent $r, $color 0) top left / 51% $top no-repeat,
    radial-gradient(circle at right top, transparent $r, $color 0) bottom right / 51% ($height - $top) no-repeat,
    radial-gradient(circle at left top, transparent $r, $color 0) bottom left / 51% ($height - $top) no-repeat;
    &::after {
      content: '';
      width: 100%;
      border: 1px dashed #fff;
      position: absolute;
      left: 0;
      top: $top;
    }
  }
  @mixin hollow-circle-horizontal($color,$r,$width,$left) {
    width: $width;
    position: relative;
    background: radial-gradient(circle at right top, transparent $r, $color 0) top left / $left 51% no-repeat,
    radial-gradient(circle at right bottom, transparent $r, $color 0) bottom left /$left 51% no-repeat,
    radial-gradient(circle at left top, transparent $r, $color 0) top right /($width - $left) 51% no-repeat,
    radial-gradient(circle at left bottom, transparent $r, $color 0) bottom right /($width - $left) 51% no-repeat;
    &::after{
      content:'';
      height:100%;
      border: 1px dashed #fff;
      position: absolute;
      left:$left;
      top:0;
    }
  }
```