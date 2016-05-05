application.scope().run(function (app, _, factories) {
    var Company = factories.Model.extend({
        idAttribute: 'name'
    });
    var Person = factories.Model.extend({
        idAttribute: 'name'
    });
    var PersonView = factories.View.extend({
        template: $.compile('profile-summary'),
        Model: Person,
        tagName: function () {
            return 'li';
        }
    });
    var ViewContainer = factories.View.extend({
        Child: PersonView,
        template: $.compile('profile-summary-container'),
        regions: function () {
            return {
                employees: '.employees'
            };
        }
    });
    app.addRegion({
        summaries: '#main-region'
    });
    var specless = Company({
        name: 'Specless',
        type: 'inc'
    });
    factories.HTTP('/json/data.json').success(function (data) {
        var summaries = app.getRegion('summaries');
        var speclessView = ViewContainer({
            model: specless
        });
        speclessView.addChildView('employees', data);
        app.addChildView('summaries', speclessView);
        console.log(speclessView);
    });
});