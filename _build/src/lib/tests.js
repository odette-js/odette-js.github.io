application.scope().run(function (app, _, factories) {
    var current, pollerTimeout, failedTests = 0,
        testisrunning = BOOLEAN_FALSE,
        EXPECTED = 'expected',
        SPACE_NOT = ' not',
        TO_EQUAL = ' to equal ',
        AN_ERROR = ' an error',
        TO_BE_THROWN = ' to be thrown',
        TO_BE_STRICTLY_EQUAL_STRING = ' to be strictly equal to ',
        stringify = _.stringify,
        negate = _.negate,
        allIts = [],
        successfulIts = [],
        failedIts = [],
        stack = [],
        queue = [],
        allExpectations = [],
        successful = [],
        failures = [],
        successfulExpectations = [],
        failedExpectations = [],
        globalBeforeEachStack = [],
        globalAfterEachStack = [],
        errIfFalse = function (handler, makemessage) {
            return function (arg) {
                var result, expectation = {};
                if ((result = handler(current, arg))) {
                    successfulExpectations.push(expectation);
                } else {
                    ++failedTests;
                    expectation = new Error(makemessage.apply(this, arguments));
                    console.error(expectation);
                    failedExpectations.push(expectation);
                }
                allExpectations.push(expectation);
                return result;
            };
        },
        expectationsHash = {
            not: {}
        },
        expect = function (start) {
            current = start;
            return expectationsHash;
        },
        maker = expect.maker = function (where, test, positive, negative) {
            expectationsHash[where] = errIfFalse(test, positive);
            expectationsHash.not[where] = errIfFalse(negate(test), negative);
        },
        internalToThrowResult = maker('toThrow', function (handler) {
            var errRan = BOOLEAN_FALSE;
            return wraptry(handler, function () {
                errRan = BOOLEAN_TRUE;
            }, function () {
                return errRan;
            });
        }, function () {
            return EXPECTED + AN_ERROR + TO_BE_THROWN;
        }, function () {
            return EXPECTED + AN_ERROR + SPACE_NOT + TO_BE_THROWN;
        }),
        internalToBeResult = maker('toBe', function (current, comparison) {
            return current === comparison;
        }, function (current, comparison) {
            return EXPECTED + SPACE + stringify(current) + TO_BE_STRICTLY_EQUAL_STRING + stringify(comparison);
        }, function (current, comparison) {
            return EXPECTED + SPACE + stringify(current) + SPACE_NOT + TO_BE_STRICTLY_EQUAL_STRING + stringify(comparison);
        }),
        internalToEqualResult = maker('toEqual', function (current, comparison) {
            return _.isEqual(current, comparison);
        }, function (current, comparison) {
            return EXPECTED + SPACE + current + TO_EQUAL + comparison;
        }, function (current, comparison) {
            return EXPECTED + SPACE + stringify(current) + SPACE_NOT + TO_EQUAL + stringify(comparison);
        }),
        errHandler = function (expectation) {
            return function (err) {
                expectation.erred = err;
                console.error(err);
            };
        },
        executedone = function (expectation) {
            var queued;
            expectation.endTime = _.performance.now();
            stack.pop();
            if (failedTests || expectation.erred) {
                failedIts.push(expectation);
                expectation.promise.reject(expectation.err);
            } else {
                successfulIts.push(expectation);
                expectation.promise.fulfill();
            }
            failedTests = 0;
            runningEach(expectation.afterStack);
            testisrunning = BOOLEAN_FALSE;
            if (queue[0]) {
                queued = queue.shift();
                clearTimeout(queued.runId);
                setup(queued);
            }
            setupPoller();
        },
        describe = function (string, handler) {
            stack.push(string);
            globalBeforeEachStack.push([]);
            globalAfterEachStack.push([]);
            _.wraptry(handler, console.error, function () {
                globalAfterEachStack.pop();
                globalBeforeEachStack.pop();
                stack.pop();
            });
        },
        timeoutErr = function (stack) {
            console.error('timeout:\n' + stack.join('\n'));
        },
        setup = function (expectation) {
            testisrunning = BOOLEAN_TRUE;
            expectation.runId = setTimeout(function () {
                var errThat, doThis, errThis, err, finallyThis;
                testisrunning = BOOLEAN_TRUE;
                runningEach(expectation.beforeStack);
                errThis = errHandler(expectation);
                if (expectation.handler[LENGTH] === 1) {
                    err = new Error();
                    expectation.timeoutId = setTimeout(function () {
                        console.error('timeout:\n' + expectation.current.join('\n'));
                        errThat(err);
                        executedone(expectation);
                    }, 5000);
                    doThis = function () {
                        expectation.handler(function () {
                            clearTimeout(expectation.timeoutId);
                            executedone(expectation);
                        });
                    };
                    errThat = errThis;
                    errThis = function (e) {
                        errThat(e);
                        executedone(expectation);
                    };
                    finallyThis = noop;
                } else {
                    doThis = expectation.handler;
                    finallyThis = function () {
                        executedone(expectation);
                    };
                }
                expectation.startTime = _.performance.now();
                wraptry(doThis, errThis, finallyThis);
            });
        },
        it = function (string, handler) {
            var copy, expectation;
            stack.push(string);
            copy = stack.slice(0);
            stack.pop();
            expectation = {
                string: string,
                handler: handler,
                current: copy,
                afterStack: globalAfterEachStack.slice(0),
                beforeStack: globalBeforeEachStack.slice(0),
                promise: _.Promise()
            };
            allIts.push(expectation);
            if (testisrunning) {
                queue.push(expectation);
                return;
            }
            setup(expectation);
            return expectation.promise;
        },
        runningEach = function (globalStack) {
            for (var i = 0; i < globalStack[LENGTH]; i++) {
                var itemized = globalStack[i];
                for (var j = 0; j < itemized[LENGTH]; j++) {
                    itemized[j]();
                }
            }
        },
        beforeEach = function (handler) {
            globalBeforeEachStack[globalBeforeEachStack[LENGTH] - 1].push(handler);
        },
        afterEach = function (handler) {
            globalAfterEachStack[globalAfterEachStack[LENGTH] - 1].push(handler);
        },
        setupPoller = function () {
            pollerTimeout = pollerTimeout === void 0 ? setTimeout(function loops() {
                var theIt, i = 0,
                    totalTime = 0;
                if (!testisrunning) {
                    for (; i < allIts[LENGTH]; i++) {
                        theIt = allIts[i];
                        totalTime += (theIt.endTime - theIt.startTime);
                    }
                    console.log(successfulExpectations.length + ' successful expectations\n' + failedExpectations.length + ' failed expectations\n' + allExpectations.length + ' expectations ran\n' + successfulIts.length + ' out of ' + allIts.length + ' tests passed\nin ' + totalTime + 'ms');
                } else {
                    pollerTimeout = setTimeout(loops, 100);
                }
            }, 100) : pollerTimeout;
        };
    _.exports({
        afterEach: afterEach,
        beforeEach: beforeEach,
        expect: expect,
        describe: describe,
        it: it
    });
});