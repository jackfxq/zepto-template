$(function () {

    var render = new Render({
        el: '.main',
        data: {
            num: 1,
            list: [{
                tag: 'aa'
            }, {
                tag: 'bb'
            }, {
                tag: 'cc'
            }]
        },
        methods: {
            click: function (index, tag, e) {
                console.log(index, tag, e);
                console.log(this.option)
                // this.option.methods.alert(index);
            },
            alert: function (x) {
                alert(x)
            }
        }
    });

    setTimeout(function () {
        render.option.data.num = 10;
        render.reRender();
    }, 1000)


});


