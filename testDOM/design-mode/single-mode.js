/**
 * Created by Administrator on 2017/7/28.
 */
window.onload = function () {
//    基本结构
    var BaseDesign = function () {
        var CreateDiv = function (html) {
            this.html = html;
            this.init();
        };
        CreateDiv.prototype.init = function () {
            var div = document.createElement('div');
            div.id = 'loginBtn';
            div.innerHTML = this.html;
            document.body.appendChild(div);
        };

        var ProxySingleCreateDiv = (function () {
            var instance;
            return function (html) {
                if (!instance) {
                    instance = new CreateDiv(html);
                }
                return instance;
            }
        })();
        var a = new ProxySingleCreateDiv("seven1");
        var b = new ProxySingleCreateDiv("seven2");
        console.log(a == b);
    };
    new BaseDesign();
//    创建实例，登录窗口的植入
    var ExampleDesign = function () {
        var getSingle = function (fn) {
            var result;
            return function () {
                return result || (result = fn.apply(this, arguments));
            }
        };
        var createLoginLayer = function () {
            var div = document.createElement('div');
            div.innerHTML = "登录";
            div.style.display = 'none';
            document.body.appendChild(div);
            return div;
        };
        var createSingleLoginLayer = getSingle(createLoginLayer);
        document.getElementById('loginBtn').onclick = function () {
            var loginLayer = createSingleLoginLayer();
            loginLayer.style.display = 'block';
        }
    };
    new ExampleDesign();
}