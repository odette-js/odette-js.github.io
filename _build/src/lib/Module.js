app.scope(function (app) {
    var _ = app._,
        factories = _.factories,
        Model = factories.Model,
        Collection = factories.Collection,
        MODULES = 'Modules',
        STARTED = START + 'ed',
        startableMethods = {
            start: function (evnt) {
                var startable = this;
                if (!startable.is(STARTED)) {
                    startable.mark(STARTED);
                    startable[DISPATCH_EVENT](START, evnt);
                }
                return startable;
            },
            stop: function (evnt) {
                var startable = this;
                if (startable.is(STARTED)) {
                    startable.unmark(STARTED);
                    startable[DISPATCH_EVENT](STOP, evnt);
                }
                return startable;
            },
            toggle: function (evnt) {
                var startable = this;
                if (startable.is(STARTED)) {
                    startable[STOP](evnt);
                } else {
                    startable[START](evnt);
                }
                return startable;
            },
            restart: function (evnt) {
                var startable = this;
                if (startable.is(STARTED)) {
                    startable[STOP](evnt);
                }
                startable[START](evnt);
                return startable;
            }
        },
        Startable = factories.Startable = factories.Model.extend('Startable', startableMethods),
        doStart = function (e) {
            if (this.startWithParent) {
                this[START](e);
            }
        },
        doStop = function (e) {
            if (this.stopWithParent) {
                this[STOP](e);
            }
        },
        createArguments = function (module, args) {
            return [module].concat(module.application.createArguments(), args || []);
        },
        checks = function (app, list) {
            var exports = [];
            duff(list, function (path) {
                var module = app.module(path);
                if (module.is('initialized')) {
                    exports.push(module.exports);
                }
            });
            return exports[LENGTH] === list[LENGTH] ? exports : BOOLEAN_FALSE;
        },
        moduleMethods = {
            module: function (name_, windo, fn) {
                var list, globalname, arg1, arg2, parentModulesDirective, modules, attrs, parentIsModule, nametree, parent = this,
                    originalParent = parent,
                    name = name_,
                    // globalname = name,
                    namespace = name.split(PERIOD),
                    module = parent.directive(CHILDREN).get(name_);
                if (module) {
                    // hey, i found it. we're done here
                    parent = module.parent;
                    if (!fn) {
                        return module;
                    }
                    namespace = [module.id];
                } else {
                    // now i have to make the chain
                    while (namespace.length > 1) {
                        parent = parent.module(namespace[0]);
                        namespace.shift();
                    }
                }
                parentModulesDirective = parent.directive(CHILDREN);
                name = namespace.join(PERIOD);
                module = parentModulesDirective.get(ID, name);
                if (!module) {
                    list = parent.globalname ? parent.globalname.split('.') : [];
                    list.push(name);
                    globalname = list.join('.');
                    arg2 = extend(result(parent, 'childOptions') || {}, {
                        application: app,
                        parent: parent,
                        id: name,
                        globalname: globalname
                    });
                    if (parent === app) {
                        module = Module({}, arg2);
                        parentModulesDirective.add(module);
                    } else {
                        module = parent.add({}, arg2)[0];
                    }
                    parentModulesDirective.register(ID, name, module);
                    app[CHILDREN].register(ID, globalname, module);
                }
                if (isWindow(windo) || isFunction(windo) || isFunction(fn)) {
                    if (module.mark('initialized')) {
                        module.exports = {};
                    }
                    module.run(windo, fn);
                    module.bubble('initialized:submodule');
                }
                return module;
            },
            run: function (windo, fn_) {
                var module = this,
                    fn = isFunction(windo) ? windo : fn_,
                    args = isWindow(windo) ? [windo.DOMA] : [];
                if (isFunction(fn)) {
                    if (module.application) {
                        fn.apply(module, createArguments(module, args));
                    } else {
                        fn.apply(module, module.createArguments(args));
                    }
                }
                return module;
            },
            export: function (one, two) {
                var module = this;
                intendedObject(one, two, function (key, value) {
                    module.exports[key] = value;
                });
                return module;
            },
            constructor: function (attrs, opts) {
                var module = this;
                module.startWithParent = BOOLEAN_TRUE;
                module.stopWithParent = BOOLEAN_TRUE;
                module.exports = {};
                Model[CONSTRUCTOR].apply(module, arguments);
                module.listenTo(module.parent, {
                    start: doStart,
                    stop: doStop
                });
                return module;
            },
            topLevel: function () {
                return !this.application || this.application === this[PARENT];
            },
            require: function (modulename, handler) {
                var module, list, mapppedArguments, app;
                if (!isFunction(handler)) {
                    module = this.module(modulename);
                    return module.is('initialized') ? module.exports : exception({
                        message: 'that module has not been initialized yet'
                    });
                } else {
                    list = gapSplit(modulename);
                    if (!isArray(list)) {
                        return app;
                    }
                    list = list.slice(0);
                    if ((mappedArguments = checks(app, list))) {
                        handler.apply(app, mappedArguments);
                    } else {
                        app.on('initialized:submodule', function () {
                            if ((mappedArguments = checks(app, list))) {
                                handler.apply(app, mappedArguments);
                                app.off();
                            }
                        });
                    }
                    return app;
                }
            }
        },
        extraModuleArguments = [],
        Module = factories.Module = factories.Model.extend('Module', moduleMethods),
        baseModuleArguments = function (app) {
            var _ = app._;
            return [app, _, _ && _.factories];
        },
        appextendresult = app.extend(extend({}, factories.Events[CONSTRUCTOR][PROTOTYPE], startableMethods, moduleMethods, {
            addModuleArguments: function (arr) {
                _.addAll(extraModuleArguments, arr);
                return this;
            },
            removeModuleArguments: function (arr) {
                _.removeAll(extraModuleArguments, arr);
                return this;
            },
            createArguments: function (args) {
                return baseModuleArguments(this).concat(extraModuleArguments, args || []);
            }
        }));
});