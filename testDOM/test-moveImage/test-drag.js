/**
 * Created by Administrator on 2017/4/19.
 */
//��ֹĬ�ϲ˵�����ʾ�²˵����
var ChangeDefule= function () {
  $(document).contextmenu(function (event) {
      var x=event.clientX;
      var y=event.clientY;

      var btn=event.button;
      if(btn==2){
          //�˴���ʾ�µ��ʼ��˵�
          console.log(x+"-"+y)
          return false;
      }

  });
};

