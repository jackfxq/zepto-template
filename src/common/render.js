(function () {

    function Render(option) {
        this.option = option;
        this._template = '';
        this._init();
    }

    /**
     * 初始化
     */
    Render.prototype._init = function () {
        $(this.option.el).html(this._render($(this.option.el), this.option.data));
        $(this.option.el).show();
        var _this = this;
        $('[data-on]').each(function () {
            var eventStr = $(this).attr('data-on');
            var eventType = eventStr.split('-')[0].replace(/\s/g, '');
            var event = eventStr.split('-')[1].replace(/\s/g, '').match(/(\w+)(.*|\((.+)\))/);
            var method = event[1];
            var params = event[2].match(/\((.*)\)/) ? event[2].match(/\((.*)\)/)[1] : '';
            var args = params.split(',');
            $(this).on(eventType, function (e) {
                args.push(e);
                _this.option.methods[method].apply(this, args);
            });
            // $(this).removeAttr('data-on');
        })
    };
    /**
     * 模板渲染
     * @param $el 渲染的html模板
     * @param {object} data 渲染的数据
     * @returns {string} 生成的html字符串
     */
    Render.prototype._render = function ($el, data) {
        if (!this._template) {
            this._template = $el.html();
        }
        var template = this._template ? this._template : $el.html();
        var tokenizeArray = _tokenize(template);
        var parameter = [];
        var args = [];
        var ret = ['var strArray = []'];
        for (var i = 0, token; token = tokenizeArray[i++];) {
            if (token.type === 'text') {
                ret.push("strArray.push('" + token.expr + "')");
            } else if (token.type === 'logic') {
                ret.push(token.expr);
            } else {
                ret.push("strArray.push(" + token.expr + ")");
            }
        }
        ret.push("return strArray");
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                parameter.push(key);//形参
                args.push(data[key]);//数据
            }
        }
        console.log(ret.join('\n'));
        var renderArrayFunction = new Function(parameter.join(','), ret.join('\n'));//渲染函数
        var renderArray = renderArrayFunction.apply(this, args);
        return renderArray.join('').replace(/@(\w+)="([^"]*)"/g, 'data-on="$1-$2"');

    };
    /**
     *生成渲染单元数组
     * @param {string} str 模板html字符串
     * @returns {Array} 渲染单元数组
     */
    function _tokenize(str) {
        var openTag = '{{';
        var closeTag = '}}';
        var ret = [];
        var value = '';
        do {
            var index = str.indexOf(openTag);
            index = index === -1 ? str.length : index;
            value = str.slice(0, index);
            ret.push({//抽取{{前面的静态内容
                expr: value.trim().replace(/[\r\n]/g, ""),//去除换行符
                type: 'text'
            });
            str = str.slice(index + openTag.length);//改变str字符串自身
            if (str) {
                index = str.indexOf(closeTag);
                value = str.slice(0, index);
                if (/^(\s+)/.test(value)) {//抽取{{与}}的动态内容
                    ret.push({
                        expr: _antiEscape(value),
                        type: 'logic'
                    });
                } else {
                    ret.push({
                        expr: value,
                        type: 'js'
                    });
                }
                str = str.slice(index + closeTag.length);//改变str字符串自身
            }
        } while (str.length);
        console.log(ret);
        return ret
    }

    /**
     * 反转义
     * @param {string} str
     * @returns {string|string}
     */
    function _antiEscape(str) {
        var elem = document.createElement('div');
        elem.innerHTML = str;
        return elem.innerText || elem.textContent;
    }

    window.Render = Render;

})(window);
