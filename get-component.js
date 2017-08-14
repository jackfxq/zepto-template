/**
 * Created by jack on 17/8/14.
 */

var fs = require('fs');
var os = require('os');

var getPaths = require('./get-path.js');
var routesPath = getPaths.getEntries('./src/components/**/index.js');

var readFile = require('./read-file');

for (var i in routesPath) {
    (function (i) {
        var outFile = i.replace('src', 'dist');
        readFile.readFile(i + '/index.js', function (fileStr) {
            var js = fileStr;
            readFile.readFile(i + '/index.html', function (fileStr) {
                js = js.replace('<html>', fileStr);
                readFile.readFile(i + '/index.css', function (fileStr) {
                    js = js.replace('<style>', fileStr);
                    var writeRoutes = fs.createWriteStream(outFile + '.js');
                    writeRoutes.write(js);
                });
            });

        });
    })(i)
}
