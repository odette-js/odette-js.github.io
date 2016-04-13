application.scope().run(function (app, _, factories) {
    $.plugin(function ($) {
        var BOOLEAN_TRUE = !0,
            BOOLEAN_FALSE = !1,
            DRAGGING = 'dragging',
            depressed = BOOLEAN_FALSE,
            startPoint = {},
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
            };
        $.document.expandEvent('drag', ['mousedown', 'mousemove', 'mouseup'].concat($.events.lists.touch));
        $.document.customEvent('drag', function (originalFn) {
            return function (e) {
                var scalar, duration, startCopy, currentPoint, deltaX, deltaY;
                if (e.drag) {
                    return originalFn(e);
                } else {
                    // temporarily makes the variable depressed true, so that child elements
                    // do not prevent parents from firing their respective events.
                    depressed = depressed || ends[e.originalType];
                }
                if (!depressed && starts[e.originalType]) {
                    depressed = BOOLEAN_TRUE;
                    startPoint = coord(e);
                    startPoint.timestamp = e.timestamp;
                    return;
                }
                if (!depressed) {
                    return;
                }
                if (ends[e.originalType]) {
                    depressed = BOOLEAN_FALSE;
                }
                currentPoint = coord(e);
                startCopy = e.startPoint = {
                    x: startPoint.x,
                    y: startPoint.y,
                    timestamp: startPoint.timestamp
                };
                e.drag = {
                    depressed: depressed,
                    vector: [startCopy, currentPoint],
                    deltaX: (deltaX = currentPoint.x - startCopy.x),
                    deltaY: (deltaY = startCopy.y - currentPoint.y),
                    duration: (duration = e.timestamp - startPoint.timestamp),
                    scalar: (scalar = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))),
                    angle: (((Math.atan2(deltaY, deltaX) / Math.PI) * 180)),
                    speed: scalar / duration
                };
                if (e.drag.angle < 0) {
                    e.drag.angle = 360 + e.drag.angle;
                }
                e.mark(DRAGGING);
                return originalFn(e);
            };
        });
        $.document.expandEvent('swipe', 'drag');
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