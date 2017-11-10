/**
 * Created by Administrator on 2017/8/3.
 */
window.onload = function () {
//Base Mode
    var BaseModeFun = function () {
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
                }
            }
        };
        var openAcCommand = {
            execute: function () {
                console.log("Open AC");
            }
        };
        var openTvCommand = {
            execute: function () {
                console.log("Open TV");
            }
        };
        var openSoundCommand = {
            execute: function () {
                console.log("Open Sound");
            }
        };
        var macroCommand1 = MacroCommand();
        macroCommand1.add(openTvCommand);
        macroCommand1.add(openSoundCommand);

        var closeDoorCommand = {
            execute: function () {
                console.log("Close Door");
            }
        };

        var openPCCommand = {
            execute: function () {
                console.log("Open PC");
            }
        };

        var openQQCommand = {
            execute: function () {
                console.log("Open QQ");
            }
        };

        var macroCommand2 = MacroCommand();
        macroCommand2.add(closeDoorCommand);
        macroCommand2.add(openPCCommand);
        macroCommand2.add(openQQCommand);

        var macroCommad = MacroCommand();
        macroCommad.add(openAcCommand);
        macroCommad.add(macroCommand1);
        macroCommad.add(macroCommand2);

        document.getElementById('button').onclick= function () {
            macroCommad.execute();
        };
        //var setCommand = (function (command) {
        //    document.getElementById('button').onclick = function () {
        //        command.execute();
        //    };
        //})(macroCommad);
    };
    new BaseModeFun();
};