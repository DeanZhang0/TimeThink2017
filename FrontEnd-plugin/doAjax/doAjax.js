/**
 * Created by Administrator on 2017/9/6.
 */
//定义全局变量，二次封装ajax
function doAjax(options) {

    if (!options.dataType) {
        options.dataType = 'json';
    }

    if (!options.timeout) {
        options.timeout = 60000;
    }

    if (!options.data) {
        options.data = {};
    }

    options.url = host + options.url;

    var successFun = options.success;
    options.success = function (data) {
        if (data.code == 10001 || data.code == 10008) {
            location.href = '/login.html'
        } else {
            successFun(data);
        }
    };

    var errorFun = options.error;
    options.error = function () {
        errorFun(data);
    };

    options.async = true;

    options.crossDomain = true;

    if (!options.beforeSend) {
        options.beforeSend = function () {
            GlobalLoad.show();
        }
    }

    if (!options.complete) {
        options.complete = function () {
            GlobalLoad.hide();
        }
    }

    $.ajax(options);
}

//调用测试
var TESTURL='/test/'
var TestDoAjax = function () {

};
TestDoAjax.useAjax = function (sendData, listener, listenerFun) {
    doAjax({
        url:TESTURL,
        data:sendData,
        type:'post',
        dataType:'json',
        success: function (data) {

        },
        error: function (data) {

        },
        //beforeSend、complete不配置默认使用全局方法
        beforeSend: function () {

        },
        complete: function () {

        }
    });
};