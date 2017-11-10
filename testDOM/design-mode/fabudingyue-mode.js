/**
 * Created by Administrator on 2017/8/1.
 */
window.onload = function () {
//    初级原始模式
    var NationalBaseMode = function () {
        var salesOffices = {};
        salesOffices.clientList = [];
        salesOffices.listen = function (fn) {
            this.clientList.push(fn);
        };
        salesOffices.trigger = function () {
            console.log(this.clientList);
            for (var i = 0, fn; fn = this.clientList[i++];) {
                fn.apply(this, arguments);
                console.log(arguments);
            }
        };

        salesOffices.listen(function (price, squareMeter, name) { // 小明订阅消息
            console.log('价格= ' + price);
            console.log('squareMeter= ' + squareMeter);
            console.log('发布给= ' + name);
        });
        //salesOffices.listen(function (price, squareMeter, name) { // 小红订阅消息
        //    console.log('价格= ' + price);
        //    console.log('squareMeter= ' + squareMeter);
        //    console.log('发布给= ' + name);
        //});

        salesOffices.trigger(20, 80, "小明");
        salesOffices.trigger(30, 100, "小红");
    }

//    改写版本1
    var UpdateVersion1 = function () {
        var salesOffices = {};
        salesOffices.clientList = {};
        salesOffices.listen = function (key, fn) {
            if (!this.clientList[key]) {
                this.clientList[key] = [];
            }
            this.clientList[key].push(fn);
        };
        salesOffices.trigger = function () {
            var key = Array.prototype.shift.call(arguments),
                fns = this.clientList[key];
            if (!fns || fns.length === 0) {
                return false;
            }
            for (var i = 0, fn; fn = fns[i++];) {
                fn.apply(this, arguments);
            }
        };
        salesOffices.listen('squareMeter88', function (price) { // 小明订阅 88 平方米房子的消息
            console.log('价格= ' + price); // 输出： 2000000
        });
        salesOffices.listen('squareMeter88', function (price) { // 小明订阅 88 平方米房子的消息
            console.log('大小= ' + parseInt(price / 18000)); // 输出： 2000000
        });
        salesOffices.listen('squareMeter110', function (price) { // 小红订阅 110 平方米房子的消息
            console.log('价格= ' + price); // 输出： 3000000
        });
        salesOffices.trigger('squareMeter88', 2000000); // 发布 88 平方米房子的价格
        salesOffices.trigger('squareMeter110', 3000000); // 发布 110 平方米房子的价格
    }
//    提取核心功能后的函数
    var UpdateVersion2 = function () {
        var event = {
            clientList: [],
            listen: function (key, fn) {
                if (!this.clientList[key]) {
                    this.clientList[key] = [];
                }
                this.clientList[key].push(fn);
            },
            trigger: function () {
                var key = Array.prototype.shift.call(arguments);
                var fns = this.clientList[key];

                if (!fns || fns.length === 0) {
                    return false;
                }
                for (var i = 0, fn; fn = fns[i++];) {
                    fn.apply(this, arguments);
                }
            }
        };
        var installEvent = function (obj) {
            for (var i in event) {
                obj[i] = event[i];
            }
        };

        var salesOffices = {};
        installEvent(salesOffices);
        salesOffices.listen('squareMeter88', function (price) { // 小明订阅消息
            console.log('价格= ' + price);
        });
        salesOffices.listen('squareMeter100', function (price) { // 小红订阅消息
            console.log('价格= ' + price);
        });
        salesOffices.trigger('squareMeter88', 2000000); // 输出：2000000
        salesOffices.trigger('squareMeter100', 3000000); // 输出：3000000
    }
//    应用实例，监听登录完成后运行每个函数
    var NewLoginFun = function () {
        var event = {
            clientList: [],
            listen: function (key, fn) {
                if (!this.clientList[key]) {
                    this.clientList[key] = [];
                }
                this.clientList[key].push(fn);
            },
            trigger: function () {
                var key = Array.prototype.shift.call(arguments);
                var fns = this.clientList[key];

                if (!fns || fns.length === 0) {
                    return false;
                }
                for (var i = 0, fn; fn = fns[i++];) {
                    fn.apply(this, arguments);
                }
            }
        };
        var installEvent = function (obj) {
            for (var i in event) {
                obj[i] = event[i];
            }
        };
        //创建Login对象
        var LoginSucc = {};
        //为Login对象安装发布订阅模式
        installEvent(LoginSucc);
        //添加方法
        var header = (function () { // header 模块
            LoginSucc.listen('loginSucc', function (data) {
                header.setAvatar(data);
            });
            return {
                setAvatar: function (data) {
                    console.log('设置 header 模块的头像');
                }
            }
        })();
        var nav = (function () { // nav 模块
            LoginSucc.listen('loginSucc', function (data) {
                nav.setAvatar(data);
            });
            return {
                setAvatar: function (avatar) {
                    console.log('设置 nav 模块的头像');
                }
            }
        })();
        //登录成功后依次调用Login对象的方法
        //$.ajax( 'http:// xxx.com?login', function(data){ // 登录成功
        //    LoginSucc.trigger( 'loginSucc', data); // 发布登录成功的消息
        //});
        LoginSucc.trigger('loginSucc', 1000); // 发布登录成功的消息
    }
//    面向对象方式改写登录实例
    var UpdateVersion3= function () {
        //common函数
        var LoginListener = function () {
            this.clientList = [];
        };
        LoginListener.prototype = {
            constructor: LoginListener,

            listen: function (key, fn) {
                if (!this.clientList[key]) {
                    this.clientList[key] = [];
                }
                this.clientList[key].push(fn);
            },

            trigger: function () {
                var key = Array.prototype.shift.call(arguments);
                var fns = this.clientList[key];

                if (!fns || fns.length === 0) {
                    return false;
                }
                for (var i = 0, fn; fn = fns[i++];) {
                    fn.apply(this, arguments);
                }
            }
        };
        //创建登录实例
        var LoginSucc = new LoginListener();
        //为实例添加自己的方法
        LoginSucc.setHeader= function (data) {
            console.log("SetHeader "+data);
        };
        LoginSucc.setCon= function (data) {
            console.log("SetCon "+data);
        };
        //添加方法的发布订阅模式
        LoginSucc.listen('loginSucc', LoginSucc.setHeader);
        LoginSucc.listen('loginSucc', LoginSucc.setCon);
        // 发布登录成功的消息
        LoginSucc.trigger('loginSucc', 1000);
        //$.ajax( 'http:// xxx.com?login', function(data){ // 登录成功
        //    LoginSucc.trigger('loginSucc', data);
        //});
    }
}