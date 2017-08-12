$(function () {
    new Render({
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
            }
        }
    });
});


