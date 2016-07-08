application.scope().run(window, function (app, _, factories, documentView, scopedFactories, $) {
    // create a year tag so we never have to update it
    var currentYear = (new Date()).getYear() + 1900;
    $.registerElement('time-year', {
        creation: function () {
            var manager = this;
            manager.html(currentYear);
        }
    });
});
// create a text-reveal tag so we never have to update it
application.scope().run(window, function (app, _, factories, documentView, scopedFactories, $) {
    $.registerElement('text-reveal', {
        creation: function () {
            var manager = this;
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
});
application.scope().run(window, function (app, _, factories, documentView, scopedFactories, $) {
    var toggleHash = {};
    var directedToggle = function (manager, futureOpen_) {
        var target = manager.data('target'),
            futureOpen = futureOpen_ === void 0 ? !toggleHash[target] : futureOpen_,
            wrapped = manager.wrap(),
            together = target ? wrapped.add(target) : manager;
        together.add('[data-target="' + target + '"]').data('toggled', futureOpen);
        toggleHash[target] = futureOpen;
    };
    $.registerElement('click-toggler', {
        events: {
            click: 'toggle',
            'attributeChange:data-toggled': function (e) {
                this.remark('clickTogglerOpen', e.data().current);
            }
        },
        prototype: {
            toggle: function () {
                return directedToggle(this);
            },
            open: function () {
                return directedToggle(this, true);
            },
            close: function () {
                return directedToggle(this, false);
            }
        }
    });
});
application.scope().run(window, function (app, _, factories, documentView, scopedFactories, $) {
    $.registerElement('bacon', {
        creation: function () {
            var manager = this;
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
application.scope().run(window, function (app, _, factories, documentView, scopedFactories, $) {
    var removeHeight = function (manager, target) {
        return function () {
            manager.cancelHeightRemoval();
            target.css('height', '');
            // force reflow
            target.css('height');
        };
    };
    $.registerElement('expands-next', {
        creation: function () {
            var js, manager = this;
            if (manager.data('startsOpen')) {
                method = 'expand';
            } else {
                method = 'collapse';
            }
            if (manager.tagName === 'a') {
                js = 'javascript';
                manager.attr('href', js + ':void 0;');
            }
            manager.owner.window().once('load', _.bind(manager[method], manager));
        },
        prototype: {
            getTarget: function () {
                return this.next(this.data('target'));
            },
            collapse: function () {
                var childHeight, manager = this,
                    target = this.getTarget();
                if (!target) {
                    return manager;
                }
                childHeight = target.children(0).height();
                manager.unmark('expanded');
                target.changeClass('expanded', 'collapser-ready');
                return manager.setHeight(target, childHeight, 0);
            },
            expand: function () {
                var childHeight, manager = this,
                    target = this.getTarget();
                if (!target) {
                    return manager;
                }
                childHeight = target.children(0).height();
                manager.mark('expanded');
                target.addClass('expanded collapser-ready');
                return manager.setHeight(target, 0, childHeight);
            },
            setHeight: function (target, fromhere, tohere) {
                var manager = this;
                var duration = target.data('duration') || 0;
                var diff = tohere - fromhere;
                manager.cancelHeightRemoval();
                manager.__heightRemovalId = _.AF.tween(duration, function (ms, perc, done) {
                    target.css('height', fromhere + (diff * perc));
                });
            },
            cancelHeightRemoval: function () {
                _.AF.remove(this.__heightRemovalId);
                return this;
            }
        },
        events: {
            click: function (e) {
                var manager = this;
                if (manager.is('expanded')) {
                    manager.collapse();
                } else {
                    manager.expand();
                }
            }
        }
    });
});
application.scope().run(window, function (app, _, factories, documentView, scopedFactories, $) {
    var directionMap = {
        x: 'Left',
        y: 'Top'
    };
    var dimensionMap = {
        x: 'Width',
        y: 'Height'
    };
    var returnsProp = function (dir) {
        return 'scroll' + directionMap[dir];
    };
    var lastScrolling;
    var deferredRender = function (remove, add, updateX, updateY) {
        var scroller = this;
        scroller.rail.x.css({
            left: scroller.scrollX,
            bottom: -scroller.scrollY
        });
        scroller.rail.y.css({
            right: -scroller.scrollX,
            top: scroller.scrollY
        });
        scroller.bar.x.css(updateX);
        scroller.bar.y.css(updateY);
        scroller.changeClass(remove, add);
        scroller.finished();
    };
    var deferredFinished = function () {
        var scroller = this;
        var $body = scroller.owner.$('body');
        var scopedClass = 'scrolling-' + scroller.id;
        return $body.hasClass(scopedClass) ? $body.removeClass('is-scrolling ' + scopedClass) : false;
    };
    $.registerElement('scroller', {
        events: {
            scroll: 'render',
            'wheel drag': 'update',
            attach: 'ensureScrollable'
        },
        creation: function () {
            var scroller = this;
            scroller.updateUI = _.AF.defer(deferredRender, 0);
            scroller.finished = _.AF.defer(deferredFinished, 100);
            var owner = scroller.owner;
            var railX = owner.makeBranch(scroller.railTemplate('x'));
            var railY = owner.makeBranch(scroller.railTemplate('y'));
            var barX = owner.makeBranch(scroller.barTemplate('x'));
            var barY = owner.makeBranch(scroller.barTemplate('y'));
            scroller.bar = {
                x: barX,
                y: barY
            };
            scroller.rail = {
                x: railX,
                y: railY
            };
            railX.append(barX);
            railY.append(barY);
            scroller.lastMeasuredTop = 0;
            scroller.lastMeasuredLeft = 0;
            if (scroller.is('attached')) {
                scroller.ensureScrollable();
            }
            scroller.attachRails();
            scroller.window().on('resize', _.AF.defer(function () {
                scroller.reflow();
            }, 33));
        },
        prototype: {
            reflow: function () {
                this.ensureScrollable();
                this.attachRails();
            },
            attachRails: function () {
                var appends = [],
                    scroller = this;
                if (scroller.rail.x.parent() !== scroller) {
                    appends.push(scroller.rail.x);
                }
                if (scroller.rail.y.parent() !== scroller) {
                    appends.push(scroller.rail.y);
                }
                if (appends.length) {
                    scroller.append(appends);
                }
                scroller.update({
                    deltaX: 0,
                    deltaY: 0
                });
            },
            render: function () {
                // reacts to scroll events
                var e, scrollableX, scrollableY, percentageX, percentageY, railXWidth, railYHeight, updateX, updateY, scroller = this,
                    scrollX = scroller.lastMeasuredLeft,
                    scrollY = scroller.lastMeasuredTop,
                    addClasses = [],
                    removeClasses = [],
                    ACTIVE_X_CLASS = 'cs-active-x',
                    ACTIVE_Y_CLASS = 'cs-active-y';
                railXWidth = scroller.lastMeasuredWidth;
                railYHeight = scroller.lastMeasuredHeight;
                scrollableX = scroller.lastMeasuredScrollWidth;
                scrollableY = scroller.lastMeasuredScrollHeight;
                maxScrollableX = scroller.lastMeasuredMaxScrollWidth - railXWidth;
                maxScrollableY = scroller.lastMeasuredMaxScrollHeight - railYHeight;
                if (scrollableX) {
                    percentageX = (scrollX / (maxScrollableX)) * 100;
                    updateX = {
                        left: percentageX + '%',
                        width: ((railXWidth / scroller.lastMeasuredMaxScrollWidth) * 100) + '%',
                        transform: 'translate(' + (-percentageX) + '%, 0)'
                    };
                    addClasses.push(ACTIVE_X_CLASS);
                } else {
                    updateX = {
                        left: 0,
                        width: 100 + '%',
                        transform: 'translate(0)'
                    };
                    removeClasses.push(ACTIVE_X_CLASS);
                }
                if (scrollableY) {
                    percentageY = (scrollY / (maxScrollableY)) * 100;
                    updateY = {
                        top: percentageY + '%',
                        height: ((railYHeight / scroller.lastMeasuredMaxScrollHeight) * 100) + '%',
                        transform: 'translate(0, ' + (-percentageY) + '%)'
                    };
                    addClasses.push(ACTIVE_Y_CLASS);
                } else {
                    updateY = {
                        top: 0,
                        height: 100 + '%',
                        transform: 'translate(0)'
                    };
                    removeClasses.push(ACTIVE_Y_CLASS);
                }
                scroller.scrollX = scrollX;
                scroller.scrollY = scrollY;
                scroller.updateUI(removeClasses, addClasses, updateX, updateY);
            },
            update: function (e) {
                // forces scroll events based on deltaX, and deltaYs
                var adding, $body, drag, afterX, afterY, previousScrolling = lastScrolling,
                    scroller = this,
                    children = scroller.children(0),
                    originalTop = scroller.lastMeasuredTop,
                    originalLeft = scroller.lastMeasuredLeft,
                    maxTop = scroller.measure('y'),
                    maxLeft = scroller.measure('x'),
                    // where are we now
                    beforeY = scroller.lastMeasuredScrollTop,
                    beforeX = scroller.lastMeasuredScrollLeft,
                    // where do you think we should go, event?
                    top = beforeY + e.deltaY,
                    left = beforeX + e.deltaX;
                if ((drag = e.drag) && (top !== top || left !== left)) {
                    top = beforeY - drag.movementY;
                    left = beforeX - drag.movementX;
                }
                if (top !== top || left !== left) {
                    return;
                }
                top = _.baseClamp(top, 0, maxTop);
                left = _.baseClamp(left, 0, maxLeft);
                if (beforeX !== left || beforeY !== top) {
                    // let scroll handler react
                    scroller.lastMeasuredTop = top;
                    scroller.lastMeasuredLeft = left;
                    e.preventDefault();
                    e.stopPropagation();
                    scroller.element().scrollTop = scroller.lastMeasuredTop;
                    scroller.element().scrollLeft = scroller.lastMeasuredLeft;
                    lastScrolling = scroller.id;
                    $body = scroller.owner.$('body');
                    adding = 'is-scrolling scrolling-' + lastScrolling;
                    if (previousScrolling === lastScrolling) {
                        $body.addClass(adding);
                    } else {
                        $body.changeClass('scrolling-' + previousScrolling, adding);
                    }
                }
                scroller.render();
            },
            ensureScrollable: function () {
                var scroller = this,
                    scrollerStyle = scroller.getStyle();
                if (scrollerStyle.overflow !== 'hidden') {
                    scroller.applyStyle('overflow', 'hidden');
                    if (scroller.getStyle().overflow !== 'hidden') {
                        scroller.applyStyle('position', 'relative', true);
                    }
                }
                if (scrollerStyle.position === 'static') {
                    scroller.applyStyle('position', 'relative');
                    if (scroller.getStyle().position === 'static') {
                        scroller.applyStyle('position', 'relative', true);
                    }
                }
            },
            barTemplate: function (dir) {
                return '<div class="cs-bar cs-bar-' + dir + '"></div>';
            },
            railTemplate: function (dir) {
                return '<div class="cs-rail cs-rail-' + dir + '"></div>';
            },
            measure: function (dir) {
                var scroller = this,
                    element = scroller.element(),
                    dimension = dimensionMap[dir],
                    direction = directionMap[dir],
                    clientDim = element['client' + dimension],
                    scrollDim = element['scroll' + dimension];
                scroller['lastMeasuredScroll' + direction] = element['scroll' + direction];
                scroller['lastMeasuredScroll' + dimension] = scrollDim - clientDim;
                scroller['lastMeasuredMaxScroll' + dimension] = scrollDim;
                scroller['lastMeasured' + dimension] = clientDim;
                return scroller['lastMeasuredScroll' + dimension];
            }
        }
    });
});
application.scope().run(window, function (app, _, factories, documentView, scopedFactories, $) {
    $.registerElement('code-snippet', {
        // extends: 'scroller',
        creation: function () {
            var manager = this;
            // manager.on('click', '.triggers-run', this.run);
            this.code = this.$('code');
            this.makeBranch();
        },
        prototype: {
            template: function () {
                return '<div class="triggers-run">run</div>';
            },
            makeBranch: function () {
                var code = this;
                code.removeBranch();
                code.branch = $.makeBranch(code.template());
                code.branch.on('click', function () {
                    code.run();
                });
                code.updateRunnable();
                code.insertBefore(code.branch);
                return code;
            },
            removeBranch: function () {
                return this.branch && this.branch.destroy();
            },
            resetConsole: function () {
                _.evaluate(_, 'this.console.clear();');
            },
            updateRunnable: function () {
                this.branch.toggleClass('no-op', this.code.data('noexec'));
                return this;
            },
            run: function () {
                if (this.code.data('noexec')) {
                    this.resetConsole();
                    _.evaluate(_, 'this.console.log("this code will not run");');
                    return this;
                }
                this.resetConsole();
                this.evaluateCode();
                return this;
            },
            evaluateCode: function () {
                var text = this.code.text().replace(/[^:]\/\/(.*)/igm, '');
                var split = text.split('\n');
                var hoisted = [];
                var inFn = false;
                var foldedandJoined = _.foldl(split, function (memo, item) {
                    var trimmed = item.trim();
                    var first = trimmed[0];
                    var last = trimmed[trimmed.length - 1];
                    var wasinFn = inFn;
                    if (trimmed) {
                        if (trimmed[0] === 'r' && trimmed.slice(0, 7) === 'return ') {
                            memo.push(trimmed);
                            return memo;
                        }
                        if (last === '{' || first === '}') {
                            memo.push(trimmed);
                            return memo;
                        }
                        if (first === 'c' && trimmed.slice(0, 11) === 'console.log') {
                            memo.push(trimmed);
                            return memo;
                        }
                        if (first === 'v' && trimmed.slice(0, 4) === 'var ') {
                            trimmed = trimmed.slice(4);
                            trimmedSplit = trimmed.split('=');
                            hoisted.push(trimmedSplit[0].trim());
                            memo.push('console.log((' + trimmed.slice(0, trimmed.length - 1) + '));');
                            return memo;
                        }
                        if (_.indexOf(trimmed, ':') !== -1) {
                            memo.push(trimmed);
                        } else {
                            memo.push('console.log((' + trimmed.slice(0, trimmed.length - 1) + '));');
                        }
                    }
                    return memo;
                }, []).join('\n');
                hoisted = hoisted.length ? 'var ' + hoisted.join() + ';\n' : '';
                var code = 'application.scope().run(window, function (app, _, factories, documentView, scopedFactories, $) {\nvar console = _.console;\n' + hoisted + foldedandJoined + '\n});';
                _.evaluate(_, code);
                return code;
            }
        }
    });
});