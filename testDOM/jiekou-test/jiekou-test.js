/**
 * Created by Administrator on 2017/3/27.
 */
var host="http://192.168.0.201:8877/fzx-web/";
var detailurl="statistic/classCompleteRatio";

var sendData= function () {
    var data={};
	
	
    data.classId=662;
    data.subjectId=3;
    data.queryType=2;
    //data.theoryType=1;
    data.token="6EFDB9600266D3759E31F71A69BD61D7";
	
	
    updateAnswer(data);
};

function updateAnswer(data) {
    $.ajax({
        url:host+detailurl,
        data: data,
        type:"post",
        success: function (data) {
            if (data.code == 10000) {
                $(".get-data p").text(JSON.stringify(data));
            } else {
                $(".get-data p").text(JSON.stringify(data));

            }
        },
        error: function (data) {
            $(".get-data p").text(JSON.stringify(data));
            console.log("error"+data);
        },
        beforeSend: function () {
            console.log("发送之前");
        },
        complete: function () {
            console.log("完成");
        }
    });
};

