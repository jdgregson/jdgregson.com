"use strict";
var initApp = function () {
    // Register a service worker to enable app installation as a PWA
    navigator.serviceWorker.register('sw.js');
    initStardust({
        'actions': {},
        'options': {}
    });
};
//# sourceMappingURL=app.js.map