var buster = require("buster");
var assert = buster.assert;
var refute = buster.refute;

var bCapServ = require("../lib/buster-capture-server");
var bCapServSlave = require("./../lib/slave.js");
var bCapServSessionClient = require("../lib/session-client");
var bResources = require("ramp-resources");
var http = require("http");
var when = require("when");
var h = require("./test-helper");

buster.testCase("server", {
    setUp: function (done) {
        this.httpServer = http.createServer(function (req, res) {
            res.writeHead(h.NO_RESPONSE_STATUS_CODE); res.end();
        });
        this.httpServer.listen(h.SERVER_PORT, function () {
            this.c.connect().then(done);
        }.bind(this));

        this.s = bCapServ.createServer();
        this.s.attach(this.httpServer);

        this.c = bCapServ.createServerClient(h.SERVER_PORT);

        this.rs = bResources.resourceSet.create();
    },

    tearDown: function (done) {
        this.httpServer.on("close", done);
        this.httpServer.close();
        this.c.disconnect();
    },

    "should create new session successfully": function (done) {
        var self = this;
        this.c.createSession(this.rs).then(
            done(function (sessionClient) {
                assert(bCapServSessionClient.isPrototypeOf(sessionClient));
                assert(self.s._sessionQueue._sessions.some(function (s) {
                    return s.id = sessionClient.sessionId;
                }));
            })
        );
    },

    "should not create invalid session": function (done) {
        this.c.createSession(this.rs, {unknownProperty: true}).then(
            function () {},
            done(function (err) {
                assert.match(err.message, "unknown property");
            })
        );
    },

    "listens to slave:captured on session queue": function () {
        this.stub(this.s, "_onSlaveCaptured");
        this.s._sessionQueue.emit("slave:captured", "foo");
        assert.calledOnce(this.s._onSlaveCaptured);
        assert.calledWithExactly(this.s._onSlaveCaptured, "foo");
    },

    "listens to slave:freed on session queue": function () {
        this.stub(this.s, "_onSlaveFreed");
        this.s._sessionQueue.emit("slave:freed", "foo");
        assert.calledOnce(this.s._onSlaveFreed);
        assert.calledWithExactly(this.s._onSlaveFreed, "foo");
    },

    "capturing slave emits event and mounts resource set": function (done) {
        var slave = h.mockSlave();

        this.s._pubsubClient.connect();
        this.s._pubsubClient.on("slave:captured", done(function (e) {
            assert.equals(e, slave.serialize());
        }));
        this.s._onSlaveCaptured(slave);
    },

    "freeing slave emits event and unmounts resource set": function (done) {
        var slave = h.mockSlave();

        this.s._pubsubClient.connect();
        this.s._pubsubClient.on("slave:freed", done(function (e) {
            assert.equals(e, slave.serialize());
        }));

        this.s._onSlaveFreed(slave);
        assert.calledOnce(slave.teardown);
    },

    "should create new slave via HTTP": function (done) {
        var slave = h.mockSlave();
        this.stub(bCapServSlave, "create").returns(slave);
        this.stub(this.s._sessionQueue, "addSlave");

        h.request({path: "/capture", method: "GET"}, done(function (res, body) {
            assert.equals(res.statusCode, 302);
            assert.equals(res.headers["location"], slave.prisonPath);
            assert.equals(JSON.parse(body), slave.serialize());

            assert.calledOnce(this.s._sessionQueue.addSlave);
            assert.same(this.s._sessionQueue.addSlave.getCall(0).args[0], slave);
        }.bind(this))).end();
    },

    "should create slave with custom capture path": function (done) {
        this.s.capturePath = "/foo";
        h.request({path: "/foo"}, done(function (res, body) {
            var slave = JSON.parse(body);

            assert.equals(res.statusCode, 302);
            assert.equals(res.headers["location"], slave.prisonPath);
        })).end();
    },

    "should list cache via HTTP": function (done) {
        var resources = [{foo: "bar"}]
        this.stub(this.s._resourceCache, "resourceVersions").returns(resources);

        h.request({path: "/resources"}, done(function (res, body) {
            assert.equals(res.statusCode, 200);
            assert.equals(JSON.parse(body), resources);
        })).end();
    },

    "should purge cache via HTTP": function (done) {
        var stub = this.stub(this.s._resourceCache, "purgeAll");

        h.request({path: "/resources", method: "DELETE"}, done(function (res, body) {
            assert.equals(res.statusCode, 200);
            assert.calledOnce(stub);
        })).end();
    },

    "preparing session inflates and mounts": function () {
        var session = {resourceSet: {}, resourcesPath: "/foo"};

        var rs = {};
        var inflateDeferred = when.defer();
        inflateDeferred.resolve(rs);

        this.stub(this.s._resourceCache, "inflate").returns(inflateDeferred.promise);
        this.stub(this.s._resourceMiddleware, "mount");

        this.s._sessionQueue.prepareSession(session);

        assert.calledOnce(this.s._resourceMiddleware.mount)
        var args = this.s._resourceMiddleware.mount.getCall(0).args;
        assert.equals(args[0], session.resourcesPath)
        assert.same(args[1], rs)
    },

    "teardown session unmounts": function () {
        var session = {resourcesPath: "/fofoafo", teardown: this.spy()};
        this.stub(this.s._resourceMiddleware, "unmount");
        this.s._sessionQueue.teardownSession(session);

        assert.calledOnce(this.s._resourceMiddleware.unmount);
        assert.calledWithExactly(this.s._resourceMiddleware.unmount, "/fofoafo");
        assert.calledOnce(session.teardown);
    },

    "serves resources middleware": function () {
        var req = {url: "/foo", method: "GET"};
        var res = {};
        this.stub(this.s._resourceMiddleware, "respond");
        this.s._respond(req, res);

        assert.calledOnce(this.s._resourceMiddleware.respond);
        var args = this.s._resourceMiddleware.respond.getCall(0).args;
        assert.same(args[0], req);
        assert.same(args[1], res);
    },

    "should not set header on slaves when header is not specified": function (done) {
        var stub = this.stub(bCapServSlave, "setHeader");

        h.request({path: "/capture", method: "GET"}, done(function (res, body) {
            refute.called(stub);
        })).end();
    },

    "should set header on slaves": function (done) {
        var stub = this.stub(bCapServSlave, "setHeader");
        var height = 100;
        var resourceSet = {};
        this.s.setHeader(height, resourceSet);

        h.request({path: "/capture", method: "GET"}, done(function (res, body) {
            assert.calledOnce(stub);
            var args = stub.getCall(0).args;
            assert.equals(args[0], height);
            assert.same(args[1], resourceSet);
        })).end();
    },

    "should get list of slaves from session queue": function () {
        var slaves = [{foo: "bar"}];
        this.s._sessionQueue.slaves = function () { return slaves };
        assert.equals(this.s.slaves(), slaves);
    },

    "serves slave prison": function (done) {
        bCapServ.testHelper.captureSlave(h.SERVER_PORT).then(function (slave) {
            h.request({path: slave.prisonPath, method: "GET"}, done(function (res, body) {
                assert.equals(res.statusCode, 200);
            })).end();
        });
    },

    "should re-capture when visiting slave like URL for non-existant slave": function (done) {
        var self = this;

        h.request({path: "/slaves/123-def/browser", method: "GET"}, done(function (res, body) {
            assert.equals(res.statusCode, 302);
            assert.equals(res.headers["location"], self.s.capturePath);
        })).end();
    },

    // Needs to get a chance to load the first time
    "should not re-capture immediately after capture": function (done) {
        h.request({path: this.s.capturePath}, function (res, body) {
            var slave = JSON.parse(body);
            h.request({path: slave.prisonPath}, done(function (res, body) {
                refute(res.headers["location"]);
                assert.equals(res.statusCode, 200);
            })).end();
        }).end();
    },

    "// should fail if attempting to load uncached items": function () {
    },

    "// should not send cached resources to server": function (done) {
    }
});
