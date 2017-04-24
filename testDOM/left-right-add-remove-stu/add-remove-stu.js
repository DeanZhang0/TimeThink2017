/**
 * Created by Dean on 2017/2/24.
 */
var SelectStuArray = new Array;
var ChooseStu = function(view) {
    this.view = view;
    this.mainView = this.view.find("[sid=create-pop-main]");
    this.mainLeftView = this.mainView.find("[sid=mian-con-left]");
    this.mainRightView = this.mainView.find("[sid=mian-con-right]");
    this.searchBtnView = this.mainLeftView.find("[sid=search-stu-button]");
    this.data = [{ "name": "张毅", "id": 1, "flag": 1 }, { "name": "张阿斯达", "id": 2, "flag": 2 }, {
        "name": "斯达",
        "id": 3,
        "flag": 3
    }, { "name": "大家快乐", "id": 4, "flag": 1 }, { "name": "你划局", "id": 5, "flag": 2 }, { "name": "胜多负少", "id": 6, "flag": 3 }];

    this.init();
};
ChooseStu.prototype = {
    constructor: ChooseStu,
    init: function() {
        this.stuLeftListView = this.mainLeftView.find("[sid=unselect-stu-detail-info]");
        this.stuRightListView = this.mainRightView.find("[sid=select-stu-detail-info]");

        for (var i = 0; i < this.data.length; i++) {
            var AppendStu = new AddStuItem(this, this.data[i]);
        }
        this.setStuNum();
        this.searchBtnView.on("click", this, this.searchFun);
    },
    setStuNum: function() {
        var selectStuNum = this.stuRightListView.find("div").length;
        var unselectStuNum = this.stuLeftListView.find("div").length - selectStuNum;

        this.mainLeftView.find("[sid=unselect-num-stu]").text(unselectStuNum);
        this.mainRightView.find("[sid=select-num-stu]").text(selectStuNum);
    },
    searchFun: function(e) {
        var self = e.data;
        var thisPerson = self.mainView.find("[sid=select-stu-name]").val().trim();
        if (thisPerson != " ") {
            self.stuLeftListView.find(".stu-item").addClass("dn");
            self.stuLeftListView.find(".item-name").each(function() {
                var Name = $(this).text();
                if (Name.indexOf(thisPerson) != -1) {
                    $(this).parent().removeClass("dn");
                }
            });
        } else {
            self.stuLeftListView.find(".stu-item").removeClass("dn");
        }
    }
};

var AddStuItem = function(preObj, flag) {
    this.preObj = preObj;
    this.data = flag;
    this.isCheck = false;
    this.init();
};
AddStuItem.prototype = {
    constructor: AddStuItem,
    init: function() {
        this.template = $(AddStuItem.template);
        this.template.find("[sid=item-name]").text(this.data.name);
        this.template.on("click", this, this.leftClickFun);
        this.preObj.stuLeftListView.append(this.template);
    },
    leftClickFun: function(e) {
        var self = e.data;
        if (!self.isCheck) {
            self.template.find("[sid=item-check]").addClass("active");
            self.templateRight = self.template.clone();
            self.templateRight.on("click", self, self.rightDelFun);
            self.preObj.stuRightListView.append(self.templateRight);
            self.isCheck = !self.isCheck;
            SelectStuArray.push(self.data);
            console.log(SelectStuArray);
        };
        self.preObj.setStuNum();
    },
    rightDelFun: function(e) {
        var self = e.data;
        var indexNum = self.templateRight.index();
        SelectStuArray.splice(indexNum, 1);
        self.templateRight.remove();
        self.isCheck = !self.isCheck;
        self.template.find("[sid=item-check]").removeClass("active");
        self.preObj.setStuNum();
        console.log(SelectStuArray);
    }
};
AddStuItem.template = '<div class="stu-item clear-fix">\
    <span class="item-check l" sid="item-check"></span>\
    <span class="item-name r" sid="item-name">1111</span>\
    </div>';
