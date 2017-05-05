//定义一个sea下的模块
define(function(require,exports,module){//sea下的参数，不容许修改
	function show(){
		alert(1);
	}
	
	//开放向外的接口
	exports.show = show;
	
	//模块调用情况一（在内部调用）
	//show();
});

//模块调用模块情况二（在模块内部调用，但是一般不这么做，这样和在模块内调用一样）
exports.show();
