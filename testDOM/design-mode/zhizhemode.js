/**
 * Created by Administrator on 2017/9/1.
 */
window.onload = function () {
    var baseMode = function () {
        var order500 = function (orderType,pay,stock) {
            if(orderType==1&&pay===true){
                console.log("500元定金预约，得到100优惠券");
            }else{
                order200(orderType,pay,stock);
            }
        };
        var order200= function (orderType,pay,stock) {
            if(orderType==2&&pay==true){
                console.log("200元预约定金，返50优惠券");
            }else{
                orderNormal(orderType,pay,stock);
            }
        };
        var orderNormal= function (orderType,pay,stock) {
            if ( stock > 0 ){
                console.log( '普通购买, 无优惠券' );
            }else{
                console.log( '手机库存不足' );
            }
        };
        order500( 1 , true, 500); // 输出：500 元定金预购, 得到 100 优惠券
        order500( 1, false, 500 ); // 输出：普通购买, 无优惠券
        order500( 2, true, 500 ); // 输出：200 元定金预购, 得到 500 优惠券
        order500( 3, false, 500 ); // 输出：普通购买, 无优惠券
        order500( 3, false, 0 ); // 输出：手机库存不足
    };

    baseMode();
};