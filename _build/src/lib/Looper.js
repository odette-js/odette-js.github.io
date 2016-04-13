app.scope(function (app) {
    var lastAFId, lastTId, lastOverrideId, _ = app._,
        factories = _.factories,
        x = 0,
        lastTime = 0,
        frameTime = 0,
        pI = _.pI,
        nowish = _.now,
        gapSplit = _.gapSplit,
        vendors = gapSplit('ms moz webkit o'),
        RUNNING = 'running',
        HALTED = 'halted',
        STOPPED = 'stopped',
        DESTROYED = 'destroyed',
        TIMEOUT = 'Timeout',
        SET_TIMEOUT = 'set' + TIMEOUT,
        CLEAR_TIMEOUT = 'clear' + TIMEOUT,
        ANIMATION_FRAME = 'AnimationFrame',
        REQUEST_ANIMATION_FRAME = 'request' + ANIMATION_FRAME,
        CANCEL_ANIMATION_FRAME = 'cancel' + ANIMATION_FRAME,
        allLoopers = [],
        runningLoopers = [],
        eachCall = _.eachCall,
        time = _.time,
        remove = _.remove,
        running = BOOLEAN_FALSE,
        focused = BOOLEAN_TRUE,
        request = function (handler) {
            var nextFrame = Math.max(0, lastTime - frameTime);
            if (focused) {
                lastAFId = win[REQUEST_ANIMATION_FRAME](handler);
            } else {
                lastTId = win.setTimeout(handler, nextFrame);
            }
            if (Looper.playWhileBlurred) {
                lastOverrideId = win.setTimeout(function () {
                    focused = BOOLEAN_FALSE;
                    handler();
                }, nextFrame + 50);
            }
        },
        basicHandler = function () {
            win[CANCEL_ANIMATION_FRAME](lastAFId);
            win[CLEAR_TIMEOUT](lastTId);
            win[CLEAR_TIMEOUT](lastOverrideId);
            frameTime = _.now();
            eachCall(runningLoopers, 'run', frameTime);
            teardown();
        },
        setup = function () {
            running = BOOLEAN_TRUE;
            request(basicHandler);
        },
        teardown = function () {
            duffRight(runningLoopers, function (looper, idx) {
                if (looper.is(HALTED) || looper.is(STOPPED) || looper.is(DESTROYED) || !looper.length()) {
                    looper.stop();
                    runningLoopers.splice(idx, 1);
                }
            });
            running = BOOLEAN_FALSE;
            if (runningLoopers[LENGTH]) {
                setup();
            }
        },
        add = function (looper) {
            allLoopers.push(looper);
        },
        start = function (looper) {
            if (indexOf(runningLoopers, looper) === -1) {
                runningLoopers.push(looper);
            }
            if (!running) {
                setup();
            }
        },
        shim = (function () {
            for (; x < vendors[LENGTH] && !win[REQUEST_ANIMATION_FRAME]; ++x) {
                win[REQUEST_ANIMATION_FRAME] = win[vendors[x] + 'RequestAnimationFrame'];
                win[CANCEL_ANIMATION_FRAME] = win[vendors[x] + upCase(CANCEL_ANIMATION_FRAME)] || win[vendors[x] + 'CancelRequestAnimationFrame'];
            }
            if (!win[REQUEST_ANIMATION_FRAME]) {
                win[REQUEST_ANIMATION_FRAME] = function (callback) {
                    var currTime = new Date().getTime(),
                        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                        id = win.setTimeout(function () {
                            callback(currTime + timeToCall);
                        }, timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };
            }
            if (!win[CANCEL_ANIMATION_FRAME]) {
                win[CANCEL_ANIMATION_FRAME] = function (id) {
                    win[CLEAR_TIMEOUT](id);
                };
            }
        }()),
        LOOPER = 'Looper',
        Collection = factories.Collection,
        Looper = factories[LOOPER] = Collection.extend(LOOPER, {
            constructor: function (_runner) {
                var looper = this;
                looper.mark(STOPPED);
                looper.unmark(HALTED);
                looper.unmark(DESTROYED);
                looper.unmark(RUNNING);
                Collection[CONSTRUCTOR].call(looper);
                looper.removable = factories.List();
                add(looper);
                return looper;
            },
            destroy: function () {
                this.mark(DESTROYED);
                return this.halt();
            },
            run: function (_nowish) {
                var tween = this;
                if (tween.is(HALTED) || tween.is(STOPPED)) {
                    return;
                }
                tween.find(function (obj) {
                    tween.current = obj;
                    if (obj.disabled) {
                        tween.queueRemoval(obj);
                        return;
                    }
                    if (tween.is(HALTED)) {
                        return BOOLEAN_TRUE;
                    }
                    wraptry(function () {
                        obj.fn(_nowish);
                    }, function () {
                        tween.queueRemoval(obj);
                    });
                });
                tween.current = NULL;
                tween.unmark(RUNNING);
                tween.removable.each(passesFirstArgument(bind(tween.remove, tween))).reset();
            },
            queueRemoval: function (obj) {
                var tween = this;
                obj.disabled = BOOLEAN_TRUE;
                if (tween.current) {
                    tween.removable.push(obj);
                } else {
                    tween.unqueue(obj);
                }
            },
            dequeue: function (id_) {
                var fnObj, found, i = 0,
                    tween = this,
                    id = id_,
                    ret = BOOLEAN_FALSE;
                if (!arguments[LENGTH] && tween.current) {
                    tween.queueRemoval(tween.current);
                    return BOOLEAN_TRUE;
                }
                if (isObject(id)) {
                    return tween.queueRemoval(id);
                }
                if (!isNumber(id)) {
                    return BOOLEAN_FALSE;
                }
                id = tween.findWhere({
                    id: id
                });
                if (tween.current) {
                    return tween.queueRemoval(id);
                } else {
                    return tween.unqueue(id);
                }
            },
            stop: function () {
                this.mark(STOPPED);
                return this;
            },
            start: function () {
                var looper = this;
                if (looper.is(STOPPED)) {
                    looper.unmark(STOPPED);
                    looper.unmark(HALTED);
                }
                return looper;
            },
            halt: function () {
                this.mark(HALTED);
                return this.stop();
            },
            queue: function (fn) {
                var obj, id = uniqueId(BOOLEAN_FALSE),
                    tween = this;
                if (!isFunction(fn)) {
                    return;
                }
                if (!tween[LENGTH]()) {
                    tween.start();
                }
                start(tween);
                obj = {
                    fn: tween.bind(fn),
                    id: id,
                    disabled: BOOLEAN_FALSE,
                    bound: tween
                };
                tween.push(obj);
                return id;
            },
            bind: function (fn) {
                return bind(fn, this);
            },
            once: function (fn) {
                return this.frames(1, fn);
            },
            frames: function (timey, fn_) {
                var fn, count = 0,
                    times = pI(timey) || 1;
                if (!fn_ && isFunction(times)) {
                    fn_ = timey;
                    times = 1;
                }
                if (!isFunction(fn_)) {
                    return;
                }
                fn = this.bind(fn_);
                if (times < 1 || !isNumber(times)) {
                    times = 1;
                }
                return this.queue(function (ms) {
                    var last = 1;
                    count++;
                    if (count >= times) {
                        this.unqueue();
                        last = 0;
                    }
                    fn(ms, !last, count);
                });
            },
            tween: function (time__, fn_) {
                var fn, added = nowish(),
                    time_ = time(time__);
                if (!time_) {
                    time_ = 0;
                }
                if (!isFunction(fn_)) {
                    return;
                }
                fn = this.bind(fn_);
                return this.interval(0, function (ms) {
                    var tween = 1,
                        diff = ms - added;
                    if (diff >= time_) {
                        tween = 0;
                        this.unqueue();
                    }
                    fn(ms, Math.min(1, (diff / time_)), !tween);
                });
            },
            time: function (time_, fn_) {
                var fn;
                if (!isFunction(fn_)) {
                    return this;
                }
                fn = this.bind(fn_);
                return this.interval(time(time_), function (ms) {
                    this.unqueue();
                    fn(ms);
                });
            },
            frameRate: function (time__, fn_, min) {
                var fn, tween = this,
                    minimum = Math.min(min || 0.8, 0.8),
                    expectedFrameRate = 30 * minimum,
                    lastDate = 1,
                    lastSkip = nowish(),
                    time_ = time__ || 125;
                if (!isFunction(fn_)) {
                    return tween;
                }
                fn = tween.bind(fn_);
                return tween.queue(function (ms) {
                    var frameRate = 1000 / (ms - lastDate);
                    if (frameRate > 40) {
                        expectedFrameRate = 60 * minimum;
                    }
                    if (frameRate < expectedFrameRate) {
                        lastSkip = ms;
                    }
                    if (ms - lastSkip > time_) {
                        tween.unqueue();
                        fn(ms);
                    }
                    lastDate = ms;
                });
            },
            interval: function (time, fn_) {
                var fn, tweener = this,
                    last = nowish();
                if (!isFunction(fn_)) {
                    return;
                }
                if (!time) {
                    time = 0;
                }
                fn = tweener.bind(fn_);
                return tweener.queue(function (ms) {
                    if (ms - time >= last) {
                        last = ms;
                        fn(ms);
                    }
                });
            }
        }),
        Scheduler = factories.Scheduler = factories.Directive.extend('Scheduler', {
            //
        });
    Looper.playWhileBlurred = BOOLEAN_TRUE;
    app.defineDirective('Scheduler', Scheduler[CONSTRUCTOR]);
    _.exports({
        AF: Looper()
    });
});