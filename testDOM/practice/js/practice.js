/**
 * Created by Dean on 2017/9/22.
 * createCard:创建答题卡页面
 * createAnalysisPage:分析页面
 */
//    创建答题卡开始
var createCard = function (view) {
    this.cardView = $(view);
    this.cardtitleView = this.cardView.find("[data-card=cardtitle]");
    this.cardcontrolView = this.cardView.find("[data-card=cardcontrol]");
    this.cardshowView = this.cardView.find("[data-card=cardshow]");
    this.sendButtonView = this.cardView.find("[data-card=release-card]>span")
    this.subjectType = ["single", "multi", "judge"];
    this.answerType = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    this.init();
};
createCard.prototype = {
    constructor: createCard,
    init: function () {
        this.selectSubjectView = this.cardcontrolView.find("[data-card=c-subject]>select");
        this.selectInputView = this.cardcontrolView.find("[data-card=c-select-num]>input");
        this.addAnswerButtonView = this.cardcontrolView.find("[data-card=c-add]>span");
        this.selectAsNumView = this.cardcontrolView.find("[data-card=c-num]>input");
        this.eachSelectNumView = this.cardcontrolView.find("[data-card=c-select-num]>input");
        this.eachPointView = this.cardcontrolView.find("[data-card=c-fraction]>input");
        this.currentSubject = "single";

        this.answerMainView = this.cardshowView.find("[data-card=cs-con]");

        this.totalNumView = this.cardtitleView.find("[data-card=totalnum]>span");
        this.totalPointView = this.cardtitleView.find("[data-card=totalfraction]>.point");

        //绑定选择题型和添加按钮
        this.selectSubjectView.on("change", this, this.selectSubjectFun);
        this.addAnswerButtonView.on("click", this, this.addAnswerFun);
        //绑定发布按钮
        this.sendButtonView.on("click", this, this.releaseFun);
    },
    //选择题目类型
    selectSubjectFun: function (e) {
        var that = e.data;
        var currentValue = that.selectSubjectView.val();
        if (currentValue == "single") {
            that.selectInputView.attr("disabled", true);
            that.selectInputView.attr("value", 4);
            that.selectInputView.val("4");
        } else if (currentValue == "multi") {
            that.selectInputView.removeAttr("disabled");
            that.selectInputView.attr("value", 4);
            that.selectInputView.val("4");
        } else if (currentValue == "judge") {
            that.selectInputView.attr("disabled", true);
            that.selectInputView.attr("value", 2);
            that.selectInputView.val("2");
        } else {
            console.log("未找到匹配项！");
        }
        that.currentSubject = currentValue;
    },
    //点击添加按钮获取当前数据
    addAnswerFun: function (e) {
        var that = e.data;
        var num = that.selectAsNumView.val() ? that.selectAsNumView.val() : 1;
        var eachNum = that.eachSelectNumView.val();
        var point = that.eachPointView.val();
        var subject = that.currentSubject;
        var currentData = {
            num: parseInt(num),
            eachNum: parseInt(eachNum),
            point: parseInt(point),
            subject: subject,
        }
        that.appendAnswerFun(currentData);
        that.changeSeqFun();
    },
    appendAnswerFun: function (data) {
        var currentData = data;
        //判断题目类型，先循环在创建，以后添加模板功能可直接调用创建方法
        if (currentData.subject == this.subjectType[0]) {
            for (var i = 0; i < currentData.num; i++) {
                this.appendSingleAnwer(currentData);
            }
        } else if (currentData.subject == this.subjectType[1]) {
            for (var i = 0; i < currentData.num; i++) {
                this.appendmultiAnwer(currentData);
            }
        } else if (currentData.subject == this.subjectType[2]) {
            for (var i = 0; i < currentData.num; i++) {
                this.appendJudgeAnwer(currentData);
            }
        } else {
            console.log("无法获取题目类型！card.js");
        }
    },
    //插入单选
    appendSingleAnwer: function (data) {
        var currentView = $(createCard.singleTemplate);
        currentView.find("[data-card=cs-t-num]").text(data.eachNum);
        currentView.find("[data-card=cs-t-fraction]").text(data.point);
        for (var i = 0; i < data.eachNum; i++) {
            currentView.find("[data-card=cs-t-answer]").append("<span>" + this.answerType[i] + "</span>");
        }
        currentView.find("[data-card=cs-t-answer]>span").on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
        this.answerMainView.append(currentView);
    },
    //插入多选
    appendmultiAnwer: function (data) {
        var currentView = $(createCard.multiTempate);
        currentView.find("[data-card=cs-t-num]").text(data.eachNum);
        currentView.find("[data-card=cs-t-fraction]").text(data.point);
        for (var i = 0; i < data.eachNum; i++) {
            currentView.find("[data-card=cs-t-answer]").append("<span>" + this.answerType[i] + "</span>");
        }
        currentView.find("[data-card=cs-t-answer]>span").on("click", function () {
            $(this).toggleClass("active");
        });
        this.answerMainView.append(currentView);
    },
    //插入判断
    appendJudgeAnwer: function (data) {
        var currentView = $(createCard.judgeTemplate);
        currentView.find("[data-card=cs-t-num]").text(data.eachNum);
        currentView.find("[data-card=cs-t-fraction]").text(data.point);
        currentView.find("[data-card=cs-t-answer]>span").on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
        this.answerMainView.append(currentView);
    },
//    改变序号方法
    changeSeqFun: function () {
        var that = this;
        var totalF = 0;
        this.answerMainView.children("ul").each(function (index) {
            var currentView = $(this);
            //获取总分数
            totalF += parseInt(currentView.find("[data-card=cs-t-fraction]").text());
            //设置总题数和总分数
            that.totalNumView.text(index + 1);
            that.totalPointView.text(totalF);
            //设置序号
            $(this).find("[data-card=cs-t-seq]").text(index + 1);
            //绑定关闭事件
            $(this).find("[data-card=cs-t-del]>span").off("click").on("click", function () {
                currentView.remove();
                that.changeSeqFun();
            })
        })
    },
//    发布的方法
    releaseFun: function (e) {
        //整合数据
        var that = e.data;
        var mydate = new Date()
        var sendData = {
            teachId: "",
            cardFlag: "card-" + mydate.getFullYear() + (mydate.getMonth() + 1) + mydate.getDate() + mydate.getHours() + mydate.getMinutes(),
            cardDetail: []
        }
        var allAnswer = that.answerMainView.children("ul");
        for (var i = 0; i < allAnswer.length; i++) {
            var answer = $(allAnswer[i]).find("[data-card=cs-t-answer]>span");
            var subject = $(allAnswer[i]).attr("sub-type");
            var answerNum = answer.length;
            var correctAnswer = [];
            //获取正确答案
            for (var t = 0; t < answerNum; t++) {
                if ($(answer[t]).hasClass("active")) {
                    correctAnswer.push(t);
                }
            }
            //拼装数据
            var currentData = {
                num: i,
                subject: subject,//题目类型
                answerNum: answerNum,//选项个数
                correctAnswer: correctAnswer//正确答案
            }
            sendData.cardDetail.push(currentData);
        }
        //   发送数据
        that.sendData(sendData);
    },
//    发送数据并且跳转
    sendData: function (data) {
        console.log(JSON.stringify(data));
    }
};
//单选题模板
createCard.singleTemplate = '<ul sub-type="single" class="single">\
    <li data-card="cs-t-seq" class="cs-t-seq"></li>\
    <li data-card="cs-t-type" class="cs-t-type">单选题</li>\
    <li data-card="cs-t-num" class="cs-t-num"></li>\
    <li data-card="cs-t-answer" class="cs-t-answer">\
    </li>\
    <li data-card="cs-t-fraction" class="cs-t-fraction"></li>\
    <li data-card="cs-t-del" class="cs-t-del">\
    <span><img src="./img/close-2.png" alt="删除该项"/></span>\
    </li>\
    </ul>'
//多选题模板
createCard.multiTempate = '<ul sub-type="multi" class="multi">\
    <li data-card="cs-t-seq" class="cs-t-seq"></li>\
    <li data-card="cs-t-type" class="cs-t-type">多选题</li>\
    <li data-card="cs-t-num" class="cs-t-num"></li>\
    <li data-card="cs-t-answer" class="cs-t-answer">\
    </li>\
    <li data-card="cs-t-fraction" class="cs-t-fraction"></li>\
    <li data-card="cs-t-del" class="cs-t-del">\
    <span><img src="./img/close-2.png" alt="删除该项"/></span>\
    </li>\
    </ul>'
//判断题模板
createCard.judgeTemplate = '<ul sub-type="judge" class="judge">\
    <li data-card="cs-t-seq" class="cs-t-seq"></li>\
    <li data-card="cs-t-type" class="cs-t-type">判断题</li>\
    <li data-card="cs-t-num" class="cs-t-num"></li>\
    <li data-card="cs-t-answer" class="cs-t-answer">\
    <span>√</span>\
    <span>×</span>\
    </li>\
    <li data-card="cs-t-fraction" class="cs-t-fraction"></li>\
    <li data-card="cs-t-del" class="cs-t-del">\
    <span><img src="./img/close-2.png" alt="删除该项"/></span>\
    </li>\
    </ul>'
//创建答题卡结束
//分析页面开始
var createAnalysisPage = function (view) {
    this.mainView = $(view);
    this.topView = this.mainView.find("[data-analy=analysis-top]");
    this.middleView = this.mainView.find("[data-analy=analysis-middle]");
    this.bottomView = this.mainView.find("[data-analy=analysis-bottom]");
    this.answerType = ["A ", "B ", "C ", "D ", "E ", "F ", "G ", "H ", "I "];
    this.judgeType = ["√", "×"];
    this.subjectType = ["单选题", "多选题", "判断题"];
    this.init();
};

createAnalysisPage.prototype = {
    constructor: createAnalysisPage,
    init: function () {
        this.refreshBtnView = this.topView.find("[data-analy=analy-fresh]");
        this.endBtnView = this.topView.find("[data-analy=ending-exam]");
        //绑定刷新按钮
        this.refreshBtnView.off("click").on("click", this, this.getDateFun);
        //绑定结束按钮
        this.endBtnView.off("click").on("click", this, this.endAnswerFun)
        //第一次进入默认点击刷新按钮
        this.refreshBtnView.trigger("click");
    },
    getDateFun: function (e) {
        var that = e.data;
        //在此部分获取数据
        that.data = TestData;
        console.log(that.data);
        that.buildTopFun();
        that.buildMiddleFun();
        that.buildBottomFun();
    },
    //Top部分
    buildTopFun: function () {
        this.workStatusViw = this.topView.find("[data-analy=work-status]");
        this.totalMemberView = this.topView.find("[data-analy=analy-member]");
        this.avePointView = this.topView.find("[data-analy=ave-point]");
        //设置试卷状态
        if (this.data.workStatus == 0) {
            this.workStatusViw.text("课堂练习正在进行")
        } else {
            this.workStatusViw.text("课堂练习已结束")
        }
        //设置总人数
        this.totalMemberView.text(this.data.totalMember + "人");
        //设置平均分
        this.avePointView.text(this.data.averageScore + "分");
    },
    //Middle部分
    buildMiddleFun: function () {
        //初始化数据
        var chartData = this.data.scopeScore;
        createAnalysisPage.createChart(chartData);
    },
    //buttom部分
    buildBottomFun: function () {
        this.analyShowLeftView = this.bottomView.find("[data-analy=analy-b-left]>.analy-show");
        this.analyShowRightView = this.bottomView.find("[data-analy=analy-b-right]>.analy-show");
        this.analyShowLeftView.empty();
        this.analyShowRightView.empty();
        //初始化数据
        var currentData = this.data.correcRatio;

        for (index in currentData) {
            var eachSubject = $(createAnalysisPage.analyTemplate);
            var currentAnswer = currentData[index].correctAnswer;
            var temAnswer = "";
            //插入答案
            if (currentData[index].type == "judge") {
                eachSubject.find(".analy-b-correct").text(this.judgeType[currentAnswer[0]]);
            } else {
                temAnswer = "";
                for (tep in currentAnswer) {
                    temAnswer += this.answerType[currentAnswer[tep]];
                }
                eachSubject.find(".analy-b-correct").text(temAnswer);
            }
            //插入序号
            eachSubject.find(".analy-b-seq").text(currentData[index].num);
            //插入题型
            switch (currentData[index].type) {
                case "single":
                    eachSubject.find(".analy-b-subject").text(this.subjectType[0]);
                    break
                case "multi":
                    eachSubject.find(".analy-b-subject").text(this.subjectType[1]);
                    break
                case "judge":
                    eachSubject.find(".analy-b-subject").text(this.subjectType[2]);
                    break
                default :
                    eachSubject.find(".analy-b-subject").text("");
            }
            //插入正确率
            eachSubject.find(".correct-ratio").text(currentData[index].ratio + "%").css("width", currentData[index].ratio + "%");
            //插入该题
            if (index % 2 == 0) {
                this.analyShowLeftView.append(eachSubject);
            } else {
                this.analyShowRightView.append(eachSubject);
            }
        }

    },
    //结束答题
    endAnswerFun: function (e) {
        var that = e.data;
        console.log($(".ending-exam.active").length);
        if ($(".ending-exam.active").length) {
            $(this).removeClass("active");
            console.log("结束答题")
        }
    }
}
//创建图表
createAnalysisPage.createChart = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data.rateA ? data.rateA : 0;
    var TypeB = data.rateB ? data.rateB : 0;
    var TypeC = data.rateC ? data.rateC : 0;
    var TypeD = data.rateD ? data.rateD : 0;
    var TypeE = data.rateE ? data.rateE : 0;
    //设置数据
    var data = [
        {name: '优秀', value: TypeA},
        {name: '良好', value: TypeB},
        {name: '一般', value: TypeC},
        {name: '及格', value: TypeD},
        {name: '不及格', value: TypeE}
    ];
    //E-charts设置
    var pieChart = document.getElementById("analy-mid-left") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        //显示的title
        title: {
            show: false,
            text: '练习结果分布示意图',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '18',
                fontWeight: 'bold'
            }
        },
        //鼠标经过显示的文字详情
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        //设置颜色，从第一个开始获取
        color: ['#4A9074', '#3F719F', '#CE9E3D', '#B86A47', '#B64E4E'],
        //
        legend: {
            show: false,
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [40, 0, 0, 0],
            data: ['优秀', '良好', '一般', '及格', '不及格']
        },
        series: [
            {
                name: '练习结果',
                type: 'pie',
                //设置圆心的位置和半径
                radius: ['0%', '100%'],
                center: ['50%', '50%'],
                data: data,
                itemStyle: {
                    //边框的颜色
                    normal: {
                        borderWidth: 2,
                        borderColor: '#FFFFFF'
                    },
                    //鼠标经过边框的
                    emphasis: {
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        borderWidth: 0,
                        borderColor: '#FFFFFF'
                    }
                },
                avoidLabelOverlap: false,
                //图形标签和文字
                label: {
                    normal: {
                        show: true,
                        formatter: '{d}%',
                        position: "inner",
                        textStyle: {
                            fontSize: '14',
                            //fontWeight: 'bold'
                        }
                    },
                    emphasis: {
                        show: true,
                        formatter: '{d}%',
                        position: "inner",
                        textStyle: {
                            fontSize: '18',
                            //fontWeight: 'bold'
                        }
                    }
                },
                hoverAnimation: false,
                selectedMode: 'single'
            }
        ]
    };
    echart.setOption(option);
};
//正确率模板
createAnalysisPage.analyTemplate = '<ul>\
                                        <li class="analy-b-seq"></li>\
                                        <li class="analy-b-subject"></li>\
                                        <li class="analy-b-correct"></li>\
                                        <li class="analy-b-ratio">\
                                            <div class="total-correct-ratio">\
                                                <div class="correct-ratio"></div>\
                                            </div>\
                                        </li>\
                                    </ul>'
//分析页面结束
