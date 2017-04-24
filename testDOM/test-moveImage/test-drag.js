/**
 * Created by Administrator on 2017/4/19.
 */
//阻止默认菜单，显示新菜单框架
var ChangeDefule= function () {
  $(document).contextmenu(function (event) {
      var x=event.clientX;
      var y=event.clientY;

      var btn=event.button;
      if(btn==2){
          //此处显示新的邮件菜单
          console.log(x+"-"+y)
          return false;
      }

  });
};

