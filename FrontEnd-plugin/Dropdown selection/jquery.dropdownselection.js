/**
 * Created by Dean on 2017/9/7.
 * 插件模式
 * 使用方法：$("#testdropdown").dropDownSelection({
                data:data,
                listener:this,
                listenFun:this.getDate,
                showName: "eachName"
            })
 * 使用说明：html部分：<div id="testdropdown"></div>
 *JS部分配置：
 * 1、data:需传入数据，数据必须为数组
 * 2、listener：上下文关系，默认为window
 * 3、listenFun：点击某条li执行的方法，该方法传入点击li的原始数据
 * 4、showName：面板需要展示的内容，需要把该数据的属性传入
 * 5、数据实例：[{
            "id": 590,
            "eachName": "默认数据",
            "levelName": "1",
            "studentCount": null,
            "grade": 2,
            "teacherName": null,
            "levelId": 1
        },...,...,...]
 */
;
(function ($) {
    var defaults = {
        //默认配置
        data: [{
            "id": 590,
            "eachName": "默认数据",
            "levelName": "1",
            "studentCount": null,
            "grade": 2,
            "teacherName": null,
            "levelId": 1
        }],
        listener: window,
        listenFun: function (currentData) {
            console.log("需要加入返回方法，方法传入值为：", currentData);
        },
        showName: "eachName"
    }
    $.fn.dropDownSelection = function (options) {
        var option = $.extend(defaults, options);

        return this.each(function () {
            var mainView = $(this);
            var dropDownSelection = function (mainView, data, listener, listenFun, showName) {
                this.parentView = mainView;
                this.data = data;
                this.func = listenFun;
                this.listener = listener;
                this.showName = showName;
                this.init();
            };
            dropDownSelection.prototype.init = function () {
                this.mainView = $(dropDownSelection.mainView);
                this.appendEachSelection();
                this.mainView.find("[data-selection=selection]").off("click").on("click", this, this.showDetailSelection);
                this.parentView.append(this.mainView);
            };
            dropDownSelection.prototype.appendEachSelection = function () {
                var currentData = this.data.data;
                if (currentData.length !== 0) {
                    for (index in currentData) {
                        var currentView = $(dropDownSelection.eachView);
                        currentView.text(currentData[index][this.showName]);
                        currentView.off("click").on("click", {
                            eachData: currentData[index],
                            parentObj: this
                        }, this.eachClickFun);
                        this.mainView.find("[data-selection=detailSelection]").append(currentView);
                    }
                }else{
                    console.log("传入数据为空。")
                }
            };
            dropDownSelection.prototype.eachClickFun = function (e) {
                var that = e.data.parentObj;
                var eachData = e.data.eachData;
                that.mainView.find("[data-selection=detailSelection]").hide();
                that.mainView.find("[data-selection=selection]").text(eachData[that.showName]);
                that.func.call(that.listener, eachData);
            };
            dropDownSelection.prototype.showDetailSelection = function (e) {
                var that = e.data;
                that.mainView.find("[data-selection=detailSelection]").toggle();
            };

            dropDownSelection.mainView = '<div class="dropdownSelection">\
                                <p data-selection="selection"><span>--请选择--</span></p>\
                                <ul data-selection="detailSelection">\
                                </ul>\
                              </div>';

            dropDownSelection.eachView = '<li data-selection="each-selection"></li>';

            new dropDownSelection(mainView, option.data, option.listener, option.listenFun, option.showName)
        });
    }
})(jQuery)