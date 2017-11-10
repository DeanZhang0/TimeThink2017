/**
 * Created by Administrator on 2017/8/3.
 */
window.onload = function () {
//    基础代码
    var BaseFun = function () {
        var button1 = document.getElementById('button1');
        var button2 = document.getElementById('button2');
        var button3 = document.getElementById('button3');

        var setCommand = function (button, command) {
            button.onclick = function () {
                command.execute();
            }
        };

        var MenuBar = {
            refresh: function () {
                console.log("刷新菜单目录");
            }
        };

        var SubMenu = {
            add: function () {
                console.log("增加子菜单");
            },
            del: function () {
                console.log("删除子菜单");
            }
        };

        var RefreshMenuBarCommand = function (receiver) {
            this.receiver = receiver;
        };
        RefreshMenuBarCommand.prototype.execute = function () {
            this.receiver.refresh();
        };
        var AddSubMenuCommand = function (receiver) {
            this.receiver = receiver;
        }
        AddSubMenuCommand.prototype.execute = function () {
            this.receiver.add();
        }
        var DelSubMenuCommand = function (receiver) {
            this.receiver = receiver;
        }
        DelSubMenuCommand.prototype.execute = function () {
            this.receiver.del();
        }

        var refresMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
        var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
        var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

        setCommand(button1, refresMenuBarCommand);
        setCommand(button2, addSubMenuCommand);
        setCommand(button3, delSubMenuCommand);
    };

//    宏命令
    var HongCommandFun = function () {
        var closeDoorCommand = {
            execute: function () {
                console.log("关门");
            }
        };
        var openPcCommand = {
            execute: function () {
                console.log('开电脑');
            }
        };
        var openQQCommand = {
            execute: function () {
                console.log("打开QQ");
            }
        };

        var MacroCommand = function () {
            return {
                commandsList: [],
                add: function (command) {
                    this.commandsList.push(command);
                },
                execute: function () {
                    for (var i = 0, command; command = this.commandsList[i++];) {
                        command.execute();
                    }
                    ;
                }
            }
        };
        var macroCommand = MacroCommand();
        macroCommand.add(closeDoorCommand);
        macroCommand.add(openPcCommand);
        macroCommand.add(openQQCommand);
        macroCommand.execute();
    }
}