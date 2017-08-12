(function () {

    function Component() {
        this.components = {};
        this.events = {};
        this.init($('body'));
    }

    Component.prototype.init = function ($container) {
        console.log($container);
        var self = this;
        $container.find('[data-component]').each(function () {
            var componentName = $(this).attr('data-component');
            self.renderComponent(componentName, $(this));
        });

    };

    Component.prototype.renderComponent = function (componentName, $el) {
        var self = this;
        if (this.components[componentName]) {
            this.components[componentName].init($el);
        } else {
            loadScript('http://' + document.domain + ':5000/component/' + componentName + '.js', function () {
                self.components[componentName].init($el);
            });
        }

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

    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (typeof(callback) != "undefined") {
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                script.onload = function () {
                    callback();
                };
            }
        }
        script.src = url;
        document.body.appendChild(script);
    }

    window.Xcomponent = new Component();

})();
