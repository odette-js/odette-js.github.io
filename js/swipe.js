application.scope().run(function (app, _, factories) {
    'use strict';
    $.plugin(function ($) {
        var BOOLEAN_TRUE = !0,
            BOOLEAN_FALSE = !1,
            DRAGGING = 'dragging',
            depressed = BOOLEAN_FALSE,
            dragStartPoint = {},
            ends = {
                touchcancel: BOOLEAN_TRUE,
                mouseup: BOOLEAN_TRUE,
                touchend: BOOLEAN_TRUE
            },
            starts = {
                touchstart: BOOLEAN_TRUE,
                mousedown: BOOLEAN_TRUE
            },
            dpr = $.devicePixelRatio,
            coord = function (e) {
                var firstTouch, originalEvent = e.originalEvent || {},
                    touches = e.touches || originalEvent.touches;
                if (touches) {
                    return (firstTouch = touches[0]) ? {
                        x: firstTouch.pageX * dpr,
                        y: firstTouch.pageY * dpr
                    } : {
                        x: 0,
                        y: 0
                    };
                } else {
                    return {
                        x: e.pageX * dpr,
                        y: e.pageY * dpr
                    };
                }
            },
            targetIsContained = function (e) {
                return e.origin.element() !== e.target && !e.origin.contains(e.target);
            };
        $.document.expandEvent('drag', ['mousedown', 'mousemove', 'mouseup'].concat($.events.lists.touch));
        $.document.customEvent('drag', function (originalFn, originalName) {
            return function (e) {
                // console.log(e.origin.element());
                var scalar, duration, startCopy, currentPoint, deltaX, deltaY;
                if (e.dragStartPoint) {
                    return originalFn(e);
                } else {
                    // temporarily makes the variable depressed true, so that child elements
                    // do not prevent parents from firing their respective events.
                    depressed = depressed || ends[e.originalType];
                }
                if (!e.origin.is(DRAGGING) && starts[e.originalType]) {
                    depressed = BOOLEAN_TRUE;
                    dragStartPoint = e.dragStartPoint = coord(e);
                    dragStartPoint.timestamp = e.timestamp;
                    e.unmark(DRAGGING);
                    _.wraptry(function () {
                        originalFn(e);
                    });
                    e.origin.mark(DRAGGING, targetIsContained(e));
                    return;
                }
                if (!depressed) {
                    return;
                }
                if (!dragStartPoint) {
                    e.origin.mark(DRAGGING);
                }
                if (!e.origin.is(DRAGGING)) {
                    if (ends[e.originalType]) {
                        depressed = BOOLEAN_FALSE;
                    }
                    return;
                }
                currentPoint = coord(e);
                if (ends[e.originalType]) {
                    e.origin.unmark(DRAGGING);
                    depressed = BOOLEAN_FALSE;
                    e.dragEndPoint = currentPoint;
                }
                startCopy = e.dragStartPoint = {
                    x: dragStartPoint.x,
                    y: dragStartPoint.y,
                    timestamp: dragStartPoint.timestamp
                };
                e.drag = {
                    movementX: e.movementX,
                    movementY: e.movementY,
                    depressed: depressed,
                    vector: [startCopy, currentPoint],
                    deltaX: (deltaX = currentPoint.x - startCopy.x),
                    deltaY: (deltaY = startCopy.y - currentPoint.y),
                    duration: (duration = e.timestamp - dragStartPoint.timestamp),
                    scalar: (scalar = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))),
                    angle: (((Math.atan2(deltaY, deltaX) / Math.PI) * 180)),
                    speed: scalar / duration
                };
                if (e.drag.angle < 0) {
                    e.drag.angle = 360 + e.drag.angle;
                }
                e.remark(DRAGGING, !e.dragEndPoint);
                return originalFn(e);
            };
        });
        $.document.expandEvent('swipe dragstart dragend', 'drag');
        $.document.customEvent('dragstart', function (originalHandler) {
            return function (e) {
                if (!e.is(DRAGGING) && e.dragStartPoint && !e.dragEndPoint) {
                    originalHandler(e);
                }
            };
        });
        $.document.customEvent('dragend', function (originalHandler) {
            return function (e) {
                if (!e.is(DRAGGING) && e.dragStartPoint && e.dragEndPoint) {
                    originalHandler(e);
                }
            };
        });
        // $.document.expandEvent('swipe', 'drag');
        $.document.customEvent('swipe', function (originalHandler) {
            return function (e) {
                var angle, handlerresult, drag = e.drag,
                    swipe = e.swipe;
                if (swipe) {
                    if (swipe.direction) {
                        handlerresult = originalHandler(e);
                    }
                    return handlerresult;
                }
                if (!drag || !drag.vector) {
                    return;
                }
                if (drag.depressed) {
                    // can't be a swipe until you let go of the screen
                    return;
                }
                swipe = e.swipe = {
                    horizontal: BOOLEAN_FALSE,
                    vertical: BOOLEAN_FALSE
                };
                if (drag.scalar < 40 || drag.speed < 0.1) {
                    return;
                }
                swipe.horizontal = BOOLEAN_TRUE;
                angle = drag.angle;
                if (angle >= 135 && angle <= 225) {
                    swipe.direction = 'left';
                } else {
                    if (angle >= 315 || angle <= 45) {
                        swipe.direction = 'right';
                    } else {
                        swipe.horizontal = BOOLEAN_FALSE;
                        swipe.vertical = BOOLEAN_TRUE;
                        if (angle > 45 && angle < 135) {
                            swipe.direction = 'up';
                        } else {
                            if (angle > 225 && angle < 315) {
                                swipe.direction = 'down';
                            }
                        }
                    }
                }
                return originalHandler(e);
            };
        });
        var swipeDirections = 'swipeup swipedown swiperight swipeleft';
        $.document.expandEvent(swipeDirections, 'swipe');
        $.document.customEvent(swipeDirections, function (originalHandler, eventName) {
            return function (e) {
                var swipe = e.swipe;
                if (!swipe || 'swipe' + swipe.direction !== eventName) {
                    return;
                }
                return originalHandler(e);
            };
        });
    });
});