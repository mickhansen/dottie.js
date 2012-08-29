var util = require("util");

if (require.main != module) {
    util.puts("Integration test must be run manually - it is a visual test");
    util.puts("node " + __filename.replace(process.cwd(), ".") + "\n");
} else {
    run();
}

function run() {
    var buster = require("buster");
    var remoteRunner = require("../lib/runners/browser/remote-runner");
    var progressReporter = require("../lib/runners/browser/progress-reporter");

    var emitter = buster.eventEmitter.create();

    function emit(event, data, client) {
        return emitter.emit(event, {
            topic: event,
            data: data,
            clientId: client
        });
    };

    function addClient(id, client) {
        emit("ready", client, id);
        emit("suite:start", {}, id);
        reporter.addClient(id, clients[id - 1]);
    }

    var clients = ["Firefox 4.0.1", "Chrome 11", "Safari/534.24"];
    var runner = remoteRunner.create(emitter, [
        { id: 1 }, { id: 2 }, { id: 3 }
    ]);

    var reporter = progressReporter.create({
        outputStream: { write: require("util").print },
        color: true, bright: true
    }).listen(runner);

    util.puts("If this output looks good, we're fine. Control-C to abort");
    util.puts("\"Fine\": List of browsers with growing list of dots and letters");

    setTimeout(function () {
        addClient(1, clients[0]);
        addClient(2, clients[1]);

        var events = ["test:success", "test:error", "test:failure", "test:timeout"];

        function doIt() {
            emit(events[Math.floor(Math.random() * events.length)], {},
                 1 + Math.floor(Math.random() * clients.length));
        }

        setInterval(doIt, 50);
    }, 500);

    setTimeout(function () {
        clients.push("Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US))");
        addClient(3, clients[2]);
    }, 2000);
}
