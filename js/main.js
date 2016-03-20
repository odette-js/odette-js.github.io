application.scope().run(function (app, _, factories) {
    // initialize the waves plugin
    Waves.init();
    // create a year tag so we never have to update it
    (function () {
        var currentYear = (new Date()).getYear() + 1900;
        $.registerElement('time-year', {
            onCreate: function (manager) {
                manager.html(currentYear);
            }
        });
    }());
    // create a text-reveal tag so we never have to update it
    $(function () {
        $.registerElement('text-reveal', {
            onCreate: function (manager) {
                setTimeout(_.bind(manager.show, manager), manager.data('time') || 0);
            },
            // overwrites the show hide in DomManager to provide awesome effects
            prototype: {
                show: function () {
                    this.addClass('showing');
                },
                hide: function () {
                    this.removeClass('showing');
                }
            }
        });
    });
});