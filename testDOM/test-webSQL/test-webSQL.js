/*
 * Created by Administrator on 2017/4/13.
 */
$(function () {
    var id=1;
    $(".createDB").on("click", function () {
        var CreateDB = new CreateDBTemplate;
    });
    $(".insertData").on("click", function () {
        var CreateTable = new CreateDBTemplate;
        CreateTable.InsertData(id);
        id++;
    });
    $(".showData").on("click", function () {
        var ShowTable = new CreateDBTemplate;
        ShowTable.ShowData();
    });
})

var CreateDBTemplate = function () {
    console.log("初始化成功");
    this.CreateDB();
};
//穿件一个数据库，如果存在就打开，不存在就新创建
CreateDBTemplate.prototype.CreateDB= function () {
    this.dataBase = openDatabase("studet", "", "课前数据测试", 1024 * 1024, function () {

    });
    if (!this.dataBase) {
        console.log("Create Failed!");
    } else {
        console.log("Create Success!");
    }
    this.CreateTable();
};
//添加一个表，如果存在就打开，如果不存在就新创建
CreateDBTemplate.prototype.CreateTable = function () {
    this.dataBase.transaction(function (tx) {
        tx.executeSql(
            "create table if not exists stu2 (subjectId REAL UNIQUE, name TEXT)",
            [],
            function (tx, result) {
                console.log('创建stu表成功'+tx+result);
            },
            function (tx, error) {
                console.log('创建stu表失败:' + error.message);
            });
    });
}
//给存在表添加数据
CreateDBTemplate.prototype.InsertData= function (id) {
    this.dataBase.transaction(function (tx) {
        tx.executeSql(
            "insert into stu2 (subjectId, name) values(?, ?)",
            [id, '徐明祥'],
            function () { console.log('添加数据成功'); },
            function (tx, error) { console.log('添加数据失败: ' + error.message);
            } );
    });
};
//通过查询展示数据
CreateDBTemplate.prototype.ShowData= function () {
  this.dataBase.transaction(function (tx) {
      tx.executeSql(
          "select * from stu2",[],
          function (tx,result) {
              console.log(result);
              $(".for-show-data").empty();
              for(var i=0;i<result.rows.length;i++){
                  $(".for-show-data").append("subjectId: "+result.rows[i].subjectId+", "+"name: "+result.rows[i].name+"<br />");
              }
          },
          function (tx,error) {
              console.log("查询失败"+error.message);
          }
      );
  })  ;
};
//更新某条数据
CreateDBTemplate.prototype.UpdataData= function () {
    this.dataBase.transaction(function (tx) {
        tx.executeSql(
            "update stu2 set name = ? where id= ?",
            [name, id],
            function (tx, result) {
            },
            function (tx, error) {
                alert('更新失败: ' + error.message);
            });
    });
};
//删除某条数据
CreateDBTemplate.prototype.DelData= function () {
    this.dataBase.transaction(function (tx) {
        tx.executeSql(
            "delete from stu2 where id= ?",
            [id],
            function (tx, result) {
            },
            function (tx, error) {
                alert('删除失败: ' + error.message);
            });
    });
};
//删除某张表
CreateDBTemplate.prototype.DelTable= function () {
    this.dataBase.transaction(function (tx) {
        tx.executeSql('drop table stu');
    });
};