application.scope().run(function (app, _, factories) {
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
        $.registerElement('click-toggler', {
            events: {
                click: 'toggle'
            },
            prototype: {
                toggle: function () {
                    var isOpen = this.is('clickTogglerOpen'),
                        futureOpen = !isOpen,
                        target = this.data('target'),
                        together = target ? this.wrap().add(target) : this;
                    together.data('toggled', futureOpen);
                    this.remark('clickTogglerOpen', futureOpen);
                }
            }
        });
        $.registerElement('bacon', {
            onCreate: function (manager) {
                _.get(_.stringifyQuery({
                    url: 'https://baconipsum.com/api/',
                    query: {
                        type: 'meat-and-filler',
                        start_with_lorem: true,
                        paras: manager.data('paragraphs') || 5
                    }
                })).success(function (res) {
                    var list = [];
                    _.each(res, function (paragraph) {
                        var p_tag = $.createElement('p', {
                            'class': 'col s12'
                        });
                        p_tag.html(paragraph);
                        list.push(p_tag);
                    });
                    manager.append(list);
                });
            }
        });
    });
});