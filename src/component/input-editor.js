(function () {
    var _componentName = 'input-editor';

    function _init(component) {
        return function ($el) {
            console.log(component);
            console.log($el.get(0));
            var el = '<p>input-editor</p>';
            $el.append(el);
            component.init($el);
            $el.find('p').on('click',function(){
                component.emit('test','1','2');
            })
        }
    }

    window.Xcomponent = window.Xcomponent || {};
    window.Xcomponent.components[_componentName] ={
        init:_init(window.Xcomponent)
    };

})();
