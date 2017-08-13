defineComponent('input-editor',function(component){
    console.log(component);
    console.log(this);
    var el = '<p class="input">input-editor</p>';
    $(this).append(el);
    $(this).find('p').on('click', function () {
        component.emit('test', '1', '2');
    });
    component.setStyle('.input{color:green}');
});
