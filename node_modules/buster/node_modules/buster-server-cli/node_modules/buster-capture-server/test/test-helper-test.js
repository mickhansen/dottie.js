var buster = require("buster");
var assert = buster.assert;
var refute = buster.refute;
var bCapServ = require("./../lib/buster-capture-server");

var http = require("http");
var h = require("./test-helper");

buster.testCase("test helper", {
    setUp: function (done) {
        this.httpServer = http.createServer(function (req, res) {
            res.writeHead(h.NO_RESPONSE_STATUS_CODE); res.end();
        });
        this.httpServer.listen(h.SERVER_PORT, done);

        this.s = bCapServ.createServer();
        this.s.attach(this.httpServer);
    },

    tearDown: function (done) {
        this.httpServer.on("close", done);
        this.httpServer.close();
    },

    "should capture slave": function (done) {
        var self = this;
        var ua = "My User Agent";
        bCapServ.testHelper.captureSlave(h.SERVER_PORT, ua).then(done(function () {
            var slaves = self.s.slaves();
            assert.equals(slaves.length, 1);
        }));
    }
});
