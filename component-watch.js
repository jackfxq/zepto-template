/**
 * Created by jack on 17/8/14.
 */
var exec = require('child_process').exec;
var chokidar = require('chokidar');

console.log('开始监听组件...');

chokidar.watch('./src/components/**/**').on('change', function (path) {
    console.log(dateFormat(new Date(), 'yyyy-M-d h:m:s') + ':' + path + '变化了...');

    exec('node get-component.js', function (err, out, code) {
        console.log(dateFormat(new Date(), 'yyyy-M-d h:m:s') + ':' + '编译完成...');
    });

});


//时间格式化
function dateFormat(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}