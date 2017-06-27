/**
 * Created by Administrator on 2017/4/1.
 */

var DateCenterEcharts = function () {
    //用来定义展示Echarts的没个方法
};

//环形图
DateCenterEcharts.Annulus = function (a, b, c) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var ontimeNum = a ? a : 0;
    var overtimeNum = b ? b : 0;
    var untimeNum = c ? c : 0;
    //设置数据
    var data = [
        {name: '按时完成人数', value: ontimeNum},
        {name: '超时完成人数', value: overtimeNum},
        {name: '未完成人数', value: untimeNum}
    ];
    //E-charts设置
    var pieChart = document.getElementById("for-echarts") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        //显示的title
        title: {
            text: '完成人数',
            x: "center",
            y: "center",
            textStyle: {
                fontSize: '18',
                //fontWeight: 'bold'
            }
        },
        //鼠标经过显示的文字详情
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        //设置颜色，从第一个开始获取
        color: ['#A1CDF4', '#EBC77F', '#F08585'],
        legend: {
            show: true,
            orient: 'vertical',
            x: "left",
            y: "top",
            data: ['按时完成人数', '超时完成人数', '未完成人数']
        },
        series: [
            {
                name: '完成人数',
                type: 'pie',
                //设置圆心的位置和半径
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                avoidLabelOverlap: false,
                //图形标签和文字
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                hoverAnimation: false
            }
        ]
    };
    echart.setOption(option);
};

//单个班级学生等级分布（饼状图）
DateCenterEcharts.Circle = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data.rateARatio ? data.rateARatio : 0;
    var TypeB = data.rateBRatio ? data.rateBRatio : 0;
    var TypeC = data.rateCRatio ? data.rateCRatio : 0;
    var TypeD = data.rateDRatio ? data.rateDRatio : 0;
    var TypeE = data.rateERatio ? data.rateERatio : 0;
    //设置数据
    var data = [
        {name: 'A', value: TypeA},
        {name: 'B', value: TypeB},
        {name: 'C', value: TypeC},
        {name: 'D', value: TypeD},
        {name: 'E', value: TypeE}
    ];
    //E-charts设置
    var pieChart = document.getElementById("stu_level") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        //显示的title
        title: {
            //show:false,
            text: '学生等级分布',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '18',
                //fontWeight: 'bold'
            }
        },
        //鼠标经过显示的文字详情
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        //设置颜色，从第一个开始获取
        color: ['#7EADEF', '#74C082', '#E9C0A9', '#EFBC56', '#C9C9C9'],
        //
        legend: {
            show: true,
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [40, 0, 0, 0],
            data: ['A', 'B', 'C', 'D', 'E']
        },
        series: [
            {
                name: '完成人数',
                type: 'pie',
                //设置圆心的位置和半径
                radius: ['0%', '70%'],
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
                        formatter: '{c}',
                        position: "inner",
                        textStyle: {
                            fontSize: '14',
                            //fontWeight: 'bold'
                        }
                    },
                    emphasis: {
                        show: true,
                        formatter: '{c}',
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

//单个班级(完成率)
DateCenterEcharts.ColumnCompleteRate = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data.previewCompleteRate ? data.previewCompleteRate : 0;
    var TypeB = data.inclassCompleteRate ? data.inclassCompleteRate : 0;
    var TypeC = data.homeworkCompleteRate ? data.homeworkCompleteRate : 0;

    //E-charts设置
    var pieChart = document.getElementById("stu_complete") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        //显示的title
        title: {
            //show:false,
            text: '完成率',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '18',
                //fontWeight: 'bold'
            }
        },
        tooltip: {
            formatter: '{b}: {c}'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            show: true,
            type: 'category',
            data: ['预习', '课上', '作业'],
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
        }],
        yAxis: [{
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        }],
        series: [{
            type: 'bar',
            barWidth: '30%',
            data: [TypeA, TypeB, TypeC],
            itemStyle: {
                normal: {
                    //定义一个list，然后根据取得不同颜色，从第一个开始
                    color: function (params) {
                        var colorList = [
                            '#74C082', '#EFBC56', '#7EADEF'
                        ];
                        return colorList[params.dataIndex]
                    },
                    //以下为是否显示鼠标经过的文字，显示位置和显示格式的设置
                    label: {
                        show:true,
                        position: 'insideTop',
                        formatter: '{c}',
                        textStyle: {
                            fontSize: '12',
                            color:'#FFF',
                        }
                    }
                }
            }
        }]
    };
    echart.setOption(option);
};

//单个班级(正确率)
DateCenterEcharts.ColumnRightRate = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data.previewRightRate ? data.previewRightRate: 0;
    var TypeB = data.inclassRightRate ? data.inclassRightRate: 0;
    var TypeC = data.homeworkRightRate ? data.homeworkRightRate: 0;

    //E-charts设置
    var pieChart = document.getElementById("stu_right") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        //显示的title
        title: {
            //show:false,
            text: '正确率',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '18',
                //fontWeight: 'bold'
            }
        },
        tooltip: {
            formatter: '{b}: {c}'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            show: true,
            type: 'category',
            data: ['预习', '课上', '作业'],
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
        }],
        yAxis: [{
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        }],
        series: [{
            type: 'bar',
            barWidth: '30%',
            data: [TypeA, TypeB, TypeC],
            itemStyle: {
                normal: {
                    //定义一个list，然后根据取得不同颜色，从第一个开始
                    color: function (params) {
                        var colorList = [
                            '#74C082', '#EFBC56', '#7EADEF'
                        ];
                        return colorList[params.dataIndex]
                    },
                    //以下为是否显示鼠标经过的文字，显示位置和显示格式的设置
                    label: {
                        show:true,
                        position: 'insideTop',
                        formatter: '{c}',
                        textStyle: {
                            fontSize: '12',
                            color:'#FFF',
                        }
                    }
                }
            }
        }]
    };
    echart.setOption(option);
};

//单个班级完成率趋势分析(折线图)
DateCenterEcharts.PolylineCompleteRate = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data.totalCompleteRatio ? data.totalCompleteRatio : 0;
    var TypeB = data.previewExamRatio ? data.previewExamRatio : 0;
    var TypeC = data.inclassExamRatio ? data.inclassExamRatio : 0;
    var TypeD = data.homeworkExamRatio ? data.homeworkExamRatio : 0;
    var DataLine=data.statisticDate;

    //E-charts设置
    var pieChart = document.getElementById("show-chart-part1") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            // text: '完成率趋势分析',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        color: ['#C9C9C9', '#74C082', '#EFBC56', '#7EADEF'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['整体完成率', '预习完成率', '课上完成率', '作业完成率'],
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [30, 0, 0, 0],
            //班级图例间的间隔
            itemGap: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: DataLine,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            //添加%
            axisLabel: {
                formatter: '{value}%'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: '整体完成率',
            type: 'line',
            symbol: 'circle',
            data: TypeA
        }, {
            name: '预习完成率',
            type: 'line',
            symbol: 'circle',
            data: TypeB
        }, {
            name: '课上完成率',
            type: 'line',
            symbol: 'circle',
            data: TypeC
        }, {
            name: '作业完成率',
            type: 'line',
            symbol: 'circle',
            data: TypeD
        }]
    };
    echart.setOption(option);
};

//单个班级正确率趋势分析(折线图)
DateCenterEcharts.PolylineCorrectRate = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data.totaRightRatio ? data.totaRightRatio : 0;
    var TypeB = data.previewRightRatio ? data.previewRightRatio : 0;
    var TypeC = data.inclassRightRatio ? data.inclassRightRatio : 0;
    var TypeD = data.homeworkRightRatio ? data.homeworkRightRatio : 0;
    var DataLine=data.statisticDate;

    //E-charts设置
    var pieChart = document.getElementById("show-chart-part2") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            text: '正确率趋势分析',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        color: ['#C9C9C9', '#74C082', '#EFBC56', '#7EADEF'],
        tooltip: {
            trigger: 'axis',
            //formatter: "{b} : {c}%"
        },
        legend: {
            data: ['整体正确率', '预习正确率', '课上正确率', '作业正确率'],
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [30, 0, 0, 0],
            //班级图例间的间隔
            itemGap: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: DataLine,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            //添加%
            axisLabel: {
                formatter: '{value}%'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: '整体正确率',
            type: 'line',
            symbol: 'circle',
            data: TypeA
        }, {
            name: '预习正确率',
            type: 'line',
            symbol: 'circle',
            data: TypeB
        }, {
            name: '课上正确率',
            type: 'line',
            symbol: 'circle',
            data: TypeC
        }, {
            name: '作业正确率',
            type: 'line',
            symbol: 'circle',
            data: TypeD
        }]
    };
    echart.setOption(option);
};

//单个班级等级分布趋势分析(折线图)
DateCenterEcharts.PolylineRank = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data.rateARatio ? data.rateARatio : 0;
    var TypeB = data.rateBRatio ? data.rateBRatio : 0;
    var TypeC = data.rateCRatio ? data.rateCRatio : 0;
    var TypeD = data.rateDRatio ? data.rateDRatio : 0;
    var TypeE = data.rateERatio ? data.rateERatio : 0;
    var DataLine=data.statisticDate;

    //E-charts设置
    var pieChart = document.getElementById("show-chart-part3") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            text: '等级分布趋势分析',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        color: ['#7EADEF', '#74C082', '#E9C0A9', '#EFBC56', '#C9C9C9'],
        tooltip: {
            trigger: 'axis',
            //formatter: "{b} : {c}%"
        },
        legend: {
            data: ['A', 'B', 'C', 'D','E'],
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [30, 0, 0, 0],
            //班级图例间的间隔
            itemGap: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: DataLine,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            //添加%
            axisLabel: {
                formatter: '{value}%'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: 'A',
            type: 'line',
            symbol: 'circle',
            data: TypeA
        }, {
            name: 'B',
            type: 'line',
            symbol: 'circle',
            data: TypeB
        }, {
            name: 'C',
            type: 'line',
            symbol: 'circle',
            data: TypeC
        }, {
            name: 'D',
            type: 'line',
            symbol: 'circle',
            data: TypeD
        }, {
            name: 'E',
            type: 'line',
            symbol: 'circle',
            data: TypeE
        }]
    };
    echart.setOption(option);
};

//---------------------------------------------------------

//班级对比数据柱状图(完成率，正确率【横向】)
DateCenterEcharts.ColumnCompareRate = function (data1, data2) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data1 ? data1 : {class:"无数据",data:[0,0]};
    var TypeB = data2 ? data2 : {class:"无数据",data:[0,0]};

    //E-charts设置
    var pieChart = document.getElementById("for-echarts") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            text: '正确率/完成率',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        tooltip: {
        },
        color: ['#EFBC56', '#7EADEF', '#E9C0A9', '#EFBC56', '#C9C9C9'],
        legend: {
            data: [data1.class, data2.class],
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [30, 0, 0, 0],
            //班级图例间的间隔
            itemGap:30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            min: 0,
            max: 100,
            interval: 10,
            //添加%
            axisLabel : {
                formatter: '{value}%'
            }
        },
        yAxis: {
            type: 'category',
            data: ['正确率','完成率'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [
            {
                name: data1.class,
                type: 'bar',
                barWidth: '20%',
                data: data1.data
            },
            {
                name: data2.class,
                type: 'bar',
                barWidth: '20%',
                data: data2.data,
                //两个柱状图之间的距离
                barGap:'1%'
            }
        ]
    };
    echart.setOption(option);
};

//班级对比数据柱状图(学生等级【横向】)
DateCenterEcharts.ColumnCompareRank = function (data1, data2) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data1 ? data1 : {class:"无数据",data:[0,0,0,0,0]};
    var TypeB = data2 ? data2 : {class:"无数据",data:[0,0,0,0,0]};

    //E-charts设置
    var pieChart = document.getElementById("for-echarts") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            text: '学生等级比例',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        color: ['#EFBC56', '#7EADEF', '#E9C0A9', '#EFBC56', '#C9C9C9'],
        tooltip: {
            // trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: [TypeA.class, TypeB.class],
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [30, 0, 0, 0],
            //班级图例间的间隔
            itemGap: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            min: 0,
            max: 100,
            interval: 10,
            //添加%
            axisLabel: {
                formatter: '{value}%'
            }
        },
        yAxis: {
            type: 'category',
            data: ['E', 'D', 'C', 'B', 'A'],
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: TypeA.class,
            type: 'bar',
            data: TypeA.data,
            barWidth: '20%'
        },
            {
                name: TypeB.class,
                type: 'bar',
                data: TypeB.data,
                //两个柱状图之间的距离
                barGap: '1%',
                barWidth: '20%'
            }]
    };
    echart.setOption(option);
};

//班级对比完成率趋势分析(折线图)
DateCenterEcharts.PolylineCompareCompleteRate = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0

    //var Example={}; //传入的数据格式
    //Example.first={className:"yiban",data:[0,0,0,0,0]};
    //Example.second={className:"yiban",data:[0,0,0,0,0]};
    //Example.statisticDate=['10-31','11-02',.........];

    var TypeA = data.first.data ? data.first.data : 0;
    var TypeB = data.second.data ? data.second.data : 0;
    var DataLine=data.statisticDate;

    //E-charts设置
    var pieChart = document.getElementById("for-echarts") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            text: '完成率对比趋势分析',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        color: ['#EFBC56', '#7EADEF'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [data.first.className, data.second.className],
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [30, 0, 0, 0],
            //班级图例间的间隔
            itemGap: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: DataLine,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            //添加%
            axisLabel: {
                formatter: '{value}%'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: data.first.className,
            type: 'line',
            symbol: 'circle',
            data: TypeA
        }, {
            name: data.second.className,
            type: 'line',
            symbol: 'circle',
            data: TypeB
        }]
    };
    echart.setOption(option);
};

//班级对比正确率对比趋势分析(折线图)
DateCenterEcharts.PolylineCompareCompleteRate = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0

    //var Example={}; //传入的数据格式
    //Example.first={className:"yiban",data:[0,0,0,0,0]};
    //Example.second={className:"yiban",data:[0,0,0,0,0]};
    //Example.statisticDate=['10-31','11-02',.........];

    var TypeA = data.first.data ? data.first.data : 0;
    var TypeB = data.second.data ? data.second.data : 0;
    var DataLine=data.statisticDate;

    //E-charts设置
    var pieChart = document.getElementById("for-echarts") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            text: '正确率对比趋势分析',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        color: ['#EFBC56', '#7EADEF'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [data.first.className, data.second.className],
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [30, 0, 0, 0],
            //班级图例间的间隔
            itemGap: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: DataLine,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            //添加%
            axisLabel: {
                formatter: '{value}%'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: data.first.className,
            type: 'line',
            symbol: 'circle',
            data: TypeA
        }, {
            name: data.second.className,
            type: 'line',
            symbol: 'circle',
            data: TypeB
        }]
    };
    echart.setOption(option);
};

//班级对比综合成绩对比趋势分析(折线图)
DateCenterEcharts.PolylineCompareCompleteRate = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0

    //var Example={}; //传入的数据格式
    //Example.first={className:"yiban",data:[0,0,0,0,0]};
    //Example.second={className:"yiban",data:[0,0,0,0,0]};
    //Example.statisticDate=['10-31','11-02',.........];

    var TypeA = data.first.data ? data.first.data : 0;
    var TypeB = data.second.data ? data.second.data : 0;
    var DataLine=data.statisticDate;

    //E-charts设置
    var pieChart = document.getElementById("for-echarts") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            text: '综合成绩对比趋势分析',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        color: ['#EFBC56', '#7EADEF'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [data.first.className, data.second.className],
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [30, 0, 0, 0],
            //班级图例间的间隔
            itemGap: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: DataLine,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            //添加%
            axisLabel: {
                formatter: '{value}%'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: data.first.className,
            type: 'line',
            symbol: 'circle',
            data: TypeA
        }, {
            name: data.second.className,
            type: 'line',
            symbol: 'circle',
            data: TypeB
        }]
    };
    echart.setOption(option);
};
//---------------------------------------------------------

//个人数据综合成绩分析(柱状图)
DateCenterEcharts.ColumnStuTotalResult = function (data1, data2) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data1 ? data1 : [0,0,0];
    var TypeB = data2 ? data2 : [0,0,0];

    //E-charts设置
    var pieChart = document.getElementById("for-echarts") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            text: '综合成绩分析',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        tooltip: {
            axisPointer: {
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        //显示图例部分
        // legend: {
        //     data: ['综合成绩', '平均成绩'],
        //     orient: 'horizontal',
        //     x: "center",
        //     y: "top",
        //     padding: [30, 0, 0, 0]
        // },
        color: ['#7EADEF', '#EFBC56'],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['预习', '课上', '作业'],
            axisTick: {
                alignWithLabel: true,
                show: false
            },
            axisLine: {
                show: false
            }
        }],
        yAxis: [{
            type: 'value',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        }],
        series: [{
            name: '综合成绩',
            type: 'bar',
            barWidth: '30%',
            data: TypeA
        }, {
            name: '平均成绩',
            type: 'bar',
            barWidth: '30%',
            data: TypeB
        }]
    };
    echart.setOption(option);
};

//个人数据正确率趋势分析（折线图）
DateCenterEcharts.PolylineStuCorrectRate = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data.totaRightRatio ? data.totaRightRatio : 0;
    var TypeB = data.previewRightRatio ? data.previewRightRatio : 0;
    var TypeC = data.inclassRightRatio ? data.inclassRightRatio : 0;
    var TypeD = data.homeworkRightRatio ? data.homeworkRightRatio : 0;
    var DataLine=data.statisticDate;

    //E-charts设置
    var pieChart = document.getElementById("show-chart-part1") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            text: '正确率趋势分析',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        color: ['#C9C9C9', '#74C082', '#EFBC56', '#7EADEF'],
        tooltip: {
            trigger: 'axis',
            //formatter: "{b} : {c}%"
        },
        legend: {
            data: ['整体正确率', '预习正确率', '课上正确率', '作业正确率'],
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [30, 0, 0, 0],
            //班级图例间的间隔
            itemGap: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: DataLine,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            //添加%
            axisLabel: {
                formatter: '{value}%'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: '整体正确率',
            type: 'line',
            symbol: 'circle',
            data: TypeA
        }, {
            name: '预习正确率',
            type: 'line',
            symbol: 'circle',
            data: TypeB
        }, {
            name: '课上正确率',
            type: 'line',
            symbol: 'circle',
            data: TypeC
        }, {
            name: '作业正确率',
            type: 'line',
            symbol: 'circle',
            data: TypeD
        }]
    };
    echart.setOption(option);
};

//个人数据等级分布趋势分析（折线图）
DateCenterEcharts.PolylineStuAverageRank = function (data) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var TypeA = data.totalResult ? data.totalResult : 0;
    var TypeB = data.AverageResult ? data.AverageResult : 0;
    var DataLine=data.statisticDate;

    //E-charts设置
    var pieChart = document.getElementById("for-echarts") || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            text: '正确率趋势分析',
            x: "center",
            y: "top",
            textStyle: {
                fontSize: '16',
                //fontWeight: 'bold'
            }
        },
        color: ['#7EADEF', '#EFBC56'],
        tooltip: {
            trigger: 'axis',
            //formatter: "{b} : {c}%"
        },
        legend: {
            data: ['综合成绩', '平均成绩'],
            orient: 'horizontal',
            x: "center",
            y: "top",
            padding: [30, 0, 0, 0],
            //班级图例间的间隔
            itemGap: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: DataLine,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100,
            interval: 10,
            //添加%
            axisLabel: {
                formatter: '{value}%'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            name: '综合成绩',
            type: 'line',
            symbol: 'circle',
            data: TypeA
        }, {
            name: '平均成绩',
            type: 'line',
            symbol: 'circle',
            data: TypeB
        }]
    };
    echart.setOption(option);
};


//E-charts详情
var AppendDevice = function () {

};
//中国地图
AppendDevice.CircleChart = function (viewID, data) {
    var ShowId = viewID;
    var EchartData = data;
    var setMax = parseInt(EchartData[0].value * 0.7);
    console.log(EchartData);
    console.log(setMax);

    //E-charts设置
    var pieChart = document.getElementById(ShowId) || document.body;
    var echart = echarts.init(pieChart);

    var option = {
        title: {
            show: false,
            text: '',
            subtext: '',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} 人"
        },
        legend: {
            show: false,
            orient: 'vertical',
            x: 'left',
            data: ['观众人数'],
            selectedMode: false
        },
        dataRange: {
            min: 0,
            max: 10,
            orient: 'horizontal',
            x: 'left',
            y: 'bottom',
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: false,
            selectedMode: false
        },
        series: [
            {
                name: '观众人数',
                type: 'map',
                mapType: 'china',
                roam: false,
                itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                },
                data: EchartData
            }
        ]
    };
    echart.setOption(option);
}
//环形图
AppendDevice.Annulus = function (viewID, PCNum, MobileNum) {
    //根据获得数据判断，如果为0或未定义，这设置值为0
    var pc = PCNum ? PCNum : 0;
    var mobile = MobileNum ? MobileNum : 0;
    //设置数据
    var data = [
        {name: 'PC观看人数', value: pc},
        {name: '移动端观看人数', value: mobile}
    ];
    //E-charts设置
    var pieChart = document.getElementById(viewID) || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        //显示的title
        title: {
            show: false,
            text: '',
            x: "center",
            y: "center",
            textStyle: {
                fontSize: '18',
                //fontWeight: 'bold'
            }
        },
        //鼠标经过显示的文字详情
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} <br>占比 : {d}%"
        },
        //设置颜色，从第一个开始获取
        color: ['#9ACE60', '#419BF9', '#F08585'],
        legend: {
            show: false,
            orient: 'vertical',
            x: "left",
            y: "top",
            data: []
        },
        series: [
            {
                name: '完成人数',
                type: 'pie',
                //设置圆心的位置和半径
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                avoidLabelOverlap: false,
                //图形标签和文字
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                hoverAnimation: false
            }
        ]
    };
    echart.setOption(option);
};

//折线面积图
AppendDevice.LineMap = function (viewID, Num, Time) {
    //设置数据
    var data = [
        {name: 'PC观看人数', value: 100},
        {name: '移动端观看人数', value: 50}
    ];
    //E-charts设置
    var pieChart = document.getElementById(viewID) || document.body;
    var echart = echarts.init(pieChart);
    var option = {
        title: {
            show: false,
            text: '观看人数',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        color: ['#419BF9', '#FFCB3D'],
        legend: {
            data: ['观看人数'],
            selectedMode: false,
            x: "70px",
            y: "top",
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: Time
            }
        ],
        yAxis: [
            {
                type: 'value',
                //添加 单位
                axisLabel: {
                    formatter: '{value} 人'
                },
            }
        ],
        series: [
            {
                name: '观看人数',
                type: 'line',
                smooth: true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: Num
            }
        ]
    };
    echart.setOption(option);
};