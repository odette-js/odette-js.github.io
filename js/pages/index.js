application.scope().run(window, function (app, _, factories, documentView, scopedFactories, $) {
    documentView.addRegion({
        marketingCards: '.marketing-cards'
    });
    var marketingCardRegion = documentView.getRegion('marketingCards');
    var MarketingCard = marketingCardRegion.Child = scopedFactories.View.extend('MarketingCard', {
        template: $.compile('marketing-card'),
        attributes: {
            class: 'marketing-card col s12 m6 l4'
        }
    });
    marketingCardRegion.add([{
        link: '/api/v0/directive',
        headline: 'Decoupled Directives',
        content: 'Organization is key for Odette. No more underscores to lead your private method names. We\'ve solved these problems and more with decoupled, reusable, extendable, and lazy created objects.'
    }, {
        link: '/api/v0/doma',
        headline: 'DOM Abstraction',
        content: 'It\'s <span is="time-year"></span>. Why is there not an abstracted DOM layer yet? We have one. Enjoy custom behaviors tied to attributes, any event you can throw at it, custom event bubbling, and lifecycle control ahead of its time.'
    }, {
        link: '/api/v0/buster',
        headline: 'Multi Window Centric',
        content: 'Monotize your site as fast as you can code it. Cross origin? No problem. Not your content? Easy. Odette enables anyone who can dream big to go big and still keep their site safe.'
    }, {
        link: '/api/v0/application',
        headline: 'Many Version Ready',
        content: 'Can\'t bump your code version that your clients already have? Keep all of it clean and separate with multiple versions. Create a singular global for yourself, and sub-apps on the same page with ease.'
    }, {
        link: '/api/v0/promise',
        headline: 'More than JS',
        content: 'The new keyword is old news... and we\'re still in ES5. We\'ve reengineered promises from the ground up with ES6\'s spec... then we made it extendable. Collections, Models, Events, Modules, it\'s all here... just better.'
    }, {
        link: '/api/v0/tests',
        headline: 'Unit Tests',
        content: 'Write basic unit tests to make sure your code will always perform to perfection with our Baked-In testing suite. Only the things you need, with all of the goodies you\'re used to. Not enough? Odette empowers you to make your own test types for whatever your need may be.'
    }]);
});