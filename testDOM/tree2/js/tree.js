(function(){
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

    var TreeParent = function(id, name, callback){
        this.id = id;
        this.name = name;
        this.callback = callback;
        this.status = 'off';
        this.parent = null;
        this.leafs = [];
        this.init();
    };
    var ppt = TreeParent.prototype;
    ppt.init = function(){
        var self = this;
        this.view = $(liPTemplate);
        this.btnSwitch = this.view.children('[data-id="c-tree-switch"]');
        this.btnCheck = this.view.children('[data-id="check-box"]');
        this.textView = this.view.children('.c-tree-text');
        this.ul = this.view.children('ul');
        this.textView.text(this.name);
        this.btnSwitch.click(function(){
            self.switch();
        });
        this.btnCheck.click(function(){
            if(self.status === 'on'){
                self.checkOffAll();
            }else{
                self.checkOnAll();
            }
            if(typeof self.callback === 'function'){
                self.callback();
            }
        });
    };
    ppt.add = function(leaf){
        this.ul.append(leaf.view);
        leaf.parent = this;
        this.leafs.push(leaf);
    };
    ppt.addClassLastChildren = function(){
        var len = this.leafs.length,
            obj = this.leafs[len - 1];
        if(len === 0){
            return false;
        }
        if(obj instanceof TreeLeaf){
            return false;
        }
        obj.view.addClass('c-tree-last-child');
        for(var i = 0, leaf; leaf = this.leafs[i++];){
            leaf.addClassLastChildren();
        }
    };
    ppt.switch = function(){
        var obj = this.btnSwitch;
        if(obj.hasClass('c-tree-switch-close')){
            obj.removeClass('c-tree-switch-close');
            this.ul.slideDown();
        }else{
            obj.addClass('c-tree-switch-close');
            this.ul.slideUp();
        }
    };
    ppt.checkOnAll = function(){
        var obj = this.btnCheck;
        if(this.parent){
            this.parent.checkOn();
        }
        obj.addClass('c-tree-check-box-on');
        this.status = 'on';
        for(var i = 0, leaf; leaf = this.leafs[i++];){
            leaf.checkOnAll();
        }
    };
    ppt.checkOffAll = function(){
        var obj = this.btnCheck;
        obj.removeClass('c-tree-check-box-on');
        this.status = 'off';
        for(var i = 0, leaf; leaf = this.leafs[i++];){
            leaf.checkOffAll();
        }
        if(this.parent){
            this.parent.checkOff();
        }
    };
    ppt.checkOn = function(){
        var isCheck = false,
            obj = this.btnCheck;
        for(var i = 0, leaf; leaf = this.leafs[i++];){
            if(leaf.status === 'on'){
                isCheck = true;
                break;
            }
        }
        if(isCheck){
            return false;
        }
        if(this.parent){
            this.parent.checkOn();
        }
        obj.addClass('c-tree-check-box-on');
        this.status = 'on';
    };
    ppt.checkOff = function(){
        var isCheck = false,
            obj = this.btnCheck;
        for(var i = 0, leaf; leaf = this.leafs[i++];){
            if(leaf.status === 'on'){
                isCheck = true;
                break;
            }
        }
        if(isCheck){
            return false;
        }
        obj.removeClass('c-tree-check-box-on');
        this.status = 'off';
        if(this.parent){
            this.parent.checkOff();
        }
    };
    ppt.getValue = function(){
        if(this.status === 'on'){
            value.values.push(this.id);
            value.names.push(this.name);
        }
        for(var i = 0, leaf; leaf = this.leafs[i++];){
            leaf.getValue();
        }
        return value;
    };

    var TreeLeaf = function(id, name, callback){
        this.id = id;
        this.name = name;
        this.callback = callback;
        this.status = 'off';
        this.parent = null;
        this.init();
    };
    var lpt = TreeLeaf.prototype;
    lpt.init = function(){
        var self = this;
        this.view = $(liCTemplate);
        this.btnCheck = this.view.children('[data-id="check-box"]');
        this.textView = this.view.children('.c-tree-text');
        this.textView.text(this.name);
        this.btnCheck.click(function(){
            if(self.status === 'on'){
                self.checkOff();
            }else{
                self.checkOn();
            }
            if(typeof self.callback === 'function'){
                self.callback();
            }
        });
    };
    lpt.add = function(){
        throw new Error('叶节点不可以添加子节点');
    };
    lpt.addClassLastChildren = function(){
        return false;
    };
    lpt.checkOnAll = function(){
        var obj = this.btnCheck;
        obj.addClass('c-tree-check-box-on');
        this.status = 'on';
    };
    lpt.checkOffAll = function(){
        var obj = this.btnCheck;
        obj.removeClass('c-tree-check-box-on');
        this.status = 'off';
    };
    lpt.checkOn = function(){
        var obj = this.btnCheck;
        if(this.parent){
            this.parent.checkOn();
        }
        obj.addClass('c-tree-check-box-on');
        this.status = 'on';
    };
    lpt.checkOff = function(){
        var obj = this.btnCheck;
        obj.removeClass('c-tree-check-box-on');
        this.status = 'off';
        if(this.parent){
            this.parent.checkOff();
        }
    };
    lpt.getValue = function(){
        if(this.status === 'on'){
            value.values.push(this.id);
            value.names.push(this.name);
        }
    };

    var getTree = function(){
        var getTree = function(data, callback, parent){
            var id = data.id || '',
                name = data.name || '',
                child = data.child,
                tree;
            if(child){
                tree = new TreeParent(id, name, callback);
                for(var i = 0, c; c = child[i++];){
                    getTree(c, callback, tree);
                }
            }else{
                tree = new TreeLeaf(id, name, callback);
            }
            if(parent){
                parent.add(tree);
            }
            return tree;
        };
        return function(options){
            var parentView = options.parentView,
                data = options.data,
                callback = options.callback;
            var treeContent = $(template),
                trees = [], tree;
            if(!data && {}.toString.call(data) !== '[object Array]'){
                throw new Error('数据错误');
            }
            for(var i = 0, item; item = data[i++];){
                tree = getTree(item, callback);
                treeContent.append(tree.view);
                tree.addClassLastChildren();
                trees.push(tree);
            }
            parentView.append(treeContent);
            return {
                getValue: function(){
                    value = {
                        values: [],
                        names: []
                    };
                    for(var i = 0, tree; tree = trees[i++];){
                        tree.getValue();
                    }
                    return value;
                },
                checkOff: function(id, name){
                    if(!id && !name){
                        return false;
                    }
                    for(var i = 0, tree; tree = trees[i++];){
                        (function(tree){
                            var match = false;
                            if(!name){
                                match = (tree.id === id && tree.status === 'on');
                            }else{
                                match = (tree.id === id && tree.name === name && tree.status === 'on');
                            }
                            if(match){
                                return tree.btnCheck.trigger('click');
                            }
                            if(!tree.leafs || tree.leafs.length === 0){
                                return false;
                            }
                            for(var i = 0, leaf; leaf = tree.leafs[i++];){
                                arguments.callee(leaf);
                            }
                            return false;
                        })(tree);
                    }
                }
            };
        };
    };
    window.getTree = getTree();
})();