defineComponent('a', function (component) {
    var el = '<p class="a">input-editor</p>';
    var id = component.getProp('id');//获取参数id
    $(this).append(el);//视图渲染
    component.setStyle('.a{color:green}');//定义样式
    $(this).find('p').on('click', function () {
        component.emit('test', id, '2');//触发test
    });
});
