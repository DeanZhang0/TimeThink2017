
define(function(require,exports,module){
	//require模块之间依赖的接口
		//模块与普通模块之间的依赖
			//require('seaJS3.js');//相当于把var a = 100;写在这里
		//模块与sea模块之间的依赖
			var a  = require('seaJS3.js').a;//当引入的是sea下面的模块的时候，那么require('seaJS3.js')执行完成的结果就是exports
	function show(){
		alert(a);
	}
	exports.show = show;
});
