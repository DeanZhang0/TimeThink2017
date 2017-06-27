/**
 * Created by admin on 2015/11/29.
 */
require.config({
  paths:{
    jquery:'jquery-3.1.1'
  }
});
require(['jquery','widget','window'],function($,widget,w){
  $('#a').click(function(){
    var win = new w.Window();
    win.alert({
      title:'提示',
      content: 'welcome!',
      handler4AlertBtn: function(){alert('alert1')},
      text4AlertBtn:'好',
      handler4CloseBtn: function(){alert('close1')},
      width:300,
      height:150,
      y:50,
      hasCloseBtn:true
    }).on('alert',function(){
      alert('alert2')
    }).on('close',function(){
      alert('close')
    })
  });
  $('#b').click(function() {
    var win = new w.Window();
    win.confirm({
      title: '提示',
      content: 'welcome!',
      text4ConfirmBtn: '是',
      text4CancelBtn: '否',
      width: 300,
      height: 150,
      y: 50,
      hasCloseBtn: true,
      handler4ConfirmBtn: function () {
        alert(1)
      },
      handler4CancelBtn: function () {
        alert(2)
      }
    }).on('confirm', function () {
      alert(3)
    }).on('cancel', function () {
      alert(4)
    })
  });
  $('#c').click(function() {
    var win = new w.Window();
    win.prompt({
      title: '名字',
      content: '1234',
      text4PromptBtn: '输入',
      text4CancelBtn: '否',
      defaultValue4PromptInput:'zhangsan',
      width: 300,
      height: 150,
      y: 50,
      hasCloseBtn: true,
      handler4PromptBtn:function(inputValue){//inputValue????
        alert(1+inputValue)
      },
      handler4CancelBtn: function () {
        alert(2)
      }
    }).on('prompt', function () {
      alert(3)
    }).on('cancel', function () {
      alert(4)
    })
  });
  $('#d').click(function() {
    var win = new w.Window();
    win.common({
      width: 300,
      height: 150,
      y: 50,
      hasCloseBtn: true,
      content:1234,
      handler4CloseBtn: function () {
        alert(2)
      }
    }).on('close', function () {
      alert(4)
    })
  });
});



