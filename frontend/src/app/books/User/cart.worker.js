/// <reference lib="webworker" />
addEventListener('message', function (_a) {
    var data = _a.data;
    var response = "worker response to ".concat(data);
    postMessage(response);
});
