/**
 * Created by Administrator on 2017/4/14.
 */
$(function () {
    $(".draw").on("click", function () {
        new DrawCanvas;
    });
});

var DrawCanvas = function () {
    //var c=document.getElementById("mycanvas");
    var c = $("#mycanvas")[0];
    c.width = 300;
    c.height = 300;
    var ctx = c.getContext("2d");
    //绘制矩形
    ctx.strokeStyle = "#ff0000";
    ctx.strokeRect(0, 0, 200, 200);
    //绘制直线
    ctx.moveTo(0,0);
    ctx.lineTo(200,200);
    ctx.stroke();
    //绘制实心圆形
    ctx.beginPath();
    ctx.arc(100,100,50,0,Math.PI*2,true);
    ctx.closePath();
    ////实心
    ////ctx.fill();
    ////空心
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(25,25);
    ctx.lineTo(150,25);
    ctx.lineTo(25,150);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,200);
    ctx.quadraticCurveTo(127,73,200,200);
    ctx.stroke();
};