/**
 * Created by Dean
 */
var GlobalTips = function () {
    //二级提示框
    //GlobalTips.info(status,"内容")：status（true/false）,创建成功和失败的弱提示。
    //一级提示框
    //GlobalTips.tips:不带选择操作的提示框（"title","内容"）
    //GlobalTips.tips:带选择操作的提示框（"title","内容",点击确定执行方法,传入方法的作用域（可不传入,默认window））
};
//二级提示框
GlobalTips.info = function (status, textinfo) {
    var $info = $(GlobalTips.infoView);
    $info.find("[data-tips=tips_info_text]").text(textinfo);
    if (status) {
        $info.find("[data-tips=tips_info_text]").addClass("succ");
    } else {
        $info.find("[data-tips=tips_info_text]").addClass("fail");
    }
    $("body").append($info);
    setTimeout(function () {
        GlobalTips.hideTips();
    }, 2000);
}
//一级提示框
GlobalTips.tips = function (title, textinfo, listenerFun, listener) {
    var listenerFun = $.isFunction(listenerFun) ? listenerFun : function () {
        console.log("未传入确定需要操作的方法！");
    };
    var listener = listener ? listener : window;
    var $tips = $(GlobalTips.tipsView);
    $tips.find("[data-tips=tips_title_text]").text(title);
    $tips.find("[data-tips=tips_info]").text(textinfo);

    if (arguments.length > 2) {
        $tips.find("[data-tips=tips_confirm]").on("click", function () {
            listenerFun.call(listener, true);
            GlobalTips.removeTips();
        });
        $tips.find("[data-tips=tips_cancel]").on("click", function () {
            GlobalTips.removeTips();
        });
    } else {
        $tips.find("[data-tips=tips_button]").hide();
    }

    $tips.find("[data-tips=tips_title_close]").on("click", function () {
        GlobalTips.removeTips();
    });

    $("body").append($tips);
};
GlobalTips.removeTips = function () {
    $("body").find(".tips_content").remove();
}
GlobalTips.hideTips = function () {
    $("body").find(".tips_content").hide("slow", GlobalTips.removeTips);
}
GlobalTips.tipsView = '<div class="tips_content">\
                            <div class="tips_cover"></div>\
                            <div class="tips_con">\
                                <div class="tips_title"><span data-tips="tips_title_text"></span><span data-tips="tips_title_close" class="tips_title_close">x</span></div>\
                                <div class="tips_body">\
                                    <div data-tips="tips_info" class="tips_info">是否选择！</div>\
                                    <div data-tips="tips_button" class="tips_button">\
                                        <span data-tips="tips_confirm">确定</span>\
                                        <span data-tips="tips_cancel">取消</span>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>';
GlobalTips.infoView = '<div class="tips_content">\
                            <div class="tips_cover"></div>\
                            <div class="tips_info">\
                            <span data-tips="tips_info_text" class="tips_info_text"></span>\
                            </div>\
                     </div>';

var GlobalLoading = function (select, textinfo) {
    //模块loading加载
    //select:选择器,textinfo:显示文字
    this.parentView = $(select);
    this.textInfo = textinfo;
    this.loadingView = $(GlobalLoading.view);
    this.textPlace = this.loadingView.find("[data-loading=text]");
};

GlobalLoading.prototype.show = function () {
    if (this.textInfo) {
        this.textPlace.text(this.textInfo)
    }
    ;
    this.parentView.append(this.loadingView);
};
GlobalLoading.prototype.remove = function () {
    this.parentView.find(".loading_content").remove();
};
GlobalLoading.view = '<div class="loading_content">\
                        <div class="loading_cover"></div>\
                        <div class="loading_info">\
                            <img src="loading.gif">\
                            <p data-loading="text">正在加载.....</p>\
                        </div>\
                    </div>';