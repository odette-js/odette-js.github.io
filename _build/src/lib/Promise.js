app.scope(function (app) {
    var _ = app._,
        factories = _.factories,
        FAILURE = 'failure',
        SUCCESS = 'success',
        STATE = 'state',
        ALWAYS = 'always',
        FULFILLED = 'fulfilled',
        RESOLVED = 'resolved',
        REJECTED = 'rejected',
        IS_EMPTYING = 'isEmptying',
        ALL_STATES = 'allStates',
        STASHED_ARGUMENT = 'stashedArgument',
        flatten = _.flatten,
        bind = _.bind,
        isString = _.isString,
        intendedObject = _.intendedObject,
        duff = _.duff,
        each = _.each,
        extend = _.extend,
        toArray = _.toArray,
        isFunction = _.isFunction,
        foldl = _.foldl,
        result = _.result,
        wraptry = _.wraptry,
        indexOf = _.indexOf,
        when = function () {
            var promise = Promise();
            return promise.when.apply(promise, arguments);
        },
        dispatch = function (promise, name) {
            var shouldstop, finalName = name,
                allstates = result(promise, ALL_STATES),
                collected = [];
            promise.mark(RESOLVED);
            while (!shouldstop) {
                if (_.posit(collected, finalName)) {
                    finalName = BOOLEAN_FALSE;
                } else {
                    if (finalName === SUCCESS) {
                        promise.mark(FULFILLED);
                        promise.unmark(REJECTED);
                    }
                    if (finalName === FAILURE) {
                        promise.unmark(FULFILLED);
                        promise.mark(REJECTED);
                    }
                    collected.push(finalName);
                    finalName = allstates[finalName];
                }
                shouldstop = !isString(finalName);
            }
            return collected[LENGTH] ? duff(collected, function (name) {
                promise.executeHandlers(name);
            }) : exception({
                message: 'promise cannot resolve to an unknown state'
            });
        },
        executeIfNeeded = function (promise, name) {
            return function () {
                promise.handle(name, arguments);
                // each(flatten(arguments), function (fn) {
                //     if (isFunction(fn)) {
                //         promise.handle(name, fn);
                //     }
                // });
                return promise;
            };
        },
        addHandler = function (key) {
            var promise = this;
            // if you haven't already attached a method, then do so now
            if (!promise[key]) {
                promise[key] = executeIfNeeded(promise, key);
            }
            return promise;
        },
        Model = factories.Model,
        check = function () {
            var notSuccessful, resolveAs, parent = this,
                children = parent.directive(CHILDREN),
                argumentAggregate = [];
            if (!children.find(function (child) {
                notSuccessful = notSuccessful || child.get(STATE) !== SUCCESS;
                argumentAggregate.push(child.get(STASHED_ARGUMENT));
                return !child.is(RESOLVED);
            })) {
                parent.resolveAs(notSuccessful ? FAILURE : SUCCESS, argumentAggregate);
            }
        },
        Promise = factories.Promise = _.Promise = Model.extend('Promise', {
            addHandler: addHandler,
            childEvents: {
                always: check
            },
            events: {
                'child:added': check
            },
            baseStates: function () {
                return {
                    success: ALWAYS,
                    failure: ALWAYS,
                    error: ALWAYS,
                    always: BOOLEAN_TRUE
                };
            },
            constructor: function () {
                var promise = this;
                promise.mark('pending');
                Model[CONSTRUCTOR].call(promise);
                // promise.restart();
                // cannot have been resolved in any way yet
                intendedObject(extend({}, result(promise, 'baseStates'), result(promise, 'associativeStates')), NULL, addHandler, promise);
                // add passed in success handlers
                promise.success(arguments);
                return promise;
            },
            // check: ,
            isChildType: function (promise) {
                return promise[SUCCESS] && promise[FAILURE] && promise[ALWAYS];
            },
            defaults: function () {
                return {
                    state: 'pending',
                    // resolved: BOOLEAN_FALSE,
                    stashedArgument: NULL,
                    stashedHandlers: {},
                    reason: BOOLEAN_FALSE
                };
            },
            auxiliaryStates: function () {
                return BOOLEAN_FALSE;
            },
            allStates: function () {
                return extend({}, result(this, 'baseStates'), result(this, 'auxiliaryStates') || {});
            },
            pending: function () {
                return this.get(STATE) === 'pending';
            },
            resolveAs: function (resolveAs_, opts_, reason_) {
                var opts = opts_,
                    resolveAs = resolveAs_,
                    promise = this;
                if (promise.is(RESOLVED)) {
                    return promise;
                }
                if (!isString(resolveAs)) {
                    opts = resolveAs;
                    resolveAs = BOOLEAN_FALSE;
                }
                promise.set({
                    resolved: BOOLEAN_TRUE,
                    // default state if none is given, is to have it succeed
                    state: resolveAs || FAILURE,
                    stashedArgument: opts,
                    reason: reason_ ? reason_ : BOOLEAN_FALSE
                });
                resolveAs = promise.get(STATE);
                promise.dispatchEvents(wraptry(function () {
                    return dispatch(promise, resolveAs);
                }, function () {
                    promise.unmark(FULFILLED);
                    promise.set(STASHED_ARGUMENT, {
                        // nest the sucker again in case it's an array or something else
                        options: opts,
                        message: 'javascript execution error'
                    });
                    return dispatch(promise, 'error');
                }, function (returnValue) {
                    return returnValue || [];
                }));
                return promise;
            },
            // convenience functions
            resolve: function (opts) {
                return this.resolveAs(SUCCESS, opts);
            },
            reject: function (opts) {
                return this.resolveAs(FAILURE, opts);
            },
            executeHandlers: function (name) {
                var handler, countLimit, promise = this,
                    arg = promise.get(STASHED_ARGUMENT),
                    handlers = promise.get('stashedHandlers')[name];
                if (handlers && handlers[LENGTH]) {
                    countLimit = handlers[LENGTH];
                    promise.set(IS_EMPTYING, BOOLEAN_TRUE);
                    while (handlers[0] && --countLimit >= 0) {
                        handler = handlers.shift();
                        // should already be bound
                        handler(arg);
                    }
                    promise.set(IS_EMPTYING, BOOLEAN_FALSE);
                }
                return promise;
            },
            stash: function (name, fn) {
                var promise = this,
                    stashedHandlers = promise.get('stashedHandlers'),
                    byName = stashedHandlers[name] = stashedHandlers[name] || [];
                flatten(arguments, BOOLEAN_TRUE, function (fn) {
                    if (isFunction(fn)) {
                        byName.push(bind(fn, promise));
                    }
                });
            },
            handle: function (name, fn_) {
                var promise = this,
                    arg = promise.get(STASHED_ARGUMENT),
                    fn = fn_;
                promise.stash(name, fn);
                if (promise.is(RESOLVED) && !promise.get(IS_EMPTYING)) {
                    dispatch(promise, promise.get(STATE));
                }
                return promise;
            },
            when: function () {
                var promise = this;
                promise.add(foldl(flatten(arguments), function (memo, pro) {
                    if (promise.isChildType(pro)) {
                        memo.push(pro);
                    }
                    return memo;
                }, []));
                return promise;
            }
        }),
        appPromise = Promise();
    app.extend({
        dependency: _.bind(appPromise.when, appPromise)
    });
    _.exports({
        when: when
    });
});