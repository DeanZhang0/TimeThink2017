var Page = function(parentView, options){
    this.defaults = {
        totalPages: 10,//总页数
        current: 1,//当前页
        hasFirst: false,//是否有首页按钮
        hasLast: false,//是否有末页按钮
        hasPrev: true,//是否有前一页按钮
        hasNext: true,//是否有后一页按钮
        hasJump: false,//是否显示跳转按钮
        hasCount: false,//是否显示总条数
        prev: '<',//前一页按钮文字
        next: '>',//后一页按钮文字
        first: '>>',//首页按钮文字
        last: '<<',//末页按钮文字
        jumpLeftTxt: '跳转至',
        jumpRightTxt: '页',
        jump: 'GO',//跳转按钮文字
        countLeftTxt: '共',
        countRightTxt: '条记录',
        count: 0,
        backFn: function(nowPage){
            //console.log(nowPage);
        }
    };
    this.parentView = parentView;
    this.options = this.defaults;
    for(var key in options){
        this.options[key] = options[key];
    }
    this.init();
};
Page.prototype = {
    constructor: Page,
    init: function(){
        if(typeof this.options.totalPages === 'boolean'
            || typeof this.options.current === 'boolean'
            || this.options.totalPages == null
            || this.options.current == null
            || isNaN(this.options.totalPages)
            || isNaN(this.options.current)){
            console.warn('参数错误：当前页和总页数必须为数字或者数字字符串！');
            return;
        }
        if(+this.options.totalPages < 0 || +this.options.current < 0){
            console.warn('参数错误：当前页和总页数不能为负数！');
            return;
        }
        if(+this.options.totalPages < +this.options.current){
            console.warn('参数错误：当前页不能大于总页数！');
            return;
        }
        this.createPage();
    },
    createPage: function(){
        var totalPages = +this.options.totalPages,
            current = +this.options.current,
            hasFirst = this.options.hasFirst,
            hasLast = this.options.hasLast,
            hasPrev = this.options.hasPrev,
            hasNext = this.options.hasNext,
            hasJump = this.options.hasJump,
            hasCount = this.options.hasCount,
            prev = this.options.prev,
            next = this.options.next,
            first = this.options.first,
            last = this.options.last,
            jumpLeftTxt = this.options.jumpLeftTxt,
            jumpRightTxt = this.options.jumpRightTxt,
            jump = this.options.jump,
            countLeftTxt = this.options.countLeftTxt,
            countRightTxt = this.options.countRightTxt,
            count = this.options.count;
        var start, end;
        var hideBefores = false,
            hideAfters = false;
        var preStr = '',
            midStr = '',
            sufStr = '';
        this.parentView.empty();
        if(totalPages === 0){
            if(hasFirst){
                preStr += '<span class="to-first-page-disabled">' + first + '</span>';
            }
            if(hasPrev){
                preStr += '<span class="to-prev-page-disabled">' + prev + '</span>';
            }
            if(hasNext){
                sufStr += '<span class="to-next-page-disabled">' + next + '</span>';
            }
            if(hasLast){
                sufStr += '<span class="to-last-page-disabled">' + last + '</span>';
            }
        }else if(totalPages === 1){
            if(hasFirst){
                preStr += '<span class="to-first-page-disabled">' + first + '</span>';
            }
            if(hasPrev){
                preStr += '<span class="to-prev-page-disabled">' + prev + '</span>';
            }
            midStr += '<span class="page-curr">1</span>';
            if(hasNext){
                sufStr += '<span class="to-next-page-disabled">' + next + '</span>';
            }
            if(hasLast){
                sufStr += '<span class="to-last-page-disabled">' + last + '</span>';
            }
        }else{
            if(current === 1){
                if(hasFirst){
                    preStr += '<span class="to-first-page-disabled">' + first + '</span>';
                }
                if(hasPrev){
                    preStr += '<span class="to-prev-page-disabled">' + prev + '</span>';
                }
                preStr += '<span class="page-curr">1</span>';
            }else{
                if(hasFirst){
                    preStr += '<span class="to-first-page">' + first + '</span>';
                }
                if(hasPrev){
                    preStr += '<span class="to-prev-page">' + prev + '</span>';
                }
                preStr += '<span class="page-item">1</span>';
            }
            start = 2;
            end = totalPages - 1;
            if(totalPages >= 10){
                if(current >= 4){
                    hideBefores = true;
                }
                if(current < totalPages - 3){
                    hideAfters = true;
                }
            }
            if(!hideBefores && hideAfters){
                end = 5;
                sufStr += '<span>...</span>';
            }
            if(hideBefores && !hideAfters){
                start = totalPages - 4;
                preStr += '<span>...</span>';
            }
            if(hideBefores && hideAfters){
                start = current - 1;
                end = current + 1;
                preStr += '<span>...</span>';
                sufStr += '<span>...</span>';
            }
            for(; start <= end; start++){
                if(start === current){
                    midStr += '<span class="page-curr">' + start + '</span>';
                }else{
                    midStr += '<span class="page-item">' + start + '</span>';
                }
            }
            if(current === totalPages){
                sufStr += '<span class="page-curr">' + totalPages + '</span>';
                if(hasNext){
                    sufStr += '<span class="to-next-page-disabled">' + next + '</span>';
                }
                if(hasLast){
                    sufStr += '<span class="to-last-page-disabled">' + last + '</span>';
                }
            }else{
                sufStr += '<span class="page-item">' + totalPages + '</span>';
                if(hasNext){
                    sufStr += '<span class="to-next-page">' + next + '</span>';
                }
                if(hasLast){
                    sufStr += '<span class="to-last-page">' + last + '</span>';
                }
            }
        }
        if(hasJump){
            sufStr += '<span class="page-go-txt-left">' + jumpLeftTxt + '</span>';
            sufStr += '<input class="page-go-val" maxlength="3">';
            sufStr += '<span class="page-go-txt-right">' + jumpRightTxt + '</span>';
            sufStr += '<span class="page-go-btn">' + jump + '</span>';
        }
        if(hasCount){
            sufStr += '<span class="page-count">';
            sufStr += '<span class="page-count-txt-left">' + countLeftTxt + '</span>';
            sufStr += '<span class="page-count-val">' + count + '</span>';
            sufStr += '<span class="page-count-txt-right">' + countRightTxt + '</span>';
            sufStr += '</span>';
        }
        this.parentView.append(preStr + midStr + sufStr);
        this.addEvent();
    },
    addEvent: function(){
        var self = this;
        this.parentView.find('.to-first-page').click(function(){
            self.options.current = 1;
            self.createPage();
            if(typeof(self.options.backFn)=="function"){
                self.options.backFn(self.options.current);
            }
        });
        this.parentView.find('.to-last-page').click(function(){
            self.options.current = self.options.totalPages;
            self.createPage();
            if(typeof(self.options.backFn)=="function"){
                self.options.backFn(self.options.current);
            }
        });
        this.parentView.find('.to-prev-page').click(function(){
            self.options.current--;
            self.createPage();
            if(typeof(self.options.backFn)=="function"){
                self.options.backFn(self.options.current);
            }
        });
        this.parentView.find('.to-next-page').click(function(){
            self.options.current++;
            self.createPage();
            if(typeof(self.options.backFn)=="function"){
                self.options.backFn(self.options.current);
            }
        });
        this.parentView.find('.page-item').click(function(){
            self.options.current = +$(this).text();
            self.createPage();
            if(typeof(self.options.backFn)=="function"){
                self.options.backFn(self.options.current);
            }
        });
        this.parentView.find('.page-go-btn').click(function(){
            var current = $.trim(self.parentView.find('.page-go-val').val());
            if(current === ''){
                return;
            }
            if(isNaN(current) || current == 0){
                alert('请输入有效数字');
                return;
            }
            current = +current;
            if(current > self.options.totalPages){
                alert('输入的页数大于总页数');
                return;
            }
            if(current === self.options.current){
                return;
            }
            self.options.current = +current;
            self.createPage();
            if(typeof(self.options.backFn)=="function"){
                self.options.backFn(self.options.current);
            }
        });
    }
};