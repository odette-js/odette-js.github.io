app.scope(function (app) {
    var _ = app._,
        factories = _.factories,
        FAILURE = 'failure',
        SUCCESS = 'success',
        STATE = 'state',
        ERROR = 'error',
        ALWAYS = 'always',
        FULFILLED = 'fulfilled',
        RESOLVED = 'resolved',
        REJECTED = 'rejected',
        EMPTYING = 'emptying',
        ALL_STATES = 'allStates',
        STASHED_ARGUMENT = 'stashedArgument',
        STASHED_HANDLERS = 'stashedHandlers',
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
        executeHandlers = function (name) {
            var handler, countLimit, promise = this,
                arg = promise[STASHED_ARGUMENT],
                handlers = promise[STASHED_HANDLERS][name];
            if (handlers && handlers[LENGTH]) {
                countLimit = handlers[LENGTH];
                promise.mark(EMPTYING);
                while (handlers[0] && --countLimit >= 0) {
                    handler = handlers.shift();
                    // should already be bound
                    handler(arg);
                }
                promise.unmark(EMPTYING);
            }
            return promise;
        },
        dispatch = function (promise, name) {
            var shouldstop, finalName = name,
                allstates = result(promise, ALL_STATES),
                collected = [];
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
                    finalName = allstates[finalName] && _.add(collected, finalName) ? allstates[finalName] : BOOLEAN_FALSE;
                }
                shouldstop = !isString(finalName);
            }
            return collected[LENGTH] ? duff(collected, executeHandlers, promise) : exception({
                message: 'promise cannot resolve to an unknown state'
            });
        },
        addHandler = function (key) {
            // if you haven't already attached a method, then do so now
            if (!this[key]) {
                this[key] = function () {
                    return this.handle(key, toArray(arguments));
                };
            }
            return this;
        },
        Model = factories.Model,
        check = function () {
            var notSuccessful, resolveAs, parent = this,
                children = parent.directive(CHILDREN),
                argumentAggregate = [];
            if (!children.find(function (child) {
                notSuccessful = notSuccessful || child[STATE] !== SUCCESS;
                argumentAggregate.push(child[STASHED_ARGUMENT]);
                return !child.is(RESOLVED);
            })) {
                parent.resolveAs(notSuccessful ? FAILURE : SUCCESS, argumentAggregate);
            }
        },
        baseStates = {
            success: ALWAYS,
            failure: ALWAYS,
            error: ALWAYS,
            always: BOOLEAN_TRUE
        },
        Promise = factories.Promise = _.Promise = Model.extend('Promise', {
            addHandler: addHandler,
            childEvents: {
                always: check
            },
            constructor: function () {
                var promise = this;
                promise.on('child:added', check);
                promise.state = BOOLEAN_FALSE;
                promise[STASHED_ARGUMENT] = NULL;
                promise[STASHED_HANDLERS] = {};
                promise.reason = BOOLEAN_FALSE;
                Model[CONSTRUCTOR].call(promise);
                // cannot have been resolved in any way yet
                intendedObject(extend({}, baseStates, result(promise, 'associativeStates')), NULL, addHandler, promise);
                // add passed in success handlers
                promise.success(arguments);
                return promise;
            },
            isChildType: function (promise) {
                return promise[SUCCESS] && promise[FAILURE] && promise[ALWAYS] && promise[ERROR];
            },
            auxiliaryStates: function () {
                return BOOLEAN_FALSE;
            },
            allStates: function () {
                return extend({}, baseStates, result(this, 'auxiliaryStates') || {});
            },
            resolveAs: function (resolveAs_, opts_, reason_) {
                var opts = opts_,
                    resolveAs = resolveAs_,
                    promise = this;
                if (promise.is(RESOLVED)) {
                    return promise;
                }
                promise.mark(RESOLVED);
                promise.state = resolveAs || FAILURE;
                promise[STASHED_ARGUMENT] = opts;
                promise.reason = reason_ ? reason_ : BOOLEAN_FALSE;
                resolveAs = promise.state;
                promise.dispatchEvent('before:resolve');
                promise.dispatchEvents(wraptry(function () {
                    return dispatch(promise, resolveAs);
                }, function (e) {
                    promise.unmark(FULFILLED);
                    e.options = opts;
                    promise[STASHED_ARGUMENT] = e;
                    return dispatch(promise, 'error');
                }, function (err, returnValue) {
                    return returnValue || [];
                }));
                return promise;
            },
            fulfill: function (opts) {
                return this.resolveAs(SUCCESS, opts);
            },
            reject: function (opts, reason) {
                return this.resolveAs(FAILURE, opts, reason);
            },
            stash: function (name, fn) {
                var promise = this,
                    stashedHandlers = promise[STASHED_HANDLERS],
                    byName = stashedHandlers[name] = stashedHandlers[name] || [];
                flatten(arguments, BOOLEAN_TRUE, function (fn) {
                    if (isFunction(fn)) {
                        byName.push(bind(fn, promise));
                    } else {}
                });
                return promise;
            },
            handle: function (name, fn_) {
                var promise = this,
                    arg = promise[STASHED_ARGUMENT],
                    fn = fn_;
                promise.stash(name, fn);
                if (promise.is(RESOLVED)) {
                    dispatch(promise, promise[STATE]);
                }
                return promise;
            },
            when: function () {
                var promise = this,
                    collected = [];
                flatten(arguments, BOOLEAN_TRUE, function (pro) {
                    if (promise.isChildType(pro)) {
                        collected.push(pro);
                    }
                });
                promise.add(collected);
                return promise;
            }
        }),
        PromisePrototype = Promise[CONSTRUCTOR][PROTOTYPE],
        resulting = PromisePrototype.addHandler('success').addHandler('failure').addHandler('always').addHandler('error'),
        appPromise = Promise();
    app.extend({
        dependency: bind(appPromise.when, appPromise)
    });
    exports({
        when: function () {
            return Promise().when(toArray(arguments));
        }
    });
});