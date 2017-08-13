(function () {

    function Component() {
        this.components = {};
        this.events = {};
        this.loadStyle = {};
        this.init('body');
    }

    var currentComponent = null;

    Component.prototype.init = function (container) {
        var self = this;
        $(container).find('[data-component]').each(function () {
            var componentName = $(this).attr('data-component');
            currentComponent = this;
            self.initComponent(componentName, this);
        });

    };

    Component.prototype.initComponent = function (componentName, context) {
        var self = this;
        if (this.components[componentName]) {
            this.components[componentName].init.call(context);
        } else {
            _loadScript('http://' + document.domain + ':5000/components/' + componentName + '.js', function () {
                self.components[componentName].init.call(context);
                if (!self.loadStyle[componentName] && self.components[componentName].style) {
                    $('head').append('<style>' + self.components[componentName].style + '</style>');
                    self.loadStyle[componentName] = true;
                }
            });
        }

    };

    Component.prototype.setStyle = function (style) {
        var currentComponentName = $(currentComponent).attr('data-component');
        var component = this.components[currentComponentName];
        if (component && !component.style) {
            component.style = style;
        }
    };

    Component.prototype.getProp = function (prop) {
        return $(currentComponent).attr('data-' + prop)
    };

    Component.prototype.on = function (name, callback) {
        this.events[name] = this.events[name] ? this.events[name] : [];
        this.events[name].push(callback);
    };

    Component.prototype.emit = function () {
        var args = [].slice.apply(arguments);
        var params = args.slice(1);
        this.events[args[0]].map(function (fn) {
            fn.apply(null, params);
        });
    };

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

    window.defineComponent = function (name, callback) {
        component.components[name] = {
            init: function () {
                callback.call(this, component);
                component.init(this);
            }
        };
    }

})();
