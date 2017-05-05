/**
 * Created by Administrator on 2017/5/4.
 */
window.onload= function () {

    function DrawClock(){
        var context=document.getElementById("clock");
        var con=context.getContext("2d");

        con.clearRect(0,0,context.width,context.height);

        var NowTime=new Date();
        var NowHours=NowTime.getHours();
        var NowMin=NowTime.getMinutes();
        var NowSec=NowTime.getSeconds();

        var NowHoursValue=((360/12)*NowHours+(NowMin/2)-90)*Math.PI/180;
        var NowMinValue=((360/60)*NowMin-90)*Math.PI/180;
        var NowSecValue=((360/60)*NowSec-90)*Math.PI/180;

        for(var i= 0;i<60;i++){
            con.beginPath();
            con.moveTo(200,200);
            con.arc(200,200,150,i*6*Math.PI/180,(i+1)*6*Math.PI/180);
            con.stroke();
            con.closePath();
        }

        con.beginPath();
        con.fillStyle="#fff"
        con.moveTo(200,200);
        con.arc(200,200,140,0,360*Math.PI/180);
        con.fill();
        con.closePath();

        for(var i= 0;i<12;i++){
            con.beginPath();
            con.lineWidth=2;
            con.moveTo(200,200);
            con.arc(200,200,150,i*30*Math.PI/180,(i+1)*30*Math.PI/180);
            con.stroke();
            con.closePath();
        }

        con.beginPath();
        con.fillStyle="#fff"
        con.moveTo(200,200);
        con.arc(200,200,125,0,360*Math.PI/180);
        con.fill();
        con.closePath();

        con.beginPath();
        con.fillStyle="#000"
        con.moveTo(200,200);
        con.arc(200,200,10,0,360*Math.PI/180);
        con.fill();
        con.closePath();

        con.beginPath();
        con.lineWidth=4;
        con.moveTo(200,200);
        con.arc(200,200,80,NowHoursValue,NowHoursValue);
        con.stroke();
        con.closePath();

        con.beginPath();
        con.lineWidth=2.5;
        con.moveTo(200,200);
        con.arc(200,200,100,NowMinValue,NowMinValue);
        con.stroke();
        con.closePath();

        con.beginPath();
        con.lineWidth=1;
        con.moveTo(200,200);
        con.arc(200,200,135,NowSecValue,NowSecValue);
        con.stroke();
        con.closePath();

        con.beginPath();
        con.fillText(NowTime,70,380);
        con.closePath();
    }

    setInterval(DrawClock,1000);
}