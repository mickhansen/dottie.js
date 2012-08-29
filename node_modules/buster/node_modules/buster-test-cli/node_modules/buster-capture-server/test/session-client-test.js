 buster = require("buster");
var assert = buster.assert;
var refute = buster.refute;

var bCapServSessionClient = require("../lib/session-client");
var bCapServSession = require("../lib/session");
var bCapServPubsubServer = require("./../lib/pubsub-server");
var http = require("http");
var when = require("when");
var h = require("./test-helper");

buster.testCase("session client", {
    setUp: function (done) {
        var self = this;

        this.httpServer = http.createServer();
        this.httpServer.listen(h.SERVER_PORT, function () {
            bCapServSession.create({}, self.ps).then(done(function (session) {
                self.session = session;
                self.sessionData = session.serialize();

                self.publicPubsub =
                    self.ps.createClient(self.sessionData.messagingPath);
                self.privatePubsub =
                    self.ps.createClient(self.sessionData.privateMessagingPath);
            }));
        });

        this.ps = bCapServPubsubServer.create(null, "/messaging");
        this.ps.attach(this.httpServer);

        this.pc = this.ps.createClient();
    },

    tearDown: function (done) {
        this.httpServer.on("close", done);
        this.httpServer.close();
    },

    "should end": function (done) {
        assert(true)
        var sc = bCapServSessionClient._create(this.sessionData, this.pc);
        this.privatePubsub.on("end", done);
        sc.end();
    },

    "should resolve end promise": function (done) {
        assert(true)
        var sc = bCapServSessionClient._create(this.sessionData, this.pc);
        sc.end().then(done);
        this.session.ended();
    },

    "publishing init event emits init data": function (done) {
        this.privatePubsub.on("initialize", done(function (data) {
            assert.equals(data, sc._getInitData());
        }));

        var sc = bCapServSessionClient._create(this.sessionData, this.pc);
    },

    "init data as owner": function () {
        var sc = bCapServSessionClient._create(this.sessionData, this.pc, {owner: true});
        assert.match(sc._getInitData(), {isOwner: true});
    },

    "init data as non-owner": function () {
        var sc = bCapServSessionClient._create(this.sessionData, this.pc);
        assert.match(sc._getInitData(), {isOwner: false});
    },

    "default client": {
        setUp: function () {
            this.sc = bCapServSessionClient._create(this.sessionData, this.pc);
        },

        "resolves started promise when starting": function (done) {
            assert(true);
            this.sc.onStart(done);
            this.session.started();
        },

        "resolves loaded and started when loading": function (done) {
            assert(true);
            when.all([this.sc.onStart(), this.sc.onLoad()]).then(done);
            this.session.loaded([]);
        },

        "resolves loaded with slaves": function (done) {
            var slave = h.mockSlave();
            this.sc.onLoad(done(function (slaves) {
                assert.equals(slaves, [slave.serialize()]);
            }));
            this.session.loaded([slave]);
        },

        "resolves loaded, started and ended when ending": function (done) {
            assert(true);
            when.all([this.sc.onStart(), this.sc.onLoad(), this.sc.onEnd()]).then(done);
            this.session.ended();
        },

        "resolves loaded, started, ended and unloaded when unloading": function (done) {
            assert(true);
            when.all([this.sc.onStart(), this.sc.onLoad(), this.sc.onEnd(), this.sc.onUnload()]).then(done);
            this.session.unloaded();
        },

        "emitting with client id": function (done) {
            var self = this;

            this.sc.on("foo", done(function (e) {
                assert.equals(e.data, 123);
                assert.equals(e.clientId, self.sc.clientId);
            }));

            this.sc.emit("foo", 123);
        },

        "emitting with custom client id": function (done) {
            this.sc.clientId = "123abc";
            this.sc.on("foo", done(function (e) {
                assert.equals(e.data, 123);
                assert.equals(e.clientId, "123abc");
            }));
            this.sc.emit("foo", 123);
        },

        "stores session properties": function () {
            assert.equals(this.sc.sessionId, this.sessionData.id);
            assert.equals(this.sc.resourcesPath, this.sessionData.resourcesPath);
        },

        "notifies when slaves are captured": function (done) {
            var self = this;
            var mockSlave = {id: "123abcdef"};
            this.sc.onSlaveCaptured(done(function (e) {
                assert.equals(e.slave, mockSlave);
                assert.equals(e.slaves, [mockSlave]);
            }));

            this.privatePubsub.emit("slave:captured", {
                slave: mockSlave,
                slaves: [mockSlave]
            });
        },

        "notifies when slaves are freed": function (done) {
            var self = this;
            var mockSlaveA = {id: "123abcdef"};
            var mockSlaveB = {id: "456defabc"};
            this.sc.onSlaveFreed(done(function (e) {
                assert.equals(e.slave, mockSlaveA);
                assert.equals(e.slaves, [mockSlaveB]);
            }));

            this.privatePubsub.emit("slave:freed", {
                slave: mockSlaveA,
                slaves: [mockSlaveB]
            });
        },

        "notifies on abort": function (done) {
            var spy = this.spy();

            this.sc.onAbort(done(function (e) {
                assert.equals(e.error, "An error");
            }));

            this.session.aborted({message: "An error"});
        },

        "notifies on abort when aborting before registering": function (done) {
            var spy = this.spy();

            this.session.aborted({message: "An error"});

            this.sc.onAbort(done(function (e) {
                assert.equals(e.error, "An error");
            }));
        }
    },

    "also sets state when initializing": function (done) {
        assert(true);

        this.session.loaded([]);
        var sc = bCapServSessionClient._create(this.sessionData, this.pc);
        sc.onLoad(done);
    }
});
