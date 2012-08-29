var buster = require("buster");
var assert = buster.assert;
var refute = buster.refute;

var bCapServ = require("../lib/buster-capture-server");
var bCapServServer = require("../lib/server");

buster.testCase("buster-capture-server", {
    "should create server": function () {
        var s = bCapServ.createServer();
        assert(bCapServServer.isPrototypeOf(s));
    }
});