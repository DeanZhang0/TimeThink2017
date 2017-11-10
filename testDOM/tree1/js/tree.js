/***
 * 树插件使用实例：
 * $("body").getTree({
 *		'type' : 'checkbox', --------normal（不带复选框）/checkbox（带复选框）
 *		'title' : '测试树结构', --------标题
 *		'data' : tree,  --------json格式数据
 *		'handler' : function(){   ------------点击某个节点触发的点击事件（仅当type为normal时生效）
 *			console.log(111);
 *		}
 *	});
 * @param {Object} $
 */
(function($){
	$.fn.extend({
		getTree : function(options){
			var defaults = {
				'type' : 'normal',
				'data' : [],
				'treeType' : 'chapter',
				'handler' : function(){
					
				}
			};
			options = $.extend(defaults, options);
			var $this = $(this);
			options.data = options.data || [];
			treeHandle($this,options.data,options.type,options.treeType,options.handler);
		}
	});
	function treeHandle($obj,data,type,treeType,handler){
		var date = new Date().getTime();
		var html = '<div class="tree_content"><div class="tree_inner tree_inner_'+date+'">';
		var attrName = '';
		if(treeType === 'chapter'){
			attrName = 'unitName';
		}else if(treeType === 'knowledge'){
			attrName = 'pointName';
		}
		$.each(data,function(i,item){
			if(item[attrName] === undefined){
				return;
			}
			html += '<div class="node_parent"><span class="node_open"></span>';
			if(type === 'checkbox'){
				html += '<span class="checkbox_off"></span>';
			}
			html += '<div class="node_text" title="'+item[attrName]+'" nodeid="'+item.id+'"><span>'+item[attrName]+'</span></div></div>';
			if(item.child){//如果有下级节点
				html += '<ul class="node_ul">';
				for(var i=0;i<item.child.length;i++){
					if(item.child[i]){
						//防止json数据解析过程中逗号后无内容在ie8下报错的问题
						html = nodeHandle(item.child[i],html,type,attrName);
					}
				}
				html += '</ul>';
			}
		});
		html += '</div></div>';
		$obj.append(html);
		initEvent($('.tree_inner_'+date),handler);
	}
	function nodeHandle(data,html,type,attrName){
		//console.log('attrName========'+attrName);
		if(data.child){//如果还有下级节点
			html += '<li class="node_child_li_canopen"><span class="node_open"></span>';
			if(type === 'checkbox'){
				html += '<span class="checkbox_off"></span>';
			}
			html += '<div class="node_text" title="'+data[attrName]+'" nodeid="'+data.id+'"><span>'+data[attrName]+'</span></div></li>';
			html += '<ul class="node_child_ul">';
			for(var i=0;i<data.child.length;i++){
				html = nodeHandle(data.child[i],html,type,attrName);
			}
			html += '</ul>';
		}else{
			html += '<li class="node_child_li_noopen">';
			if(type === 'checkbox'){
				html += '<span class="checkbox_off"></span>';
			}
			html += '<div class="node_text" title="'+data[attrName]+'" nodeid="'+data.id+'"><span>'+data[attrName]+'</span></div></li>';
		}
		return html;
	}
	function initEvent($obj,handler){
		//点击展开图标展开子节点
		$obj.find('.node_open').on('click',function(){
			//$(this).removeClass('node_open').addClass('node_close');
			$(this).toggleClass("node_close");
			$(this).parent().next("ul").toggle("slow");
		});
		//点击关闭图标关闭子节点
		//$obj.find('.node_close').on('click',function(){
		//	$(this).removeClass('node_close').addClass('node_open');
		//	$(this).parent().next("ul").slideDown();
		//});
		//防止字体选中
		$('.node_text').bind('selectstart',function(){
	    	return false;
		});
		//选中
		$obj.find('.checkbox_off').on('click',function(){
			check_on($(this));
			check_on($(this).parent().next("ul").find('.checkbox_off'));
			handler();
		});
		//取消
		$obj.find('.checkbox_on').on('click',function(){
			check_off($(this));
			check_off($(this).parent().next("ul").find('.checkbox_on'));
			handler();
		});
		//选中或取消
		$obj.find('.node_text').click(function(){
			var checkClass = $(this).prev().attr('class');
			if('checkbox_off' === checkClass){
				check_on($(this).prev());
				check_on($(this).parent().next("ul").find('.checkbox_off'));
				$('.node_text').removeClass('node_text_current');
				handler();
			}else{
				check_off($(this).prev());
				check_off($(this).parent().next("ul").find('.checkbox_on'));
				handler();
			}
		});
	}
	function check_on($obj){
		$obj.removeClass('checkbox_off').addClass('checkbox_on');
	}
	function check_off($obj){
		$obj.removeClass('checkbox_on').addClass('checkbox_off');
	}
})(jQuery);
