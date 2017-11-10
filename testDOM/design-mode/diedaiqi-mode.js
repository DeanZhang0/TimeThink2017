/**
 * Created by Administrator on 2017/8/1.
 */
//$.each();
//面向对象
window.onload = function () {
    var Iterator = function (obj) {
        this.obj = obj;
        this.current = 0;
    };
    Iterator.prototype = {
        constructor: Iterator,
        next: function () {
            this.current += 1;
        },
        getLength: function () {
            return this.obj.length;
        },
        isDone: function () {
            return this.current >= this.obj.length;
        },
        getCurrItem: function () {
            return this.obj[this.current];
        }
    };
//    多个函数
//var Iterator = function (obj) {
//    var current = 0;
//    var next = function () {
//        current += 1;
//    };
//    var getLength = function () {
//        return obj.length;
//    }
//    var isDone = function () {
//        return current >= obj.length;
//    }
//    var getCurrItem = function () {
//        return obj[current];
//    };
//    return {
//        next: next,
//        getLength: getLength,
//        isDone: isDone,
//        getCurrItem: getCurrItem
//    }
//};
    var compare = function (iterator1, iterator2) {
        if (iterator1.getLength() == iterator2.getLength()) {
            while (!iterator1.isDone() && !iterator2.isDone()) {
                if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
                    console.log('不相等');
                    return false;
                }
                iterator1.next();
                iterator2.next();
            }
            console.log('俩值相等');
        } else {
            console.log('不相等----长度不一致');
        }
    }
    var iterator1 = new Iterator([1, 2, 3, 4]);
    var iterator2 = new Iterator([1, 2, 3]);

    compare(iterator1, iterator2);
}