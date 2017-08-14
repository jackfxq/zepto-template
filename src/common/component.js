(function () {
    /**
     * Component类
     * @constructor
     */
    function Component() {
        this.components = {};//所有的组件
        this.events = {};//注册的事件
        this.loadStyle = {};
        this.init('body');//初始化
    }

    var currentComponent = null;//当前的组件
    /**
     * 类的初始化函数
     * @param container 初始化的范围，默认情况下是body
     */
    Component.prototype.init = function (container) {
        var self = this;
        container = container || 'body';
        $(container).find('[data-component]').each(function () {
            var componentName = $(this).attr('data-component');
            console.log(this);
            self.initComponent(componentName, this);
        });

    };
    /**
     *  初始化单个组件
     * @param componentName 组件名
     * @param context 当前组件
     */
    Component.prototype.initComponent = function (componentName, context) {

        var self = this;
        if (this.components[componentName]) {
            this.components[componentName].init.call(context);
        } else {
            _loadScript('http://' + document.domain + ':5000/dist/components/' + componentName + '.js', function () {
                self.components[componentName].init.call(context);
                //设置样式，同一个组件只设置一次
                if (!self.loadStyle[componentName] && self.components[componentName].style) {
                    $('head').append('<style>' + self.components[componentName].style + '</style>');
                    self.loadStyle[componentName] = true;
                }
            });
        }

    };
    /**
     * 设置样式
     * @param style 样式
     */
    Component.prototype.setStyle = function (style) {
        console.log(currentComponent);
        //获取当前组件的名称，currentComponent就是当前组件
        var currentComponentName = $(currentComponent).attr('data-component');
        var component = this.components[currentComponentName];
        if (component && !component.style) {
            component.style = style;
        }
    };
    /**
     * 获取组件参数
     * @param prop 参数名
     * @returns {*|jQuery}
     */
    Component.prototype.getProp = function (prop) {
        return $(currentComponent).attr('data-' + prop)
    };
    /**
     * 注册事件
     * @param name 事件名
     * @param fn 事件函数
     */
    Component.prototype.on = function (name, fn) {
        this.events[name] = this.events[name] ? this.events[name] : [];
        this.events[name].push(fn);
    };
    /**
     * 触发事件
     */
    Component.prototype.emit = function () {
        var args = [].slice.apply(arguments);
        var eventName = args[0];
        var params = args.slice(1);
        this.events[eventName].map(function (fn) {
            fn.apply(null, params);
        });
    };
    /**
     * 动态加载组价
     * @param url 组件路径
     * @param callback 回调函数
     * @private
     */
    function _loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (typeof(callback) != "undefined") {
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                        $(script).remove();
                    }
                };
            } else {
                script.onload = function () {
                    callback();
                    $(script).remove();
                };
            }
        }
        script.src = url;
        $('body').append(script);
    }

    var component = new Component();

    window.defineComponent = function (name, fn) {
        component.components[name] = {
            init: function () {
                //设置currentComponent为当前组件
                currentComponent = this;
                fn.call(this, component);
                component.init(this);
            }
        };
    }

})();
