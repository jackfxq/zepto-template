/**
 * Created by jack on 17/4/10.
 */
var http = require('http');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler');
var serve = serveStatic(__dirname);
var server = http.createServer(
    function onRequest (req, res) {
        console.log('已启动');
        serve(req, res, finalhandler(req, res))
    }
);
server.listen(5000);