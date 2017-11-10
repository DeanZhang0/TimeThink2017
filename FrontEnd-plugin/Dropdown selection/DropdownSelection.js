/**
 * Created by Dean on 2017/9/6.
 */
//面向对象方法，使用时需要new出实例化对象
//html  <div id="testdropdown" class="testdropdown"></div>
//new dropDownSelection(".testdropdown", data, this, this.getDate);
//需改变需要展示的名称 currentData[index].className

var dropDownSelection = function (view, data, listener, listenFun) {
    this.parentView = $(view);
    this.data = data;
    this.func = listenFun;
    this.listener = listener;
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
            currentView.text(currentData[index].className);
            currentView.off("click").on("click", {eachData: currentData[index], parentObj: this}, this.eachClickFun);
            this.mainView.find("[data-selection=detailSelection]").append(currentView);
        }
    }
};
dropDownSelection.prototype.eachClickFun = function (e) {
    var that = e.data.parentObj;
    var eachData = e.data.eachData;
    that.mainView.find("[data-selection=detailSelection]").hide();
    that.mainView.find("[data-selection=selection]").text(eachData.className);
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