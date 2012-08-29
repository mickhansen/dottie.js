var buster = require("buster");
var assert = buster.assert;
var refute = buster.refute;

var http = require("http");
var h = require("./test-helper");
var httpServerRequestListenerProxy = require("./../lib/http-server-request-listener-proxy");

buster.testCase("HTTP server request listener proxy", {
    setUp: function (done) {
        this.httpServer = http.createServer(function (req, res) {
            res.writeHead(h.NO_RESPONSE_STATUS_CODE);
            res.end();
        });

        this.httpServer.listen(h.SERVER_PORT, done);
    },

    tearDown: function (done) {
        this.httpServer.on("close", done);
        this.httpServer.close();
    },

    "stops other listeners when attached last and returning true": function (done) {
        var reqSpy = this.spy();
        var proxySpy = this.spy();

        this.httpServer.on("request", reqSpy);
        httpServerRequestListenerProxy.attach(this.httpServer, function (req, res) {
            proxySpy();
            res.end();
            return true;
        });

        h.request({path: "/doesnotexist", method: "GET"}, function (res, body){
            refute(reqSpy.called);
            assert(proxySpy.calledOnce);
            done();
        }).end();
    }
});