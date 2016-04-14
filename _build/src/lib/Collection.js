var COLLECTION = 'Collection',
    REVERSED = 'reversed',
    eachCall = function (array, method, arg) {
        return duff(array, function (item) {
            result(item, method, arg);
        });
    },
    mapCall = function (array, method, arg) {
        return map(array, function (item) {
            return result(item, method, arg);
        });
    },
    eachCallRight = function (array, method, arg) {
        return duff(array, function (item) {
            result(item, method, arg);
        }, NULL, -1);
    };
app.scope(function (app) {
    var isNullMessage = {
            message: 'object must not be null or undefined'
        },
        validIdMessage = {
            message: 'objects in sorted collections must have either a number or string for their valueOf result'
        },
        cannotModifyMessage = {
            message: 'list cannot be modified while it is being iterated over'
        },
        /**
         * @func
         */
        doToAll = function (handler) {
            return function (list, items, lookAfter, lookBefore, fromRight) {
                var count = 0;
                duff(items, function (item) {
                    count += remove(list, item, lookAfter, lookBefore, fromRight);
                });
                return count === list[LENGTH];
            };
        },
        remove = function (list, item, lookAfter, lookBefore, fromRight) {
            var index = indexOf(list, item, lookAfter, lookBefore, fromRight);
            if (index + 1) {
                removeAt(list, index);
            }
            index = index + 1;
            return !!index;
        },
        removeAll = doToAll(remove),
        removeAt = function (list, index) {
            return list.splice(index, 1)[0];
        },
        add = function (list, item, lookAfter, lookBefore, fromRight) {
            var value = 0,
                index = indexOf(list, item, lookAfter, lookBefore, fromRight);
            if (index === -1) {
                value = list.push(item);
            }
            return !!value;
        },
        addAll = doToAll(add),
        insertAt = function (list, item, index) {
            var len = list[LENGTH],
                lastIdx = len || 0;
            list.splice(index || 0, 0, item);
            return len !== list[LENGTH];
        },
        eq = function (list, num, caller_) {
            var n, thisNum, caller = caller_ || noop,
                items = [],
                numb = num || 0,
                isNumberResult = isNumber(numb),
                isArrayLikeResult = isArrayLike(numb);
            if (numb < 0) {
                isNumberResult = !1;
            }
            if (!list[LENGTH]) {
                return items;
            }
            if (isNumberResult) {
                items = [list[numb]];
                caller(items[0]);
            } else {
                if (isArrayLikeResult) {
                    duff(numb, function (num) {
                        var item = list[num];
                        items.push(item);
                        caller(item);
                    });
                } else {
                    items = [list[0]];
                    caller(items[0]);
                }
            }
            return items;
        },
        range = function (start, stop, step, inclusive) {
            var length, range, idx;
            if (stop == NULL) {
                stop = start || 0;
                start = 0;
            }
            if (!isFinite(start) || !isNumber(start)) {
                start = 0;
            }
            step = +step || 1;
            length = Math.max(Math.ceil((stop - start) / step), 0) + (+inclusive || 0);
            range = [];
            idx = 0;
            while (idx < length) {
                range[idx] = start;
                idx++;
                start += step;
            }
            return range;
        },
        count = function (list, runner_, ctx_, start, end) {
            var runner, obj, idx, ctx;
            if (start >= end || !isNumber(start) || !isNumber(end) || !isFinite(start) || !isFinite(end)) {
                return list;
            }
            ctx = ctx_ || this;
            runner = bind(runner_, ctx);
            end = Math.abs(end);
            idx = start;
            while (idx < end) {
                obj = NULL;
                if (list[LENGTH] > idx) {
                    obj = list[idx];
                }
                runner(obj, idx, list);
                idx++;
            }
            return list;
        },
        countTo = function (list, runner, ctx, num) {
            return count(list, runner, ctx, 0, num);
        },
        countFrom = function (list, runner, ctx, num) {
            return count(list, runner, ctx, num, list[LENGTH]);
        },
        /**
         * @func
         */
        closestIndex = function (array, searchElement, minIndex_, maxIndex_) {
            var currentIndex, currentElement, found,
                minIndex = minIndex_ || 0,
                maxIndex = maxIndex_ || array[LENGTH] - 1;
            while (minIndex <= maxIndex) {
                currentIndex = (minIndex + maxIndex) / 2 | 0;
                currentElement = array[currentIndex];
                // calls valueOf
                if (currentElement < searchElement) {
                    minIndex = currentIndex + 1;
                } else if (currentElement > searchElement) {
                    maxIndex = currentIndex - 1;
                } else {
                    return currentIndex;
                }
            }
            found = ~~maxIndex;
            return found;
        },
        /**
         * @func
         */
        // posit = function (list, item, lookAfter, lookBefore, fromRight) {
        //     return indexOf(list, item, lookAfter, lookBefore, fromRight) + 1;
        // },
        /**
         * @func
         */
        recreateSelf = function (fn, ctx) {
            return function () {
                return new this.__constructor__(fn.apply(ctx || this, arguments));
            };
        },
        /**
         * @func
         */
        unwrapInstance = function (instance_) {
            return isInstance(instance, factories[COLLECTION]) ? instance_ : instance.unwrap();
        },
        REGISTRY = 'Registry',
        Registry = factories[REGISTRY] = factories.Directive.extend(REGISTRY, {
            constructor: function () {
                this.reset();
                return this;
            },
            get: function (category, id) {
                var cat = this.register[category];
                return cat && cat[id];
            },
            keep: function (category, id, value) {
                var register = this.register,
                    cat = register[category] = register[category] || {};
                if (value === UNDEFINED) {
                    this.count--;
                }
                if (cat[id] === UNDEFINED) {
                    this.count++;
                }
                cat[id] = value;
                return this;
            },
            group: function (category, setter) {
                var register = this.register;
                register[category] = setter || register[category] || {};
                return register[category];
            },
            swap: function (category, id, value) {
                var cached = this.get(category, id);
                this.keep(category, id, value);
                return cached;
            },
            drop: function (category, id) {
                return this.swap(category, id);
            },
            reset: function (registry, count) {
                var cached = this.register;
                var cachedCount = this.count;
                this.register = registry || {};
                this.count = count || 0;
                return [cached, cachedCount];
            }
        }),
        recreatingSelfList = gapSplit('eq pluck where whereNot map mapCall filter cycle uncycle flatten gather'),
        eachHandlers = {
            each: duff,
            duff: duff,
            forEach: duff,
            eachCall: eachCall,
            eachRight: duffRight,
            duffRight: duffRight,
            forEachRight: duffRight,
            eachCallRight: eachCallRight
        },
        eachHandlerKeys = keys(eachHandlers),
        abstractedCanModify = gapSplit('add'),
        abstractedCannotModify = gapSplit('insertAt remove removeAt'),
        nativeCannotModify = gapSplit('pop shift splice'),
        reverseList = gapSplit('reverse'),
        splatHandlers = gapSplit('push unshift'),
        joinHandlers = gapSplit('join'),
        countingList = gapSplit('count countTo countFrom merge'),
        foldIteration = gapSplit('foldr foldl reduce'),
        findIteration = gapSplit('find findLast findWhere findLastWhere'),
        indexers = gapSplit('indexOf'),
        foldFindIteration = foldIteration.concat(findIteration),
        marksIterating = function (fn) {
            return function (one, two, three, four, five, six) {
                var result, list = this;
                ++list.iterating;
                result = fn(list, one, two, three, four, five, six);
                --list.iterating;
                return result;
            };
        },
        wrappedListMethods = extend({
            seeker: function (handler, context) {
                var list = this,
                    bound = bind(handler, context);
                return _.duffRight(list.unwrap(), function (one, two, three) {
                    if (bound(one, two, three)) {
                        list.removeAt(two);
                    }
                });
            },
            slice: function (one, two) {
                return new List(this.unwrap().slice(one, two));
            }
        }, wrap(joinHandlers, function (name) {
            return function (arg) {
                return this.unwrap()[name](arg);
            };
        }), wrap(indexers.concat(abstractedCanModify), function (name) {
            return function (one, two, three, four, five) {
                var list = this;
                return _[name](list.unwrap(), one, two, three, four, five);
            };
        }), wrap(splatHandlers, function (name) {
            return function (args_) {
                var args = isArray(args_) ? args_ : arguments,
                    items = this.unwrap();
                return items[name].apply(items, args);
            };
        }), wrap(nativeCannotModify, function (name) {
            return function (one, two, three, four, five, six) {
                var list = this;
                if (list.iterating) {
                    return exception(cannotModifyMessage);
                }
                return list.unwrap()[name](one, two, three, four, five, six);
            };
        }), wrap(abstractedCannotModify, function (name) {
            return function (one, two, three, four, five) {
                var list = this;
                if (list.iterating) {
                    return exception(cannotModifyMessage);
                }
                return _[name](list.unwrap(), one, two, three, four, five);
            };
        }), wrap(reverseList, function (name) {
            return function () {
                var list = this;
                list.directive('StatusManager').toggle(REVERSED);
                list.unwrap()[name]();
                return list;
            };
        }), wrap(eachHandlers, function (fn) {
            return marksIterating(function (list, handler, context) {
                var args0 = list.unwrap(),
                    args1 = handler,
                    args2 = arguments[LENGTH] > 1 ? context : list;
                fn(args0, args1, args2);
                return list;
            });
        }), wrap(countingList, function (name) {
            return marksIterating(function (list, runner, fromHere, toThere) {
                _[name](list.unwrap(), runner, list, fromHere, toThere);
                return list;
            });
        }), wrap(recreatingSelfList, function (name) {
            return marksIterating(function (list, one, two, three) {
                return new List[CONSTRUCTOR](_[name](list.unwrap(), one, two, three));
            });
        }), wrap(foldFindIteration, function (name) {
            return marksIterating(function (list, one, two, three) {
                return _[name](list.unwrap(), one, two, three);
            });
        })),
        ret = _.exports({
            eachCall: eachCall,
            eachCallRight: eachCallRight,
            filter: filter,
            matches: matches,
            mapCall: mapCall,
            add: add,
            removeAll: removeAll,
            addAll: addAll,
            insertAt: insertAt,
            removeAt: removeAt,
            remove: remove,
            cycle: cycle,
            uncycle: uncycle,
            concat: concat,
            pluck: pluck,
            where: where,
            findWhere: findWhere,
            findLastWhere: findLastWhere,
            range: range,
            count: count,
            countTo: countTo,
            countFrom: countFrom,
            whereNot: whereNot,
            eachRight: eachRight,
            duffRight: duffRight,
            flatten: flatten,
            eq: eq
        }),
        LIST = 'List',
        List = factories.List = factories.Directive.extend(upCase(LIST), extend({
            constructor: function (items) {
                this.reset(items);
                return this;
            },
            call: function (arg) {
                this.each(function (fn) {
                    fn(arg);
                });
                return this;
            },
            obliteration: function (handler, context) {
                duffRight(this.unwrap(), handler, context === UNDEFINED ? this : context);
                return this;
            },
            // good for overwriting and extending
            empty: function () {
                return this.reset();
            },
            reset: function (items) {
                // can be array like
                var list = this,
                    old = list.unwrap() || [];
                list.iterating = list.iterating ? exception(cannotModifyMessage) : 0;
                list.items = items == NULL ? [] : (List.isInstance(items) ? items.unwrap().slice(0) : toArray(items));
                list.unmark(REVERSED);
                return list;
            },
            unwrap: function () {
                return this.items;
            },
            length: function () {
                return this.unwrap()[LENGTH];
            },
            first: function () {
                return this.unwrap()[0];
            },
            last: function () {
                var items = this.unwrap();
                return items[items[LENGTH] - 1];
            },
            index: function (number) {
                return this.unwrap()[number || 0];
            },
            has: function (object) {
                return this.indexOf(object) !== -1;
            },
            sort: function (fn_) {
                // normalization sort function for cross browsers
                var list = this;
                sort(list.unwrap(), fn_, list.is(REVERSED), list);
                return list;
            },
            toString: function () {
                return stringify(this.unwrap());
            },
            toJSON: function () {
                return map(this.unwrap(), function (item) {
                    return result(item, TO_JSON);
                });
            },
            range: recreateSelf(range),
            concat: recreateSelf(function () {
                // this allows us to mix collections with regular arguments
                var base = this.unwrap();
                return base.concat.apply(base, map(arguments, function (arg) {
                    return List(arg).unwrap();
                }));
            }),
            results: function (key, arg) {
                return this.map(function (obj) {
                    return result(obj, key, arg);
                });
            }
        }, wrappedListMethods)),
        directiveResult = app.defineDirective(LIST, function () {
            return new List[CONSTRUCTOR]();
        }),
        // just combining two directives here.
        // One is being extended,
        // the other is being used on the parent
        Collection = factories[COLLECTION] = factories.List.extend(COLLECTION, extend({
            get: directives.parody(REGISTRY, 'get'),
            register: directives.parody(REGISTRY, 'keep'),
            unRegister: directives.parody(REGISTRY, 'drop'),
            swapRegister: directives.parody(REGISTRY, 'swap'),
            empty: function (one, two, three) {
                this.reset(one, two, three);
                this.directive(REGISTRY).reset(one, two, three);
            }
        })),
        appDirectiveResult = app.defineDirective(COLLECTION, function () {
            return Collection();
        }),
        SortedCollection = factories.SortedCollection = Collection.extend('Sorted' + COLLECTION, {
            constructor: function (list_, skip) {
                var sorted = this;
                List[CONSTRUCTOR].call(sorted);
                if (list_ && !skip) {
                    sorted.load(isArrayLike(list_) ? list_ : [list_]);
                }
                return sorted;
            },
            sort: function () {
                // does not take a function because it relies on ids / valueOf results
                var sorted = this;
                sort(sorted.unwrap(), sorted.is(REVERSED) ? function (a, b) {
                    return a < b;
                } : function (a, b) {
                    return a > b;
                }, BOOLEAN_FALSE, sorted);
                return sorted;
            },
            reverse: function () {
                var sorted = this;
                sorted.toggle(REVERSED);
                sorted.sort();
                return sorted;
            },
            closestIndex: function (value) {
                return closestIndex(this.unwrap(), value);
            },
            closest: function (value) {
                var index, list = this.unwrap();
                return (index = closestIndex(list, value)) === -1 ? UNDEFINED : list[index];
            },
            validIDType: function (id) {
                return isNumber(id) || isString(id);
            },
            indexOf: function (object, min, max) {
                return smartIndexOf(this.unwrap(), object, BOOLEAN_TRUE);
            },
            load: function (values) {
                var sm = this;
                if (isArray(values)) {
                    duff(values, sm.add, sm);
                } else {
                    sm.add(values);
                }
                return sm;
            },
            add: function (object) {
                var registryDirective, sorted = this,
                    isNotNull = object == NULL && exception(isNullMessage),
                    valueOfResult = object && object.valueOf(),
                    retrieved = (registryDirective = sorted[REGISTRY]) && sorted.get(ID, valueOfResult);
                if (retrieved) {
                    return BOOLEAN_FALSE;
                }
                ret = !sorted.validIDType(valueOfResult) && exception(validIdMessage);
                sorted.insertAt(object, sorted.closestIndex(valueOfResult) + 1);
                (registryDirective || sorted.directive(REGISTRY)).keep(ID, valueOfResult, object);
                return BOOLEAN_TRUE;
            },
            remove: function (object, index) {
                var where, sorted = this,
                    isNotNull = object == NULL && exception(isNullMessage),
                    valueOfResult = object && object.valueOf();
                if (object == NULL || sorted.get(ID, valueOfResult) == NULL) {
                    return BOOLEAN_FALSE;
                }
                sorted.removeAt(index === UNDEFINED ? sorted.indexOf(object) : index);
                sorted.unRegister(ID, valueOfResult);
                return BOOLEAN_TRUE;
            },
            pop: function () {
                return this.remove(this.last());
            },
            shift: function () {
                return this.remove(this.first());
            }
        }),
        StringObject = factories.StringObject = factories.Extendable.extend('StringObject', {
            constructor: function (value, parent) {
                var string = this;
                string.value = value;
                string.parent = parent;
                string.isValid(BOOLEAN_TRUE);
                return string;
            },
            toggle: function (direction) {
                this.isValid(toggle(this.isValid(), direction));
            },
            isValid: function (value) {
                var string = this;
                if (arguments[LENGTH]) {
                    if (string.valid !== value) {
                        string.parent.increment();
                        string.valid = value;
                    }
                    return string;
                } else {
                    return string.valid;
                }
            },
            valueOf: function () {
                return this.value;
            },
            toString: function () {
                return this.value;
            },
            generate: function () {
                return this.isValid() ? this.valueOf() : EMPTY_STRING;
            }
        }),
        StringManager = factories.StringManager = SortedCollection.extend('StringManager', {
            Child: StringObject,
            add: function (string) {
                var sm = this,
                    found = sm.get(ID, string);
                if (string) {
                    if (found) {
                        found.isValid(BOOLEAN_TRUE);
                    } else {
                        found = new sm.Child(string, sm);
                        sm.unwrap().push(found);
                        sm.register(ID, string, found);
                    }
                }
                return found;
            },
            empty: function () {
                var sm = this;
                // wipes array and id hash
                List[CONSTRUCTOR][PROTOTYPE].empty.call(sm);
                // resets change counter
                sm.current(EMPTY_STRING);
                return sm;
            },
            increment: function () {
                this.changeCounter++;
            },
            decrement: function () {
                this.changeCounter--;
            },
            remove: function (string) {
                var sm = this,
                    found = sm.get(ID, string);
                if (string && found) {
                    found.isValid(BOOLEAN_FALSE);
                }
                return sm;
            },
            toggle: function (string, direction) {
                var wasFound = BOOLEAN_TRUE,
                    sm = this,
                    found = sm.get(ID, string);
                if (!found) {
                    wasFound = BOOLEAN_FALSE;
                    found = sm.add(string);
                }
                if (direction === UNDEFINED) {
                    if (wasFound) {
                        found.toggle();
                    }
                } else {
                    found.toggle(direction);
                }
            },
            rebuild: function () {
                // rebuilds the registry
                var parent = this,
                    collectable = [],
                    parentRegistry = parent.directive(REGISTRY);
                parent.each(function (stringInstance) {
                    if (stringInstance.isValid()) {
                        this.push(stringInstance);
                    } else {
                        parentRegistry.drop(ID, stringInstance.value);
                    }
                }, collectable);
                parent.reset(collectable);
                return parent;
            },
            generate: function (delimiter_) {
                var validResult, string = EMPTY_STRING,
                    parent = this,
                    previousDelimiter = parent.delimiter,
                    delimiter = delimiter_;
                if (!parent.changeCounter && delimiter === previousDelimiter) {
                    return parent.current();
                }
                parent.delimiter = delimiter;
                parent.rebuild();
                string = parent.join(delimiter);
                parent.current(string);
                return string;
            },
            current: function (current) {
                var sm = this;
                if (arguments[LENGTH]) {
                    sm.changeCounter = 0;
                    sm.currentValue = current;
                    return sm;
                } else {
                    return sm.currentValue;
                }
            },
            ensure: function (value_, splitter) {
                var sm = this,
                    value = value_,
                    delimiter = splitter === UNDEFINED ? SPACE : splitter,
                    isArrayResult = isArray(value),
                    madeString = (isArrayResult ? value.join(delimiter) : value);
                if (sm.current() === madeString) {
                    return sm;
                }
                sm.load(isArrayResult ? value : (isString(value) ? value.split(delimiter) : BOOLEAN_FALSE));
                sm.current(madeString);
                return sm;
            },
            refill: function (array_) {
                var sm = this,
                    array = array_;
                sm.empty();
                if (array) {
                    sm.load(array);
                }
                sm.increment();
                return sm;
            }
        });
    app.defineDirective(REGISTRY, Registry[CONSTRUCTOR]);
});