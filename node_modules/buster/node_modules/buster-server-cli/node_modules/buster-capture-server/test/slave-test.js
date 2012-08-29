var buster = require("buster");
var assert = buster.assert;
var refute = buster.refute;

var bCapServSlave = require("../lib/slave");
var bCapServPubsubClient = require("../lib/pubsub-client");
var bCapServPubsubServer = require("./../lib/pubsub-server");
var bResources = require("ramp-resources");
var http = require("http");
var faye = require("faye");
var when = require("when");
var h = require("./test-helper");

buster.testCase("slave", {
    setUp: function (done) {
        var self = this;

        this.httpServer = http.createServer(function (req, res) {
            if (self.resourceMiddleware.respond(req, res)) return;
            res.writeHead(h.NO_RESPONSE_STATUS_CODE); res.end();
        });
        this.httpServer.listen(h.SERVER_PORT, done);

        this.ps = bCapServPubsubServer.create("/messaging");
        this.ps.attach(this.httpServer);
        this.pc = this.ps.createClient();
        this.resourceMiddleware = bResources.resourceMiddleware.create();

        this.slave = bCapServSlave.create(this.resourceMiddleware, this.ps);
    },

    tearDown: function (done) {
        this.httpServer.on("close", done);
        this.httpServer.close();
    },

    "serves prison": function (done) {
        h.request({path: this.slave.prisonPath}, done(function (res, body) {
            assert.equals(res.statusCode, 200);
            assert.equals(body.match(/<frame[^s]/g).length, 1);
        })).end()
    },

    "serves prison with header": function (done) {
        var rs = bResources.resourceSet.create();
        this.slave.setHeader(100, rs);
        h.request({path: this.slave.prisonPath}, done(function (res, body) {
            assert.equals(res.statusCode, 200);
            assert.equals(body.match(/<frame[^s]/g).length, 2);
        })).end()
    },

    "mounts header resource set": function (done) {
        var headerContent = "<p>The header is here.</p>";
        var rs = bResources.resourceSet.create();
        rs.addResource({
            path: "/",
            content: headerContent
        });
        this.slave.setHeader(100, rs);

        h.request({path: this.slave.headerPath}, done(function (res, body) {
            assert.equals(res.statusCode, 200);
            assert.equals(body, headerContent);
        })).end()
    },

    "loading session": function (done) {
        var self = this;
        var sessionData = {foo: "bar"};
        var session = {serialize: function () { return sessionData }};

        this.pc.on("slave:" + this.slave._id + ":session:load", function (s) {
            assert.equals(s, sessionData);
            self.pc.emit("slave:" + self.slave._id + ":session:loaded");
        });

        this.slave.loadSession(session).then(done);
    },

    "unloading session": function (done) {
        var self = this;
        assert(true);

        this.pc.on("slave:" + this.slave._id + ":session:unload", function (s) {
            self.pc.emit("slave:" + self.slave._id + ":session:unloaded");
        });

        this.slave.unloadSession().then(done);
    },

    "preparing when ready": function (done) {
        assert(true);
        this.slave.isReady = true;
        this.slave.prepare().then(done);
    },

    "defaults to not ready": function () {
        assert.isFalse(this.slave.isReady);
    },

    "preparing when not ready": function (done) {
        assert(true);
        this.slave.prepare().then(done(function () {
            assert(this.slave.isReady);
        }.bind(this)));
        this.pc.emit("slave:" + this.slave._id + ":imprisoned", {});
    },

    "with mock browser": {
        setUp: function (done) {
            var self = this;
            this.mockBrowser = bCapServPubsubClient.create({
                host: "0.0.0.0",
                port: h.SERVER_PORT
            })
            this.mockBrowser.connect().then(function () {
                self.mockBrowser.emit(
                    "slave:" + self.slave._id + ":imprisoned",
                    {
                        pubsubClientId: self.mockBrowser.id
                    }
                );
            });

            this.slave.prepare().then(done);
        },

        tearDown: function () {
            this.mockBrowser.disconnect();
        },

        "ends when browser disconnects": function (done) {
            assert(true);
            this.mockBrowser.disconnect();
            this.slave.on("end", done);
        }
    },

    "serializing": function () {
        var expected = {
            prisonPath: this.slave.prisonPath,
            id: this.slave._id
        }

        assert.match(this.slave.serialize(), expected);
    },

    "teardown makes prison unavailable": function (done) {
        this.slave.teardown();

        h.request({path: this.slave.prisonPath}, done(function (res, body) {
            assert.equals(res.statusCode, h.NO_RESPONSE_STATUS_CODE);
        })).end()
    },

    "teardown tears down pubsub client": function () {
        var stub = this.stub(this.slave._pubsubClient, "teardown");
        this.slave.teardown();
        assert.calledOnce(stub);
    },

    "teardown removes pubsub listener": function () {
        var stub = this.stub(this.slave._pubsubServer, "removeListener");
        this.slave.teardown();
        assert.calledOnce(stub);
        var args = stub.getCall(0).args;
        assert.equals(args[0], "client:disconnect");
        assert.same(args[1], this.slave._clientDisconnectListener);
    },

    "teardown unmounts header": function (done) {
        var rs = bResources.resourceSet.create();
        this.slave.setHeader(100, rs);

        this.slave.teardown();

        h.request({path: this.slave.headerFramePath}, done(function (res, body) {
            assert.equals(res.statusCode, h.NO_RESPONSE_STATUS_CODE);
        })).end()
    }
});
