/**
 * Created by Administrator on 2017/8/3.
 */
window.onload = function () {
//    ��������
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
                console.log("ˢ�²˵�Ŀ¼");
            }
        };

        var SubMenu = {
            add: function () {
                console.log("�����Ӳ˵�");
            },
            del: function () {
                console.log("ɾ���Ӳ˵�");
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

//    ������
    var HongCommandFun = function () {
        var closeDoorCommand = {
            execute: function () {
                console.log("����");
            }
        };
        var openPcCommand = {
            execute: function () {
                console.log('������');
            }
        };
        var openQQCommand = {
            execute: function () {
                console.log("��QQ");
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