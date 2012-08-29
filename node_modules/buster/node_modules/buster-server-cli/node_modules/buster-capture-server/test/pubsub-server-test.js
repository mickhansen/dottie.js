var buster = require("buster");
var assert = buster.assert;
var refute = buster.refute;
var sinon = require("sinon");

var bCapServPubsubServer = require("./../lib/pubsub-server");
var bCapServPubsubClient = require("./../lib/pubsub-client");
var http = require("http");
var faye = require("faye");
var when = require("when");
var h = require("./test-helper");

buster.testCase("pubsub server", {
    setUp: function (done) {
        this.httpServer = http.createServer();
        this.httpServer.listen(h.SERVER_PORT, done);

        this.ps = bCapServPubsubServer.create("/messaging");
        this.ps.attach(this.httpServer);
    },

    tearDown: function (done) {
        this.httpServer.on("close", done);
        this.httpServer.close();
    },

    "client is faye adapter client": function () {
        var expected = this.ps._fayeAdapter.getClient();
        assert.same(this.ps.getClient(), expected);
        assert.same(this.ps.getClient(), expected);
    },

    "attach attaches faye adapter": function () {
        var httpServer = {};
        this.stub(this.ps._fayeAdapter, "attach");

        this.ps.attach(httpServer);

        assert.calledOnce(this.ps._fayeAdapter.attach);
        assert.same(this.ps._fayeAdapter.attach.getCall(0).args[0], httpServer);
    },

    "stores list of pubsub clients": function (done) {
        var self = this;

        var c1 = bCapServPubsubClient.create({
            host: "0.0.0.0",
            port: h.SERVER_PORT
        })
        c1.connect().then(function () {
            var c2 = bCapServPubsubClient.create({
                host: "0.0.0.0",
                port: h.SERVER_PORT
            })
            c2.connect().then(done(function () {
                c1.disconnect();
                c2.disconnect();

                var clients = self.ps._pubsubClients;
                assert.equals(Object.keys(clients).length, 2);

                assert(clients[c1.id].fayeClientId);
                assert(clients[c2.id].fayeClientId);
            }));
        });
    },

    "emits event when pubsub client disconnects": function (done) {
        var self = this;

        var c1 = bCapServPubsubClient.create({
            host: "0.0.0.0",
            port: h.SERVER_PORT
        })
        c1.connect().then(function () {
            c1.disconnect();
        });

        self.ps.on("client:disconnect", done(function (clientId) {
            assert.equals(c1.id, clientId);
        }));
    },

    "removes stored pubsub client when it disconnects": function (done) {
        var self = this;

        var c1 = bCapServPubsubClient.create({
            host: "0.0.0.0",
            port: h.SERVER_PORT
        })
        c1.connect().then(function () {
            c1.disconnect();
        });

        self.ps.on("client:disconnect", done(function (clientId) {
            var clients = self.ps._pubsubClients;
            assert.equals(Object.keys(clients).length, 0);
        }));
    },

    "creating new client": function () {
        var spy = this.spy(bCapServPubsubClient, "create");
        var c = this.ps.createClient("/my/context/path");
        assert(spy.calledOnce);

        var opts = spy.getCall(0).args[0];
        assert.same(opts._fayeClient, this.ps._fayeAdapter.getClient());
        assert.equals(opts.contextPath, "/my/context/path");
    },
});
