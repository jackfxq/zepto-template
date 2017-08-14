defineComponent('b', function (component) {
    var el = '<html>';
    var id = component.getProp('id');//获取参数id
    $(this).append(el);//视图渲染
    var style = '<style>';
    component.setStyle(style);//定义样式
    component.on('test', function (a, b) {
        console.log(a + b)
    })
});