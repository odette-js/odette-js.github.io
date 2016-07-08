application.scope().run(window, function (app, _, factories, documentView, scopedFactories, $) {
    window.app = application.scope();
    Waves.init();
    $(function () {
        var documentManager = $(document).first(),
            globalSidebarToggleManager = documentManager.$('.global-sidebar-toggler').first(),
            wasopen = false,
            lastScrolling,
            deferredFinished = _.AF.defer(function () {
                var $body = $('body');
                var scopedClass = 'scrolling-' + lastScrolling;
                return $body.hasClass(scopedClass) ? $body.removeClass('is-scrolling ' + scopedClass) : false;
            }, 100);
        documentManager.on('mousedown', function () {
            // check if it was open on the way up
            wasopen = globalSidebarToggleManager.is('clickTogglerOpen');
        }, true).on('click', '.page-content', function (e) {
            if (wasopen && globalSidebarToggleManager.is('clickTogglerOpen')) {
                globalSidebarToggleManager.close();
            }
        }).on({
            swiperight: function () {
                globalSidebarToggleManager.open();
            },
            swipeleft: function () {
                globalSidebarToggleManager.close();
            },
            scroll: function (e) {
                var adding, target = $.returnsManager(e.target),
                    previousScrolling = lastScrolling,
                    owner = target.owner,
                    $body = owner.$('body').item(0);
                // needed a unique id
                lastScrolling = target.__elid__;
                adding = 'is-scrolling scrolling-' + lastScrolling;
                if (previousScrolling === lastScrolling) {
                    $body.addClass(adding);
                } else {
                    $body.changeClass('scrolling-' + previousScrolling, adding);
                }
                deferredFinished();
            }
        });
    });
});