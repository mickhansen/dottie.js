var buster = require("buster");
var assert = buster.assert;
var refute = buster.refute;

var bCapServ = require("../lib/buster-capture-server");
var rampResources = require("ramp-resources");
var http = require("http");
var faye = require("faye");
var when = require("when");
var h = require("./test-helper");

buster.testCase("server client", {
    setUp: function (done) {
        var self = this;

        this.httpServer = http.createServer();
        this.httpServer.listen(h.SERVER_PORT, function () {
            self.rs = rampResources.resourceSet.create();
            self.rs.addResources([
                {path: "/", etag: "123abc", content: "foo"},
                {path: "/test", etag: "456def", content: "bar"}
            ]).then(function () {
                self.rs.serialize().then(done(function (rs) {
                    self.rsSrl = rs;
                }));
            });
        });

        this.c = bCapServ.createServerClient(h.SERVER_PORT);
    },

    tearDown: function (done) {
        this.httpServer.on("close", done);
        this.httpServer.close();
    },

    "should create session with serialized resource set": function (done) {
        var self = this;

        onRequest(this.httpServer, done(function (req, res, body) {
            var expected = {resourceSet: self.rsSrl, foo: "bar"};
            assert.equals(JSON.parse(body), expected);
            res.end();
        }));

        this.c.createSession(this.rs, {foo: "bar"});
    },

    "should check server for cache": function (done) {
        var self = this;
        onRequest(this.httpServer, done(function (req, res, body) {
            assert.calledWith(self.rs.serialize, [1, 2, 3]);
            // Also does not send internal cache prop to server
            refute.match(JSON.parse(body), {cache: true});
            res.end();
        }));

        var deferred = when.defer();
        this.stub(this.c, "_getCachedResources");
        this.c._getCachedResources.returns(deferred.promise);
        deferred.resolve([1, 2, 3]);

        this.spy(this.rs, "serialize");
        this.c.createSession(this.rs, {cache: true});
    },

    "should fail if unable to get cached resources": function (done) {
        var deferred = when.defer();
        this.stub(this.c, "_getCachedResources");
        this.c._getCachedResources.returns(deferred.promise);
        deferred.reject({message: "An error"});

        this.c.createSession(this.rs, {cache: true}).then(
            function () {},
            done(function (err) {
                assert.equals(err.message, "An error");
            })
        );
    },

    "should fail if resource set serialization fails": function (done) {
        var deferred = when.defer();
        this.stub(this.rs, "serialize");
        this.rs.serialize.returns(deferred.promise);
        deferred.reject({message: "An error"});

        this.c.createSession(this.rs).then(
            function () {},
            done(function (err) {
                assert.equals(err.message, "An error");
            })
        );
    },

    "getting cached resources performs request to server": function (done) {
        var self = this;
        var i = 0;

        onRequest(this.httpServer, function (req, res, body) {
            switch (++i) {
            case 1:
                assert.equals(req.method, "GET");
                assert.equals(req.url, "/resources");
                res.end('{"foo":"bar"}');
                break;
            case 2:
                assert.calledWith(self.rs.serialize, {foo: "bar"});
                res.end();
                done();
                break;

            }
        });

        this.spy(this.rs, "serialize");
        this.c.createSession(this.rs, {cache: true});
    },

    "connected": {
        setUp: function (done) {
            this.fayeAdapter = new faye.NodeAdapter({mount: "/messaging"});
            this.fayeAdapter.attach(this.httpServer);
            this.fayeClient = this.fayeAdapter.getClient();

            this.c.connect().then(done);
        },

        tearDown: function () {
            this.c.disconnect()
        },

        "test has evnets": function (done) {
            this.c.on("foo", done(function (e) {
                assert.equals(e, "bar");
            }));
            this.c.emit("foo", "bar");
        }
    },

    "should clear cache": function (done) {
        var self = this;

        onRequest(this.httpServer, done(function (req, res, body) {
            assert.equals(req.url, "/resources");
            assert.equals(req.method, "DELETE");
            res.end();
        }));

        this.c.clearCache();
    },

    "should reject promise when connecting to non-existant server": function (done) {
        this.c = bCapServ.createServerClient(h.SERVER_PORT - 1);
        this.c.connect().then(function(){}, done(function (err) {
            assert(err);
        }));
    },
});

function onRequest(httpServer, cb) {
    httpServer.on("request", function (req, res) {
        var body = "";
        req.setEncoding("utf8");
        req.on("data", function (chunk) { body += chunk;});
        req.on("end", function () {
            cb(req, res, body)
        });
    });
}
