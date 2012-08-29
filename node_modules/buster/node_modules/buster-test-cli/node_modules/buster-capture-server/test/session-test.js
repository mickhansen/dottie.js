var buster = require("buster");
var assert = buster.assert;
var refute = buster.refute;

var bCapServPubsubClient = require("../lib/pubsub-client");
var bCapServPubsubServer = require("./../lib/pubsub-server");
var bCapServSession = require("../lib/session");
var bCapServSessionClient = require("../lib/session-client");
var rampResources = require("ramp-resources");
var http = require("http");
var faye = require("faye");
var when = require("when");
var h = require("./test-helper");

buster.testCase("Session", {
    setUp: function (done) {
        this.rs = rampResources.resourceSet.create();
        this.rs.addResource({path: "/foo.js", content: "var foo = 5;"});
        this.rs.serialize().then(done(function (rsSrl) {
            this.rsSrl = rsSrl;
        }.bind(this)));
    },

    "should create with resource set": function (done) {
        var sessionData = {resourceSet: this.rsSrl};

        bCapServSession.create(sessionData, h.mockPubsubServer()).then(done(function (session) {
            assert(bCapServSession.isPrototypeOf(session));
        }.bind(this)));
    },

    "should create non-joinable": function (done) {
        var sessionData = {resourceSet: {}, joinable: false};

        bCapServSession.create(sessionData, h.mockPubsubServer()).then(done(function (session) {
            assert.isFalse(session.joinable);
        }.bind(this)));
    },

    "should not share resource paths": function (done) {
        var sessions = [
            bCapServSession.create({}, h.mockPubsubServer()),
            bCapServSession.create({}, h.mockPubsubServer())
        ];
        when.all(sessions).then(done(function (sessions) {
            var s1 = sessions[0];
            var s2 = sessions[1];
            assert(s1);
            assert(s2);

            refute.equals(s1.id, s2.id);
            refute.equals(s1.resourcesPath, s2.resourcesPath);
        }));
    },

    "should have static resource paths when specified": function (done) {
        var sessions = [
            bCapServSession.create({staticResourcesPath: true}, h.mockPubsubServer()),
            bCapServSession.create({staticResourcesPath: true}, h.mockPubsubServer())
        ];
        when.all(sessions).then(done(function (sessions) {
            var s1 = sessions[0];
            var s2 = sessions[1];

            assert.equals(s1.resourcesPath, s2.resourcesPath);
        }));
    },

    "should reject when creation fails": function (done) {
        bCapServSession.create({unknownProp: true}, h.mockPubsubServer()).then(
            function () {},
            done(function (err) {
                assert.equals(err.message, "Unknown property 'unknownProp'.");
            })
        );
    },

    "should reject when creation fails when deserializing": function (done) {
        var deferred = when.defer();
        this.stub(rampResources.resourceSet, "deserialize");
        rampResources.resourceSet.deserialize.returns(deferred.promise);
        deferred.reject({message: "Foo"});

        bCapServSession.create({resourceSet: {}}, h.mockPubsubServer()).then(
            function () {},
            done(function (err) {
                assert.equals(err.message, "Foo");
            })
        );
    },

    "instance": {
        setUp: function (done) {
            var self = this;

            this.httpServer = http.createServer();
            this.httpServer.listen(h.SERVER_PORT, function () {
                bCapServSession.create({}, self.ps).then(done(function (session) {
                    self.session = session;
                    self.sessionData = session.serialize();

                    self.pubsubClient = self.ps.createClient(self.session.messagingPath);
                    self.privatePubsubClient = self.ps.createClient(self.session.privateMessagingPath);
                }));
            });

            this.ps = bCapServPubsubServer.create(null, "/messaging");
            this.ps.attach(this.httpServer);
        },

        tearDown: function (done) {
            this.httpServer.on("close", done);
            this.httpServer.close();
        },

        "should serialize": function () {
            var serialized = this.session.serialize();
            assert.equals(serialized.id, this.session.id);
            assert.equals(serialized.resourcesPath, this.session.resourcesPath);
            assert.equals(serialized.messagingPath, this.session.messagingPath);
            assert.equals(serialized.state, this.session.state);
        },

        "should end session when receiving event": function (done) {
            assert(true);
            this.privatePubsubClient.emit("end");
            this.session.on("end", done);
        },

        "// should end when session owner disconnects": function (done) {
        },

        "should emit state when client initializes": function (done) {
            this.privatePubsubClient.on("state", done(function (e) {
                assert(e);
            }.bind(this)));
            this.privatePubsubClient.emit("initialize", {});
        },

        "notifies when session starts": function (done) {
            var self = this;
            assert.isFalse(self.session.state.started.reached);
            this.privatePubsubClient.on("state", done(function (e) {
                assert.isTrue(self.session.state.started.reached);
                assert.equals(e.state, self.session.state);
            }));
            this.session.started();
        },

        "notifies when session is loaded": function (done) {
            var self = this;
            var slave = h.mockSlave();
            assert.isFalse(self.session.state.loaded.reached);
            this.privatePubsubClient.on("state", done(function (e) {
                assert.isTrue(self.session.state.loaded.reached);
                assert.equals(e.state, self.session.state);
                assert.equals(e.state.loaded.data, [slave.serialize()]);
            }));
            this.session.loaded([slave]);
        },

        "notifies when session is aborted": function (done) {
            var self = this;
            this.privatePubsubClient.on("state", done(function (e) {
                assert.equals(e.aborted, "Some reason");
            }));
            this.session.aborted({message: "Some reason"});
        },

        "notifies when session is ended": function (done) {
            var self = this;
            assert.isFalse(self.session.state.ended.reached);
            this.privatePubsubClient.on("state", done(function (e) {
                assert.isTrue(self.session.state.ended.reached);
                assert.equals(e.state, self.session.state);
            }));
            this.session.ended();
        },

        "notifies when session is unloaded": function (done) {
            var self = this;
            assert.isFalse(self.session.state.unloaded.reached);
            this.privatePubsubClient.on("state", done(function (e) {
                assert.isTrue(self.session.state.unloaded.reached);
                assert.equals(e.state, self.session.state);
            }));
            this.session.unloaded();
        },

        "notifies when slave is captured": function (done) {
            var self = this;
            var slave = {foo: "bar"};
            this.privatePubsubClient.on("slave:captured", done(function (e) {
                assert.equals(e.slave, slave);
                assert.equals(e.slaves, [slave]);
            }));

            var slaveObj = {serialize: function () { return slave; }};
            this.session.capturedSlave(slaveObj, [slaveObj]);
        },

        "notifies when slave is freed": function (done) {
            var self = this;
            var slave = {foo: "bar"};
            this.privatePubsubClient.on("slave:freed", done(function (e) {
                assert.equals(e.slave, slave);
                assert.equals(e.slaves, [slave]);
            }));

            var slaveObj = {serialize: function () { return slave; }};
            this.session.freedSlave(slaveObj, [slaveObj]);
        },

        "should teardown": function () {
            this.stub(this.session, "_pubsubServerDetach");
            this.session.teardown();
            assert.calledOnce(this.session._pubsubServerDetach);
        }
    },

    "should create with resource set": function (done) {
        var self = this;
        var sessionData = {resourceSet: this.rsSrl};

        bCapServSession.create(sessionData, h.mockPubsubServer()).then(function (session) {
            assert(session.resourceSet);
            var foo = session.resourceSet.get("/foo.js");
            assert(foo);
            foo.content().then(done(function (data) {
                assert.equals(data, "var foo = 5;");
            }));
        });
    }
});
