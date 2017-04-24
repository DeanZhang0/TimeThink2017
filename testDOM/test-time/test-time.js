/**
 * Created by Administrator on 2017/4/14.
 */
$(function () {
   $(".start").on("click", function () {
    var GetTime=new TestTime;
   });
});
var TestTime= function () {
    var i=0;
    var time=setInterval(function () {
      i++;
      $(".get-data").append(i+",");
        console.log(i);
    },1000);
    $(".end").on("click", function () {
       clearInterval(time);
        $(".get-data").append("结束");
    });
};