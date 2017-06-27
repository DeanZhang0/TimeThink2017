$(function () {
    var StarFun = function (page) {
        this.page = page;
        this.mainView = $(".TestArea");
        this.conunt = parseInt($(window).height() / 100);

        this.init();
    };
    StarFun.prototype = {
        constructor: StarFun,
        init: function () {
            //获取数据，调用返回函数，处理数据
            for (var i = 0; i < this.conunt; i++) {
                this.appendTemplate = $(StarFun.template);
                this.mainView.append((this.page + "-" + (i + 1)), this.appendTemplate);
            }
            console.log(this.page);
            //返回数据中页数自增，确保再次触发获取新的一页数据
            this.page++;
        }
    };
    StarFun.template = '<li>那一世，你在这场缠绵的夜雨江南中为他悄悄的撑起那把泛青的油伞；我亦在烽台烛台望你千年之余，我曾听闻你为寻他走遍了千迢万里，踏过了雨雪绯林；而今离他只有那短短的一步之遥。看见你为了他在雨中温柔静候，那眼角滑落下的液体伴随着倾赋予他的漫天思念；静静的洒满这座城市的每一个角落。而我就这样静静的站在你们身后，多余的像极了一幅煞乱风景的残墨；顷刻间充斥着幸福流淌过的每一条暖流。但你是否曾知晓？那雨水从天而降肆无忌惮的在我的脸颊划落；泪水也参杂在雨水里紧附着思念随波逐流的晕开视线里残留下的最后一幅画面。也许你永远都不会知道，今生的我为了等候你那不轻易的回首；似乎比你等他的时间还要长。</li>'
    //初次进入页面默认加载第一页
    var MainFun = new StarFun(1);
    //核心函数，下拉刷新，再次调用init()方法
    $(window).scroll(function () {
        if ($(this).scrollTop() + $(window).height() >= $(document).height()) {
            $(".showInfo").removeClass("dn");
            setTimeout(function () {
                $(".showInfo").addClass("dn");
                MainFun.init();
            },1000);
        }
    });
})