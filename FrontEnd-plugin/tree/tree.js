/**
 * Created by Dean.
 */
(function () {
    var template = '<ul class="c-tree-content"></ul>';
    var liPTemplate = [
        '<li>',
        '<span data-id="c-tree-switch" class="c-tree-switch"></span>',
        '<span data-id="check-box" class="c-tree-check-box"></span>',
        '<span class="c-tree-text"></span>',
        '<ul></ul>',
        '</li>'
    ].join('');
    var liCTemplate = [
        '<li>',
        '<span data-id="check-box" class="c-tree-check-box"></span>',
        '<span class="c-tree-text"></span>',
        '</li>'
    ].join('');

    var value;

    var TreeParent = function (id, name, callback) {
        this.id = id;
        this.name = name;
        this.callback = callback;
        this.status = "off";
        this.parent = null;
        this.leafs = [];
        this.init();
    }
    var ppt = TreeParent.prototype;
    ppt.init = function () {
        var self = this;
        this.view = $(liPTemplate);
        this.btnSwitch = this.view.children('[data-id="c-tree-switch"]');
        this.btnCheck = this.view.children('[data-id="check-box"]');
        this.textView = this.view.children('.c-tree-text');
        this.ul = this.view.children('ul');
        this.textView.text(this.name);
        this.btnSwitch.click(function () {
            self.switch();
        });
        this.btnCheck.click(function () {
            if (self.status === "on") {
                self.checkOffAll();
            } else {
                self.checkOnAll();
            }
            if ($.isFunction(self.callback)) {
                self.callback();
            }
        });
    };
    ppt.add = function (leaf) {
        this.ul.append(leaf.view);
        leaf.parent = this;
        this.leafs.push(leaf);
    };
    ppt.addClassLastChildren = function () {
        var len = this.leafs.length;
        var obj = this.leafs[len - 1];
        if (len === 0) {
            return false;
        }
        if (obj instanceof TreeLeaf) {
            return false;
        }
        obj.view.addClass("c-tree-last-child");
        for (var i = 0, leaf; leaf = this.leafs[i++];) {
            leaf.addClassLastChildren();
        }
    };
    ppt.switch = function () {
        var obj = this.btnSwitch;
        if (obj.hasClass('c-tree-switch-close')) {
            obj.removeClass('c-tree-switch-close');
            this.ul.slideDown();
        } else {
            obj.addClass('c-tree-switch-close');
            this.ul.slideUp();
        }
    };
    ppt.checkOnAll = function () {
        var obj = this.btnCheck;
        if (this.parent) {
            this.parent.checkOn();
        }
        obj.addClass('c-tree-check-box-on');
        this.status = 'on';
        for (var i = 0, leaf; leaf = this.leafs[i++];) {
            leaf.checkOnAll();
        }
    };
    ppt.checkOn = function () {
        var isCheck = false,
            obj = this.btnCheck;
        for (var i = 0, leaf; leaf = this.leafs[i++];) {
            if (leaf.status === 'on') {
                isCheck = true;
                break;
            }
        }
        if (isCheck) {
            return false;
        }
        if (this.parent) {
            this.parent.checkOn();
        }
        obj.addClass('c-tree-check-box-on');
        this.status = 'on';
    };
    ppt.checkOff = function () {
        var isCheck = false,
            obj = this.btnCheck;
        for (var i = 0, leaf; leaf = this.leafs[i++];) {
            if (leaf.status === 'on') {
                isCheck = true;
                break;
            }
        }
        if (isCheck) {
            return false;
        }
        obj.removeClass('c-tree-check-box-on');
        this.status = 'off';
        if (this.parent) {
            this.parent.checkOff();
        }
    };
    ppt.getValue = function () {
        if (this.status === 'on') {
            value.values.push(this.id);
            value.names.push(this.name);
        }
        for (var i = 0, leaf; leaf = this.leafs[i++];) {
            leaf.getValue();
        }
        return value;
    }

    var TreeLeaf = function (id, name, callback) {

    }
})();