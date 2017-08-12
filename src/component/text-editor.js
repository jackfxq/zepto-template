(function () {
    var _componentName = 'text-editor';

    function _init(component) {
        return function ($el) {
            if (!component.components[_componentName]) {
                var style = '<style>.text-editor{color:red}</style>';
                console.log(style);
                $('body').append(style);
            }
            console.log(component);
            console.log($el.get(0));
            var el = '<p>text-editor</p><div data-component="input-editor">';
            $el.append(el);
            component.init($el);
            component.on('test', function (a, b) {
                console.log(a + b);
            })
        }
    }

    window.Xcomponent = window.Xcomponent || {};
    window.Xcomponent.components[_componentName] = {
        init: _init(window.Xcomponent)
    };

})();
