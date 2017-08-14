defineComponent('a', function (component) {
    var el = '<html>';
    var id = component.getProp('id');//获取参数id
    $(this).append(el);//视图渲染
    var style = '<style>';
    component.setStyle(style);//定义样式
    $(this).find('p').on('click', function () {
        component.emit('test', id, '2');//触发test
    })
});