this.Odette = function (global, WHERE, version, fn) {
    'use strict';
    var UNDEFINED, odette_version = '0.0.0',
        LENGTH = 'length',
        PARENT = 'global',
        PROTOTYPE = 'prototype',
        TOUCH_TOP = 'touchTop',
        TOP_ACCESS = 'topAccess',
        PERIOD = '.',
        global_ = this || window || global,
        doc = global_.document,
        BOOLEAN_TRUE = !0,
        BOOLEAN_FALSE = !1,
        NULL = null,
        noop = function () {},
        typeConstructor = function (str) {
            return function (thing) {
                return typeof thing === str;
            };
        },
        now = function () {
            return +(new Date());
        },
        map = function (arra, fn) {
            var i = 0,
                len = arra[LENGTH],
                arr = [];
            while (len > i) {
                arr[i] = fn(arra[i], i, arra);
                i++;
            }
            return arr;
        },
        isString = typeConstructor('string'),
        isNumber = typeConstructor('number'),
        isFunction = typeConstructor('function'),
        executionTime = now(),
        makeParody = function (parent, fn) {
            return function () {
                return fn.apply(parent, arguments);
            };
        },
        wraptry = function (trythis, errthat, finalfunction) {
            var returnValue, err = NULL;
            try {
                returnValue = trythis();
            } catch (e) {
                err = e;
                returnValue = errthat ? errthat(e) : returnValue;
            } finally {
                returnValue = finalfunction ? finalfunction(err, returnValue) : returnValue;
            }
            return returnValue;
        },
        isVersionString = function (string) {
            return isNumber(string) || (isString(string) && (string.split(PERIOD)[LENGTH] > 1 || +string === +string)) ? BOOLEAN_TRUE : BOOLEAN_FALSE;
        },
        maxVersion = function (string1, string2) {
            // string 2 is always the underdog
            var split1, split2, provenLarger, cvs1Result = convertVersionString(string1);
            var cvs2Result = convertVersionString(string2);
            // keyword checks
            if (cvs1Result === BOOLEAN_TRUE) {
                return cvs1Result;
            }
            if (cvs2Result === BOOLEAN_TRUE) {
                return cvs2Result;
            }
            if (cvs1Result === BOOLEAN_FALSE && cvs2Result === BOOLEAN_FALSE) {
                // compare them as version strings
                split1 = string1.split(PERIOD);
                split2 = string2.split(PERIOD);
                map(split1, function (value, index) {
                    if (+value < +(split2[index] || 0)) {
                        provenLarger = BOOLEAN_TRUE;
                    }
                });
                if (provenLarger === UNDEFINED && split2[LENGTH] > split1[LENGTH]) {
                    provenLarger = BOOLEAN_TRUE;
                }
                return !!provenLarger ? string2 : string1;
            } else {
                return string1 > string2 ? string1 : string2;
            }
        },
        convertVersionString = function (string_) {
            var converted, string = string_;
            if (isNumber(string)) {
                return string;
            } else {
                string += '';
                converted = +string;
                // could be a number hiding as a string
                if (converted === converted) {
                    return converted;
                } else {
                    return string.split(PERIOD)[LENGTH] === 1;
                }
            }
        };

    function Application(name, parent) {
        this.version = name;
        this.scoped = BOOLEAN_TRUE;
        this.application = this;
        this.missedDefinitions = [];
        this.createdAt = now();
        return this;
    }
    Application[PROTOTYPE].destroy = noop;
    Application[PROTOTYPE].wraptry = wraptry;
    Application[PROTOTYPE].now = now;
    Application[PROTOTYPE].extend = function (obj) {
        var n, app = this;
        for (n in obj) {
            if (obj.hasOwnProperty(n)) {
                app[n] = obj[n];
            }
        }
        return app;
    };
    Application[PROTOTYPE].undefine = function (handler) {
        this.missedDefinitions.push(handler);
        return this;
    };
    Application[PROTOTYPE].parody = function (list) {
        var app = this,
            i = 0,
            extendor = {},
            parent = app[PARENT];
        for (; i < list[LENGTH]; i++) {
            extendor[list[i]] = makeParody(parent, parent[list[i]]);
        }
        app.extend(extendor);
        return app;
    };
    Application[PROTOTYPE].scope = function (name_, fn_) {
        var name = name_ && isString(name_) ? name_ : this.version;
        var fn = name_ && (isFunction(name_) ? name_ : (isFunction(fn_) ? fn_ : NULL));
        return this[PARENT].scope(name, fn);
    };
    Application[PROTOTYPE][TOUCH_TOP] = function () {
        // allows the top part of this script to be swapped out against different globals_
        return this[PARENT][TOUCH_TOP](global_);
    };
    Application[PROTOTYPE][TOP_ACCESS] = function () {
        this[TOUCH_TOP]();
        return this[PARENT][TOP_ACCESS];
    };
    var app, application = global_[WHERE] = global_[WHERE] || {
        versions: {},
        executionTime: executionTime,
        versionOrder: [],
        VERSION: odette_version,
        shared: BOOLEAN_TRUE,
        scoped: BOOLEAN_FALSE,
        wraptry: wraptry,
        maxVersion: maxVersion,
        registerVersion: function (name, app) {
            var defaultVersion, application = this,
                cachedOrCreated = application.versions[name],
                newApp = application.versions[name] = cachedOrCreated || app || new Application(name, application);
            newApp[PARENT] = application;
            application.currentVersion = name;
            application.defaultVersion = (defaultVersion = application.defaultVersion) === UNDEFINED ? version : maxVersion(defaultVersion, version);
            if (!cachedOrCreated) {
                application.versionOrder.push(name);
            }
            return newApp;
        },
        definition: function (version, windo, handler) {
            var application = this,
                app = application.registerVersion(version);
            if (app.defined) {
                application.map(app.missedDefinitions, function (handler) {
                    handler.call(app, windo);
                });
            } else {
                app.defined = BOOLEAN_TRUE;
                handler.call(app, app);
            }
            return app;
        },
        unRegisterVersion: function (name) {
            var application = this,
                saved = application.versions[name],
                orderIdx = application.versionOrder.indexOf(name);
            if (orderIdx === -1) {
                return application;
            }
            saved.destroy();
            application.versionOrder.splice(orderIdx, 1);
            saved[PARENT] = UNDEFINED;
            application.versions[name] = UNDEFINED;
            return saved;
        },
        scope: function (name_, fn_) {
            var name, fn, scoped, app = this,
                hash = app.versions;
            if (isString(name_) || isNumber(name_)) {
                name = name_;
                fn = fn_;
            } else {
                fn = name_;
                name = app.defaultVersion;
            }
            if (!hash[name]) {
                app.registerVersion(name);
            } else {
                app.currentVersion = name;
            }
            scoped = hash[name];
            if (!isFunction(fn)) {
                return scoped;
            }
            this.wraptry(function () {
                fn.call(app, scoped);
            });
            return scoped;
        },
        map: map,
        registerScopedMethod: function (name, expects_) {
            var application = this,
                expects = expects_ || 3,
                method = application[name] = application[name] || function () {
                    var i = 0,
                        args = arguments,
                        args_ = args,
                        argLen = args[LENGTH],
                        version = args[0];
                    // expects is equivalent to what it would be if the version was passed in
                    if (argLen < expects) {
                        version = application.currentVersion;
                    } else {
                        args_ = [];
                        for (; i < args[LENGTH]; i++) {
                            args_.push(args[i]);
                        }
                        version = args_.shift();
                    }
                    application.applyTo(version, name, args_);
                };
            return application;
        },
        get: function (version) {
            return this.versions[version];
        },
        applyTo: function (which, method, args) {
            var application = this,
                app = application.get(which);
            return app && app[method] && app[method].apply(app, args);
        },
        getCurrentScript: function (d) {
            var allScripts = (d || doc).scripts,
                currentScript = d.currentScript,
                lastScript = allScripts[allScripts[LENGTH] - 1];
            return currentScript || lastScript;
        },
        touchTop: function (global_, preventMap) {
            // assume you have top access
            var topAccess, origin = this,
                application = origin;
            if (application[TOP_ACCESS] === UNDEFINED) {
                // we dont get a top variable on the global object in node
                // probably because there are no scoped globals
                if (global_ === global_.top || !global_.top) {
                    topAccess = BOOLEAN_TRUE;
                } else {
                    // test for browsers
                    topAccess = wraptry(function () {
                        var doc = global_.top.document;
                        // overwrite the scoped application variable
                        application = global_.top[WHERE] || application;
                        return BOOLEAN_TRUE;
                    }, function () {
                        return BOOLEAN_FALSE;
                    });
                }
                if (topAccess) {
                    global_.top[WHERE] = application;
                }
                application[TOP_ACCESS] = topAccess;
            }
            if (!preventMap && global_[WHERE] !== application) {
                map(origin.versionOrder, function (version) {
                    application.registerVersion(version, origin.versions[version]);
                });
            }
            global_[WHERE] = application;
            return application;
        }
    };
    app = application.get(version);
    if (app) {
        // there is already an app with this same version that originated from this global object
        return app;
    }
    app = application.registerVersion(version);
    // call is used because apply is finicky and bind is not universal
    fn.call(global_, application, app);
    return app;
};