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
            events: {
                click: 'restart'
            },
            prototype: {
                show: function () {
                    this.addClass('showing');
                },
                hide: function () {
                    this.removeClass('showing');
                },
                restart: function () {
                    var manager = this;
                    manager.hide();
                    setTimeout(_.bind(manager.show, manager), 1000);
                }
            }
        });
    });
    app.addRegion({
        marketingCards: '.marketing-cards'
    });
    var marketingCardRegion = app.getRegion('marketingCards');
    var MarketingCard = marketingCardRegion.Child = factories.View.extend('MarketingCard', {
        className: 'marketing-card col s12 m6 l4',
        template: $.compile('marketing-card')
    });
    marketingCardRegion.add([{
        headline: 'Decoupled Directives',
        content: 'Organization is key for Odette. No more underscores to lead your private method names. We\'ve solved these problems, and more with decoupled, reusable, extendable, and lazy created objects.'
    }, {
        headline: 'DOM Abstraction',
        content: 'It\'s <span data-custom="time-year"></span>. Why is there not an abstracted DOM layer yet? We have one. Enjoy custom behaviors in tags, any event you can throw at it, bubbling, and lifecycle control ahead of its time.'
    }, {
        headline: 'Multi Window Centric',
        content: 'Monotize your site as fast as you can code it. Cross origin? No problem. Not your content? Easy. Odette enables anyone who can dream big to go big and still keep their site safe.'
    }, {
        headline: 'Many Version Ready',
        content: 'Can\'t bump your code version that your clients already have? Keep all of it clean and separate with multiple versions. Create a global for yourself, and sub-apps on the same page with ease.'
    }, {
        headline: 'More than JS',
        content: 'The new keyword is old news... and we\'re still in ES5. We\'ve reengineered promises... better than ES6. Collections, Models, Events, Modules, it\'s all here... just better.'
    }, {
        headline: 'Unit Tests',
        content: 'Write basic unit tests to make sure your code will always perform to perfection with our Baked-In testing suite. Only the things you need, with all of the goodies you\'re used to.'
    }]);
});