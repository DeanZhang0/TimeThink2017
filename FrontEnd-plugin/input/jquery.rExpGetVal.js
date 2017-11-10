/**
 * Created by Dean on 2017/9/6.
 * data-guide='en': 只允许英文字母
 * data-guide='num': 只允许数字,
 * data-guide='en-num': 允许字母和数字,
 * data-guide='cn': 只允许汉字,
 * data-guide='mobile': 只允许手机号,
 * data-guide='mail': 只允许邮箱,
 * data-guide='base': 允许字母、数字、汉字、@符号
 * JS使用方法
 * var CurrentGuide = $("input").rExpGetVal();
 * 符合规则，返回正确字符
 * 不符合规则，返回false
 * html部分
 * data-guide="en"
 */
;
(function ($) {
    var defaults = {
        JustEn: /[^a-zA-Z]/g,
        JustNum: /\D/g,
        JustEnNum: /[\W]/g,
        JustCn: /[^\u4E00-\u9FA5]/g,
        JustMobile: /^1[34578]\d{9}$/,
        JustMail: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
        BaseMode: /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@]/g
    }
    $.fn.rExpGetVal = function (options) {
        var option = $.extend(defaults, options);

        var _this = $(this);
        var currentVal = _this.val().trim();
        var currentGuide = _this.attr("data-guide");

        var mainFun = function () {
        };

        mainFun.addInfo = function (text) {
            var $infoText = _this.next();
            if ($infoText.hasClass("warnInfo")) {
                $infoText.remove();
            }
            if (text) {
                var infoHtml = "<p class='warnInfo'>" + text + "</p>"
                _this.after(infoHtml)
            }
        }

        mainFun.check = function (guide) {
            switch (guide) {
                case "en":
                    if (!option.JustEn.test(currentVal)) {
                        return currentVal;
                    } else {
                        mainFun.addInfo("只能输入字母");
                        return false
                    }
                    ;
                    break;
                case "num":
                    if (!option.JustNum.test(currentVal)) {
                        return currentVal;
                    } else {
                        mainFun.addInfo("只能输入数字");
                        return false
                    }
                    ;
                    break;
                case "en-num":
                    if (!option.JustEnNum.test(currentVal)) {
                        return currentVal;
                    } else {
                        mainFun.addInfo("只能输入字母和数字");
                        return false
                    }
                    ;
                    break;
                case "cn":
                    if (!option.JustCn.test(currentVal)) {
                        return currentVal;
                    } else {
                        mainFun.addInfo("只能输入汉字");
                        return false
                    }
                    ;
                    break;
                case "mobile":
                    if (option.JustMobile.test(currentVal)) {
                        return currentVal;
                    } else {
                        mainFun.addInfo("只能输入手机号");
                        return false
                    }
                    ;
                    break;
                case "mail":
                    if (option.JustMail.test(currentVal)) {
                        return currentVal;
                    } else {
                        mainFun.addInfo("只能输入邮箱");
                        return false
                    }
                    ;
                    break;
                case "base":
                    if (!option.BaseMode.test(currentVal)) {
                        return currentVal;
                    } else {
                        mainFun.addInfo("只能输入中文、英文、数字、@符号");
                        return false
                    }
                    ;
                    break;
                default :
                    return currentVal;
            }
        };

        if (currentVal.length !== 0) {
            mainFun.addInfo(false);
            var rightVal = mainFun.check(currentGuide);
            return rightVal;
        } else {
            mainFun.addInfo("输入不能为空");
            return false
        }
    }
})(jQuery)