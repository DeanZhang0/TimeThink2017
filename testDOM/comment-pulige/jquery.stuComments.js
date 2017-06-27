/**
 * Created by Dean on 2017/6/17.
 */
;
(function ($) {
    var defaults = {
        id: "",
        pageNo: 1,
        pageSize: 10,
        URL: "http://live.fuzhuxian.com:83/api/v1/queryComment"
    };

    $.fn.stuComments = function (options) {

        var option = $.extend(defaults, options);

        var dataTest = {
            "msg": {
                "status": 0,
                "message": "查询成功！"
            },
            "list": [
                {
                    "id": 130,
                    "liveListId": "b26dac97fa154436bf9d41f87d0625d3",
                    "userName": "2179",
                    "nickName": "白龙",
                    "createTime": "2017-05-23 09:52:35",
                    "commentContent": "我考",
                    "userHead": null
                },
                {
                    "id": 131,
                    "liveListId": "b26dac97fa154436bf9d41f87d0625d3",
                    "userName": "2179",
                    "nickName": "白龙",
                    "createTime": "2017-05-23 09:52:48",
                    "commentContent": "我看看",
                    "userHead": null
                },
                {
                    "id": 132,
                    "liveListId": "b26dac97fa154436bf9d41f87d0625d3",
                    "userName": "2179",
                    "nickName": "白龙",
                    "createTime": "2017-05-23 10:04:35",
                    "commentContent": "[尴尬][尴尬]",
                    "userHead": null
                },
                {
                    "id": 133,
                    "liveListId": "b26dac97fa154436bf9d41f87d0625d3",
                    "userName": "2179",
                    "nickName": "白龙",
                    "createTime": "2017-05-23 10:08:04",
                    "commentContent": "啦啦啦",
                    "userHead": null
                },
                {
                    "id": 134,
                    "liveListId": "b26dac97fa154436bf9d41f87d0625d3",
                    "userName": "2179",
                    "nickName": "白龙",
                    "createTime": "2017-05-23 10:08:35",
                    "commentContent": "我考",
                    "userHead": null
                },
                {
                    "id": 136,
                    "liveListId": "b26dac97fa154436bf9d41f87d0625d3",
                    "userName": "2187",
                    "nickName": "测试1",
                    "createTime": "2017-05-31 11:39:23",
                    "commentContent": "具体",
                    "userHead": "http://wx.qlogo.cn/mmopen/wJibWkqN1bUOJuCeA4kCBohXURU7b9PicwPhtCEW2cbWDGfIGbcXtHTcMsjpsTwFjxObhJ8eicUoaRMjneOR0EX65wXEbLibiaZibu/0"
                },
                {
                    "id": 137,
                    "liveListId": "b26dac97fa154436bf9d41f87d0625d3",
                    "userName": "2187",
                    "nickName": "测试1",
                    "createTime": "2017-05-31 11:39:32",
                    "commentContent": "兔兔",
                    "userHead": "http://wx.qlogo.cn/mmopen/wJibWkqN1bUOJuCeA4kCBohXURU7b9PicwPhtCEW2cbWDGfIGbcXtHTcMsjpsTwFjxObhJ8eicUoaRMjneOR0EX65wXEbLibiaZibu/0"
                },
                {
                    "id": 138,
                    "liveListId": "b26dac97fa154436bf9d41f87d0625d3",
                    "userName": "2149",
                    "nickName": "lucky",
                    "createTime": "2017-05-31 11:41:04",
                    "commentContent": "噢噢",
                    "userHead": "http://zhibo100.oss-cn-hangzhou.aliyuncs.com/Android/photo/2149head_image.png"
                },
                {
                    "id": 139,
                    "liveListId": "b26dac97fa154436bf9d41f87d0625d3",
                    "userName": "2149",
                    "nickName": "lucky",
                    "createTime": "2017-05-31 11:41:32",
                    "commentContent": "QQ",
                    "userHead": "http://zhibo100.oss-cn-hangzhou.aliyuncs.com/Android/photo/2149head_image.png"
                }
            ],
            "totalCount": 9,
            "totalPage": 1
        }
        return this.each(function () {
            var _this = this;

            var CommentsTempalte = '<div class="comments-cont" sid="comments-cont"></div>\
                <div class="page-div"></div>';
            $(_this).append($(CommentsTempalte));

            function getCommentsData() {
                var sendData = {
                    id: option.id,
                    pageNo: option.pageNo,
                    pageSize: option.pageSize
                }
                console.log(sendData);
                $.ajax({
                    type: "POST",
                    url: option.URL,
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    data: sendData,
                    crossDomain: true,
                    success: function (data) {
                        console.log(data);
                        if (data.status == -1) {
                            alert("获取用户信息失败");
                        } else if (dataTest.msg.status == 0) {
                            commentsCallBack(true, data);
                        }
                    },
                    error: function (data) {
                        alert("数据库无法获取用户信息");
                        commentsCallBack(false, data);
                    }
                })
            }


            function commentsCallBack(flag, data) {
                if (flag) {
                    if (data.list.length !== 0) {
                        for (var index in data.list) {
                            var commentsView = $(CommentsListTempalte);
                            commentsView.find("[sid=userPhoto]").attr("src", data.list[index].userHead);
                            commentsView.find("[sid=name]").text(data.list[index].nickName);
                            commentsView.find("[sid=time]").text(data.list[index].createTime);
                            commentsView.find("[sid=detail-comments-cont]").text(data.list[index].commentContent);
                            $(_this).find("[sid=comments-cont]").append(commentsView);
                        }
                        //加载分页插件，只加载一次
                        if ($(".page-div").children().length == 0) {
                            new Page($('.page-div'), {
                                totalPages: data.totalPage,
                                current: 1,
                                prev: '',
                                next: '',
                                hasFirst: true,
                                hasLast: true,
                                first: '',
                                last: '',
                                hasJump: true,
                                jump: '跳转',
                                hasCount: true,
                                count: data.totalCount,
                                backFn: function (nextPage) {
                                    option.pageNo = nextPage;
                                    getCommentsData();
                                }
                            });
                        }
                    } else {

                        $(_this).find("[sid=comments-cont]").append("本课程没有评论！");
                    }
                } else {
                    $(_this).find("[sid=comments-cont]").append("无法加载评论！");
                }
            }

            var CommentsListTempalte = '<div class="detail-comments">\
                <ul class="detail-comments-img">\
                <li><img sid="userPhoto" src="touxiang.png"></li>\
                </ul>\
                <ul class="detail-comments-info">\
                <li class="detail-comments-name-time">\
                <span class="name" sid="name"></span>\
                <span class="time" sid="time"></span>\
            </li>\
            <li class="detail-comments-cont" sid="detail-comments-cont"></li>\
            </ul>\
            </div>';
            getCommentsData();
        });
    }
})(jQuery)
