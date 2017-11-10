/**
 * Created by Dean on 2017/8/24.
 */
window.onload = function () {
    var Beverage = function () {};
    Beverage.prototype.boilWater= function () {
        console.log("把水烧开");
    };
    Beverage.prototype.brew= function () {
      throw new Error("子类必须重写brew方法");
    };
    Beverage.prototype.pourInCuup= function () {
        throw new Error("子类必须重写pourInCup方法");
    };
    Beverage.prototype.addCondiments= function () {
        throw new Error("子类必须重写addCondiments方法");
    };
    Beverage.prototype.customerWantsCondiments= function () {
        return true;
    };
    Beverage.prototype.init= function () {
        this.boilWater();
        this.brew();
        this.pourInCuup();
        if(this.customerWantsCondiments()){
            this.addCondiments();
        }
    };

    var CoffeeWithHook= function () {

    };
    CoffeeWithHook.prototype=new Beverage();
    CoffeeWithHook.prototype.brew= function () {
        console.log("用沸水冲泡咖啡");
    };
    CoffeeWithHook.prototype.pourInCuup= function () {
        console.log("把咖啡倒进杯子");
    };
    CoffeeWithHook.prototype.addCondiments= function () {
        console.log("加牛奶和糖");
    };
    CoffeeWithHook.prototype.customerWantsCondiments= function () {
        return window.confirm("请问需要调料吗？");
    };

    var coffeeWithHook=new CoffeeWithHook();
    coffeeWithHook.init();
}