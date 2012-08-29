var when = require("when");
var http = require("http");

function req(opts, cb) {
    opts.host = opts.host || "localhost";

    return http.request(opts, function (res) {
        var body = "";
        res.setEncoding("utf8");
        res.on("data", function (chunk) { body += chunk; });
        res.on("end", function () { cb(res, body) });
    });
}

module.exports = {
    captureSlave: function (port, ua) {
        // Avoiding circular require
        var bCapServ = require("./buster-capture-server");

        ua = ua || "Whatever";
        var deferred = when.defer();
        var self = this;

        var c = bCapServ.createServerClient(port);
        c.connect().then(function () {
            c.on("slave:captured", function (slave) {
                c.disconnect();
                deferred.resolve(slave);
            });

            req({path: "/capture", port: port}, function (res, body) {
                var slave = JSON.parse(body);
                c.emit("slave:" + slave.id + ":imprisoned", {userAgent: ua});
            }).end();
        });

        return deferred.promise;
    }
}
