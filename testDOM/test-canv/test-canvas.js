/**
 * Created by Administrator on 2017/4/14.
 */
$(function () {
    $(".draw").on("click", function () {
        new DrawCanvas;
    });
    DrawCanvas2();
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
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 200);
    ctx.stroke();
    //绘制实心圆形
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ////实心
    ////ctx.fill();
    ////空心
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(150, 25);
    ctx.lineTo(25, 150);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 200);
    ctx.quadraticCurveTo(127, 73, 200, 200);
    ctx.stroke();
};
var DrawCanvas2 = function () {
    var oC = document.getElementById("c1");
    var oCC = oC.getContext("2d");  //webgl Draw3D

    //Base Demo
    //oCC.fillRect(50.5,50.5,100,100);
    //oCC.fillStyle="#efefef";

    //oCC.save();
    //oCC.beginPath();
    //oCC.strokeStyle='red';
    //oCC.moveTo(100,100);
    //oCC.lineTo(200,200);
    //oCC.lineTo(300,200);
    //oCC.closePath();
    //oCC.stroke();
    //oCC.restore();
    //
    //oCC.beginPath();
    //oCC.moveTo(100,200);
    //oCC.lineTo(200,300);
    //oCC.lineTo(300,300);
    //oCC.closePath();
    //oCC.fill();

    //oCC.beginPath();
    //oCC.rect(50.5,50.5,100,100);
    //oCC.closePath();
    //oCC.fill();
    //oCC.clearRect(0,0,oC.width,oC.height)

    //oCC.beginPath();
    //oCC.moveTo(100,100);
    //oCC.lineTo(200,200);
    //oCC.lineTo(300,200);
    //oCC.stroke();
    //oCC.closePath();

    //Moving Rect
    oC.onmousedown = function (ev) {
        var ev = ev || window.event;
        oCC.beginPath();
        oCC.moveTo(ev.clientX - oC.offsetLeft, ev.clientY - oC.offsetTop);
        document.onmousemove = function (ev) {
            var ev = ev || window.event;
            oCC.lineTo(ev.clientX - oC.offsetLeft, ev.clientY - oC.offsetTop);
            oCC.stroke();
        }
        document.onmouseup = function () {
            var ev = ev || window.event;
            document.onmousemove = null;
            document.onmousedown = null;
        }
    }

    var numX=0;
    var numY=0;
    var numX2,numY2;
    var randomNumX=Math.random()*2;
    var randomNumY=Math.random()*2;
    console.log(randomNumX);
    console.log(randomNumY);
    oCC.fillRect(0,0,20,20);
    var Move=setInterval(function () {
         if(numX<=oC.width-20&&numY<=oC.height-20){
            numX+=randomNumX;
            numY+=randomNumY;
            oCC.clearRect(0,0,oC.width,oC.height);
            oCC.fillRect(numX,numY,20,20)
            numX2=numX;
            numY2=numY;
        }else if(numX<=oC.width-20){
            numX+=randomNumX;
            numY2-=randomNumY;
            oCC.clearRect(0,0,oC.width,oC.height);
            oCC.fillRect(numX,numY2,20,20)
            numX2=numX;
            if(numY2<=0){
                numY=numY2;
                Move;
            }
        }else if(numY<=oC.height-20){
            numX2-=randomNumX;
            numY+=randomNumY;
            oCC.clearRect(0,0,oC.width,oC.height);
            oCC.fillRect(numX2,numY,20,20)
            numY2=numY;
            if(numX2<=0){
                numX=numX2;
                numY=numY2;
                Move;
            }
        }else{
            numX2-=randomNumX;
            numY2-=randomNumY;
            oCC.clearRect(0,0,oC.width,oC.height);
            oCC.fillRect(numX2,numY2,20,20)
            if(numX2<=0||numY2<=0){
                numX=numX2;
                numY=numY2;
                Move;
            }
        }
    },30)
};

