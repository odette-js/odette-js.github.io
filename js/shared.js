application.scope().run(function (app, _, factories) {
    window.app = application.scope();
    Waves.init();
    $(function () {
        var promise;
        var documentManager = $(document).index(0);
        var $gst = window.gst = $('.global-sidebar-toggler').index(0);
        documentManager.on('click', '.page-content', function (e) {
            if (promise) {
                if (promise.is('rejectableOnClick')) {
                    promise.reject();
                }
                promise.mark('rejectableOnClick');
                promise.resolve();
            }
            if ($gst.is('clickTogglerOpen')) {
                promise = _.Promise().success(function () {
                    promise = null;
                    $gst.close();
                }).failure(function () {
                    promise = null;
                });
            }
        }).on({
            swiperight: function () {
                $gst.open();
                return promise && promise.reject();
            },
            swipeleft: function () {
                $gst.close();
                return promise && promise.reject();
            }
        });
    });
});