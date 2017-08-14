/**
 * Created by jack on 17/3/21.
 */

var glob = require('glob');

exports.getEntries = function (globPath) {
    var entries = {};
    /**
     * 读取src目录,并进行路径裁剪
     */
    glob.sync(globPath).forEach(function (entry) {
        var tmp = entry.split('/');
        tmp.shift();
        tmp.pop();
        var pathname = tmp.join('/'); // 获取前两个元素

        entries[pathname] = entry;

    });

    return entries;
};
