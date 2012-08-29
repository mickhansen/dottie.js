(function () {
    buster.captureServer.prisonUtil.addEventListener(window, "load", function () {
        var prison = buster.captureServer.prison.create();
        prison.listen();

        buster.captureServer.sharedPrison = prison;
    });
}());