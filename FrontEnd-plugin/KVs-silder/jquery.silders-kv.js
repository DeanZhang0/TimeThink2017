/**
 * Created by Dean on 2017/6/16.
 */
/*
*加载方法
 * 1、引入jQuery
 * 2、引入本插件和CSS
 * 3、HTML规范
 <div class="kv-silder">
     <ul class="kv-imgs">
         <li><a href="#"><img src="./img/1.jpg" alt=""></a></li>
         <li><a href="#"><img src="./img/2.jpg" alt=""></a></li>
         <li><a href="#"><img src="./img/3.jpg" alt=""></a></li>
         <li><a href="#"><img src="./img/4.jpg" alt=""></a></li>
         <li><a href="#"><img src="./img/5.jpg" alt=""></a></li>
         <li><a href="#"><img src="./img/6.jpg" alt=""></a></li>
     </ul>
 </div>
* 4、$(".kv-silder").kvSilder();
* */
;(function ($) {
    var defaults = {
        btnEvent: "click",
        bottomEvent: "mouseover"
    }
    $.fn.kvSilder = function (options) {

        var option = $.extend(defaults, options);

        return this.each(function () {
            var _this = $(this);
            var size = _this.find(".kv-imgs>li").length;

            var bottomBtn = '<ul class="kv-num"></ul>\
                <div class="kv-left kv-btn"><</div>\
                <div class="kv-right kv-btn">></div>'

            _this.append(bottomBtn);

            for (var i = 1; i <= size; i++) {	//创建图片个数相对应的底部数字个数
                var li = "<li>" + i + "</li>";	//创建li标签，并插入到页面中
                _this.find(".kv-num").append(li);
            }

            //手动控制轮播图
            _this.find(".kv-imgs>li").eq(0).show();
            _this.find(".kv-num>li").eq(0).addClass("active");
            _this.find(".kv-num>li").on(option.bottomEvent, function () {
                $(this).addClass("active").siblings().removeClass("active");
                var index = $(this).index();
                currentNum = index;//鼠标移开时从当前开始移动
                _this.find(".kv-imgs>li").eq(index).stop().fadeIn(300).siblings().stop().fadeOut(300);
            });

            //自动控制轮播图
            var currentNum = 0;
            var t = setInterval(moveRight, 1500);

            //左按钮点击事件
            _this.find(".kv-left").on(option.btnEvent, function () {
                moveLeft();
            });

            //右按钮点击事件
            _this.find(".kv-right").on(option.btnEvent, function () {
                moveRight();
            });

            //向右
            function moveRight() {
                currentNum++;
                if (currentNum == size) {
                    currentNum = 0;
                }
                _this.find(".kv-num>li").eq(currentNum).addClass("active").siblings().removeClass("active");
                _this.find(".kv-imgs>li").eq(currentNum).stop().fadeIn(300).siblings().stop().fadeOut(300);
            };
            //向左
            function moveLeft() {
                currentNum--;
                if (currentNum == -1) {
                    currentNum = size - 1;
                }
                _this.find(".kv-num>li").eq(currentNum).addClass("active").siblings().removeClass("active");
                _this.find(".kv-imgs>li").eq(currentNum).stop().fadeIn(300).siblings().stop().fadeOut(300);
            }

            //定时器开始、结束
            _this.hover(function () {
                clearInterval(t);
            }, function () {
                t = setInterval(moveRight, 1500);
            })
        });
    }
})(jQuery);