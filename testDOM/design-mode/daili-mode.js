/**
 * Created by Administrator on 2017/8/1.
 */
window.onload = function () {
//    图片预加载代码
    var Prepar_img = function () {
        //图片加载的函数
        var myImage = (function () {
            var imgNode = document.createElement('img');
            document.body.appendChild(imgNode);

            return function (src) {
                imgNode.src = src;
            }
        })();
        //代理函数
        var proxyImage = (function () {
            var img = new Image;
            img.onload = function () {
                myImage(this.src);
            }

            return function (src) {
                myImage("加载真正图片之前的图片地址");
                img.src = src;
            }
        })();
        proxyImage("真正的图片地址")
    };
//    收集信息后 固定时间之后一起发送信息
    var Collect_send = function () {
        var synchronousFile = function (id) {
            console.log("开始同步ID：" + id)
        };
        var proxySynachronourFile = (function () {
            var cacheId = [],
                timer;

            return function (id) {
                cacheId.push(id);
                if (timer) {
                    return
                }
                timer = setTimeout(function () {
                    synchronousFile(cacheId.join(','));
                    clearTimeout(timer);
                    timer = null;
                    cacheId.length = 0;
                }, 2000);
            }
        })();
        var checkbox = document.getElementsByTagName('input');
        for (var i = 0, c; c = checkbox[i++];) {
            c.onclick = function () {
                if (this.checked === true) {
                    proxySynachronourFile(this.id);
                }
            }
        }
    }
//    缓存代理函数
    var Cache_mode = function () {
        var mult = function () {
            var a = 1;
            for (var i = 0, l = arguments.length; i < l; i++) {
                a = a * arguments[i];
            }
            return a;
        }

        var plus = function () {
            var a = 0;
            for (var i = 0, l = arguments.length; i < l; i++) {
                a = a + arguments[i];
            }
            return a;
        }

        var createProxyFactory = function (fn) {
            var cache = {};
            return function () {
                var args = Array.prototype.join.call(arguments, ',');
                if (args in cache) {
                    return cache[args];
                }
                return cache[args] = fn.apply(this, arguments);
            }
        };
        var proxyMult = createProxyFactory(mult);
        var proxyPlus = createProxyFactory(plus);

        console.log(proxyMult(1, 2, 3, 4));
        console.log(proxyMult(1, 2, 3, 4));
        console.log(proxyPlus(1, 2, 3, 4));
        console.log(proxyPlus(1, 2, 3, 4));
    }
}