var http = require("http");
var bCapServ = require("../lib/buster-capture-server");
var sinon = require("sinon");
var when = require("when");

var bCapServPubsubClient = require("./../lib/pubsub-client");

module.exports = {
    NO_RESPONSE_STATUS_CODE: 418,
    SERVER_PORT: 16178,
    PROXY_PORT: 16177,

    request: function (options, callback) {
        options.host = options.host || "localhost";
        options.port = options.port || this.SERVER_PORT;
        options.method = options.method || "GET";

        var req = http.request(options, function (res) {
            var body = "";
            res.on("data", function (chunk) { body += chunk; });
            res.on("end", function () { callback && callback(res, body); });
        });
        return req;
    },

    mockLogger: function (test) {
        return {
            error: test.spy(),
            warn: test.spy(),
            log: test.spy(),
            info: test.spy(),
            debug: test.spy()
        }
    },

    mockPubsubServer: function () {
        return buster.extend(buster.eventEmitter.create(), {
            getClient: function () { return module.exports.mockFayeClient() },
            createClient: function () {
                return bCapServPubsubClient.create({_fayeClient: this.getClient()})
            },
            addExtension: sinon.spy(),
            removeExtension: sinon.spy(),
            bind: sinon.spy(),
            unbind: sinon.spy()
        })
    },

    mockFayeClient: function () {
        return {
            publish: sinon.stub(),
            subscribe: sinon.stub(),
            disconnect: sinon.stub()
        }
    },

    mockSlave: function () {
        return buster.extend(buster.eventEmitter.create(), {
            prisonPath: "/foo/" + Math.random().toString(),

            teardown: sinon.spy(),

            prepare: sinon.spy(function () {
                this.readyDeferred = when.defer();
                this.readyDeferred.then(function () {
                    this.isReady = true;
                }.bind(this));
                return this.readyDeferred.promise;
            }),

            loadSession: sinon.spy(function () {
                this.loadSessionDeferred = when.defer();
                return this.loadSessionDeferred.promise;
            }),

            loadSessionComplete: function () {
                this.loadSessionDeferred.resolve();
                delete this.loadSessionDeferred;
            },

            unloadSession: sinon.spy(function () {
                this.unloadSessionDeferred = when.defer();
                return this.unloadSessionDeferred.promise;
            }),

            unloadSessionComplete: function () {
                this.unloadSessionDeferred.resolve();
                delete this.unloadSessionDeferred;
            },

            mockEnd: function () {
                this.emit("end");
            },

            serialize: function () {
                return this.serialized;
            },

            serialized: {foo: Math.random().toString()}
        });
    }
};
