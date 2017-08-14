var readline = require('readline');
var fs = require('fs');

exports.readFile = function (file, fn) {
    console.log(file);
    var fRead = fs.createReadStream(file);

    var objReadline = readline.createInterface({
        input: fRead
    });

    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)|(\/\/(.*))|(\/\*(.*)\*\/)/g, "");
    }

    var fileStr = '';

    objReadline.on('line', function (line) {
        fileStr += trim(line);
    });

    objReadline.on('close', function () {
        fn(fileStr)
    });
};
