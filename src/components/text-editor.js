defineComponent('text-editor', function (component) {
    var el = '<p class="text-editor">text-editor</p><div data-component="input-editor"></div>';
    console.log(component);
    console.log(this);
    $(this).append(el);
    component.on('test', function (a, b) {
        console.log(a + b);
    });
    var style = '.text-editor{color:red}';
    component.setStyle(style)
});