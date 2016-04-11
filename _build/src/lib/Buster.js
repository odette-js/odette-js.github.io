app.scope(function (app) {
    var _ = app._,
        factories = _.factories,
        parse = _.parse,
        stringify = _.stringify,
        ENCODED_BRACKET = '%7B',
        IS_LATE = 'isLate',
        DOCUMENT_READY = 'documentReady',
        IS_WINDOW = 'isWindow',
        DEFERRED = 'deferred',
        RESOLVED = 'resolved',
        IS_DEFERRED = 'is' + upCase(DEFERRED),
        GROUP = 'group',
        POST_TO = 'postTo',
        COMMAND = 'command',
        RUN_COUNT = 'runCount',
        FLUSHING = 'flushing',
        CONNECT = 'connect',
        CONNECTED = CONNECT + 'ed',
        DISCONNECTED = 'dis' + CONNECTED,
        COMPONENT = 'component',
        INITIALIZE = 'initialize',
        RESPONSE = 'response',
        MESSAGE = 'message',
        RESPONSE_OPTIONS = RESPONSE + 'Options',
        CAPITAL_RESPONSE = upCase(RESPONSE),
        LATEST_RESPONSE = 'latest' + CAPITAL_RESPONSE,
        LAST_RESPONSE = 'last' + CAPITAL_RESPONSE,
        RESPONDED = 'responded',
        RESPONDED_WITH = RESPONDED + 'With',
        RECEIVED = 'received',
        BEFORE_RESPONDED = BEFORE_COLON + RESPONDED,
        BEFORE_RECEIVED = BEFORE_COLON + RECEIVED,
        QUEUED_MESSAGE_INDEX = 'queuedMessageIndex',
        SENT_MESSAGE_INDEX = 'sentMessageIndex',
        RECEIVED_REFERRER = 'receiveReferrer',
        EMIT_REFERRER = 'emitReferrer',
        BUSTER = 'buster',
        PACKET = 'packet',
        VERSION = 'version',
        busterGroupHash = {},
        receive = function (evt) {
            var buster, data = evt.data(),
                postTo = data.postTo;
            if (app.isDestroyed || !data || !postTo || (app[VERSION] !== data[VERSION] && data[VERSION] !== '*')) {
                return;
            }
            buster = (busterGroupHash[data.group] || {})[data.postTo];
            if (!buster) {
                return;
            }
            var originalMessage, runCount = data.runCount,
                children = buster.directive(CHILDREN);
            if (runCount) {
                originalMessage = children.get(ID, data.messageId);
                if (!originalMessage) {
                    return buster;
                }
                // found the message that i originally sent you
                // allow the buster to set some things up
                buster.response(originalMessage, data);
            } else {
                buster.receive(data);
            }
        },
        /**
         * single function to stringify and post message an object to the other side
         * @private
         * @arg {object} object to be stringified and sent to the receive function,
         * either through a post message, or through a setTimeout
         * @arg {buster}
         */
        postMessage = function (base, buster) {
            var referrer, message = stringify(base);
            return buster.emitWindow.emit(message, buster.get(EMIT_REFERRER), receive);
        },
        defaultGroupId = uuid(),
        RESPOND_HANDLERS = 'respondHandlers',
        Message = factories.Model.extend(upCase(MESSAGE), {
            idAttribute: MESSAGE + 'Id',
            initialize: function () {
                var message = this;
                message[RESPOND_HANDLERS] = [];
                message.once(RESPONSE, message.saveReceived);
                message.on(DEFERRED, message.saveDeferred);
            },
            saveReceived: function (e) {
                this.responseEventObject = e;
            },
            saveDeferred: function (e) {
                this.deferredEventObject = e;
            },
            packet: function (data) {
                var message = this;
                if (arguments[0]) {
                    message.set(PACKET, data || {});
                } else {
                    message = parse(stringify(message.get(PACKET)));
                }
                return message;
            },
            defaults: function () {
                return {
                    command: NULL + EMPTY_STRING,
                    packet: {}
                };
            },
            response: function (handler) {
                var message = this;
                if (!isFunction(handler)) {
                    return message;
                }
                if (message.get(RESPONDED_WITH)) {
                    handler.call(message, message.responseEventObject);
                } else {
                    message.once(RESPONSE, handler);
                }
                return message;
            },
            deferred: function (handler) {
                var message = this,
                    latestResponse = message.get(LATEST_RESPONSE);
                message.on(DEFERRED, handler);
                if (latestResponse && latestResponse.isDeferred) {
                    handler.call(message, message.deferredEventObject);
                }
                return message;
            },
            send: function () {
                return this[PARENT].flush();
            }
        }),
        receiveWindowEvents = {
            message: receive
        },
        wipe = function (buster) {
            return find(busterGroupHash, function (groupHash) {
                return find(groupHash, function (previousbuster, key, groupHash) {
                    return buster === previousbuster && delete groupHash[key];
                });
            });
        },
        disconnected = function () {
            var buster = this;
            if (buster.connectPromise) {
                buster.connectPromise.reject();
            }
            buster.unmark(CONNECTED);
            buster[DISPATCH_EVENT](DISCONNECTED);
            buster.connectPromise = _.Promise();
        },
        connected = function (buster, message) {
            buster.connectPromise.fulfill(message);
            buster.mark(CONNECTED);
            buster[DISPATCH_EVENT](CONNECTED);
        },
        connectReceived = function (e) {
            // first submit a response so the other side can flush
            var buster = this,
                dataDirective = buster.directive(DATA);
            if (dataDirective.get(IS_LATE)) {
                dataDirective.set(SENT_MESSAGE_INDEX, 1);
            }
            buster.respond((e.message || e.origin).id);
            buster.mark(CONNECTED);
            buster[DISPATCH_EVENT](CONNECTED);
        },
        UPCASED_BUSTER = upCase(BUSTER),
        defaultMessage = function (buster) {
            return {
                from: buster.get(ID),
                postTo: buster.get(POST_TO),
                group: buster.get(GROUP),
                version: app[VERSION],
                messageId: buster.directive(CHILDREN)[LENGTH](),
                timeStamp: _.now()
            };
        },
        Buster = factories[UPCASED_BUSTER] = factories.Model.extend(UPCASED_BUSTER, {
            Child: Message,
            bounce: function (e) {
                return this.respond(e.message.id);
            },
            connected: function () {
                this.connectPromise.success(arguments);
                return this;
            },
            response: function (original, data) {
                var buster = this,
                    originalData = original[DATA];
                if (!originalData) {
                    return;
                }
                originalData.set(LATEST_RESPONSE, data);
                if (original.is(RESOLVED)) {
                    original[DISPATCH_EVENT](DEFERRED, data.packet);
                } else {
                    originalData.set(RESPONDED_WITH, data);
                    original.mark(RESOLVED);
                    original[DISPATCH_EVENT](RESPONSE, data.packet);
                }
            },
            receive: function (data) {
                var message, buster = this,
                    receiveHistory = buster.receiveHistory;
                data.originMessageId = data.messageId;
                data.messageId = receiveHistory.length();
                data.isDeferred = BOOLEAN_FALSE;
                message = Message(data);
                receiveHistory.push(message);
                receiveHistory.register(ID, data.messageId, message);
                buster[DISPATCH_EVENT](BEFORE_RECEIVED);
                buster[DISPATCH_EVENT](RECEIVED + COLON + data.command, data.packet, {
                    message: message
                });
                buster[DISPATCH_EVENT](RECEIVED);
                return buster;
            },
            setGroup: function () {
                var buster = this,
                    group = buster.get(GROUP),
                    id = buster.get(ID),
                    resultant = wipe(buster),
                    groupHash = busterGroupHash[group] = busterGroupHash[group] || {};
                groupHash[id] = buster;
                return buster;
            },
            /**
             * @func
             * @name Buster#defaults
             */
            defineWindows: function (receiveWindow, emitWindow) {
                var buster = this,
                    busterData = buster.directive(DATA);
                if (receiveWindow && receiveWindow[IS_WINDOW]) {
                    // takes care of preventing duplicate handlers
                    buster.receiveWindow = receiveWindow.on(receiveWindowEvents);
                    buster.mark(DOCUMENT_READY);
                    buster.flush();
                }
                if (emitWindow && emitWindow[IS_WINDOW]) {
                    buster.emitWindow = emitWindow;
                    busterData.set(POST_TO, busterData.get(POST_TO) || buster.emitWindow.address);
                }
            },
            defineIframe: function (iframe) {
                var busterData, emitReferrer, receiveReferrer, iframeSrc, referrer, receiveWindow, data, href, windo, buster = this;
                if (!iframe || !iframe.isIframe) {
                    return;
                }
                buster[IFRAME] = iframe;
                if (iframe.is('attached') && (windo = iframe.window())) {
                    buster.defineWindows(NULL, windo);
                }
                if (iframe) {
                    buster.setupIframe();
                }
            },
            setupIframe: function () {
                var emitReferrer, buster = this,
                    iframe = buster[IFRAME],
                    busterData = buster.directive(DATA),
                    hrefSplit = buster.receiveWindow.element().location.href.split(ENCODED_BRACKET),
                    hrefShift = hrefSplit.shift(),
                    unshifted = hrefSplit.unshift(EMPTY_STRING),
                    href = hrefSplit.join(ENCODED_BRACKET),
                    receiveReferrer = parseUrl(busterData.get(RECEIVED_REFERRER) || href).origin,
                    iframeSrc = busterData.get(IFRAME + 'Src'),
                    iframeContent = busterData.get(IFRAME + 'Content'),
                    // this is going to the
                    data = {
                        postTo: buster.id,
                        useTop: false,
                        // post to me
                        useParent: true,
                        emitReferrer: receiveReferrer,
                        id: busterData.get(POST_TO),
                        group: busterData.get(GROUP)
                    };
                busterData.set(RECEIVED_REFERRER, receiveReferrer);
                if (iframeSrc) {
                    emitReferrer = busterData.set(EMIT_REFERRER, _.reference(iframeSrc));
                    data.receiveReferrer = emitReferrer;
                }
                if (iframeSrc) {
                    iframe.src(stringifyQuery({
                        url: iframeSrc,
                        hash: data
                    }));
                }
                if (iframeContent) {
                    iframe.data(BUSTER, encodeURI(stringify(data)));
                    iframe.html(iframeContent);
                    buster.begin(INITIALIZE);
                }
            },
            stripData: function () {
                var hashSplit, hashShift, hashString, buster = this,
                    receiveWindow = buster.receiveWindow;
                if (!receiveWindow || !receiveWindow[IS_WINDOW]) {
                    return;
                }
                hashString = receiveWindow.element().location.hash.slice(1);
                hashSplit = hashString.split(ENCODED_BRACKET);
                hashShift = hashSplit.shift();
                hashSplit.unshift(EMPTY_STRING);
                hashString = hashSplit.join(ENCODED_BRACKET);
                buster.set(parse(decodeURI(hashString || wraptry(function () {
                    return receiveWindow.parent(IFRAME).data(BUSTER);
                }))));
            },
            constructor: function (listen, talk, settings_, events) {
                var buster = this;
                var settings = settings_ || {};
                // normalize to manager
                var receiveWindow = $(listen).index(0);
                var manager = $(talk).index(0);
                settings.id = settings.id === UNDEFINED ? uuid() : settings.id;
                buster.receiveHistory = factories.Collection();
                disconnected.call(buster);
                settings.group = defaultGroupId;
                factories.Model[CONSTRUCTOR].call(buster, settings);
                buster.on(CONNECTED, function (e) {
                    buster.connectPromise.fulfill(buster.directive(CHILDREN).first());
                    buster.flush();
                });
                buster.on({
                    'received:update': 'bounce',
                    'received:unload': 'destroy',
                    destroy: disconnected,
                    'received:initialize received:connect': connectReceived,
                    'change:group change:id': 'setGroup'
                });
                buster.on(events);
                buster.setGroup();
                if (receiveWindow && receiveWindow[IS_WINDOW]) {
                    buster.defineWindows(receiveWindow);
                }
                if (manager[IS_WINDOW]) {
                    buster.defineWindows(NULL, manager);
                    // window tests... because messages are going up
                } else {
                    buster.defineIframe(manager);
                    // iframe tests... because messages are going down
                }
                if (buster.get('strip')) {
                    buster.stripData();
                }
                buster.set(SENT_MESSAGE_INDEX, 0);
                if (buster[IFRAME]) {
                    // oh, are we late?
                    if (buster.get(IS_LATE)) {
                        buster.begin(INITIALIZE);
                    }
                } else {
                    // is an inner buster... let's check to see if anyone is waiting for us
                    buster.begin(CONNECT);
                }
                return buster;
            },
            /**
             * tries to flush the cache. only works if the connected attribute is set to true. If it is, then the post message pipeline begins
             * @returns {buster} returns this;
             * @func
             * @name Buster#flush
             */
            flush: function () {
                var command, children, n, item, gah, childrenLen, queuedMsg, nuData, i = 0,
                    buster = this,
                    dataManager = buster.directive(DATA),
                    currentIdx = dataManager.get(SENT_MESSAGE_INDEX),
                    connected = buster.is(CONNECTED),
                    initedFrom = dataManager.get('initedFromPartner'),
                    flushing = dataManager.get(FLUSHING);
                if (!buster.is(DOCUMENT_READY)) {
                    return buster;
                }
                if (!initedFrom || connected && ((connected || !currentIdx) && !flushing)) {
                    dataManager.set(FLUSHING, BOOLEAN_TRUE);
                    children = buster.directive(CHILDREN);
                    childrenLen = children[LENGTH]();
                    queuedMsg = children.index(currentIdx);
                    while (queuedMsg && currentIdx < childrenLen) {
                        queuedMsg.directive(DATA).set(RUN_COUNT, 0);
                        if (currentIdx || connected) {
                            queuedMsg = children.index(currentIdx);
                            currentIdx = (dataManager.get(SENT_MESSAGE_INDEX) + 1) || 0;
                            dataManager.set(SENT_MESSAGE_INDEX, currentIdx);
                            postMessage(queuedMsg, buster);
                        } else {
                            // initializing
                            childrenLen = UNDEFINED;
                            command = queuedMsg.get(COMMAND);
                            if (command === CONNECT || command === INITIALIZE) {
                                postMessage(queuedMsg, buster);
                            }
                        }
                    }
                    buster.set(FLUSHING, BOOLEAN_FALSE);
                    if (buster.is(CONNECTED)) {
                        if (children[LENGTH]() > buster.get(SENT_MESSAGE_INDEX)) {
                            buster.flush();
                        }
                    }
                }
                return buster;
            },
            /**
             * basic send message function, adds to queue, then calls flush
             * @arg {string} can be string or object. if object, must have command property as string
             * @arg {object} base object to be sent
             * @returns {buster}
             * @func
             * @name Buster#send
             */
            create: function (command, packet, extra) {
                var buster = this,
                    message = buster.add(extend({
                        command: command,
                        packet: packet
                    }, defaultMessage(buster), extra));
                return message[0];
            },
            /**
             * shorthand for creating a function that gets called after the buster's partner has responded
             * @func
             * @name Buster#sync
             */
            sync: function (fn) {
                return this.create('update').response(fn).send();
            },
            /**
             * creates a default message based on the attributes of the buster
             * @returns {object} blank / default message object
             * @func
             * @name Buster#defaultMessage
             */
            /**
             * respond trigger.
             * @arg {object} original data object (same pointer) that was sent over
             * @arg {object} extend object, that will be applied to a base object, that is created by the responseExtend attribute set on the buster object
             * @returns {buster}
             * @func
             * @name Buster#respond
             */
            respond: function (messageId, packet_) {
                var messageData, packet, lastRespondUpdate, newMessage, buster = this,
                    originalMessage = buster.receiveHistory.get(ID, messageId);
                if (!originalMessage) {
                    return buster;
                }
                buster[DISPATCH_EVENT](BEFORE_RESPONDED);
                // if (buster.el && (!data.canThrottle || buster.shouldUpdate(arguments))) {
                // on the inner functions, we don't want to allow this
                // module to be present, so the inner does not influence the outer
                messageData = originalMessage.directive(DATA);
                messageData.set(RUN_COUNT, (messageData.get(RUN_COUNT) || 0) + 1);
                packet = extend(BOOLEAN_TRUE, result(buster, 'package') || {}, packet_);
                newMessage = extend(defaultMessage(buster), {
                    from: originalMessage.get(POST_TO),
                    postTo: originalMessage.get('from'),
                    messageId: originalMessage.get('originMessageId'),
                    isResponse: BOOLEAN_TRUE,
                    isDeferred: originalMessage.get(IS_DEFERRED),
                    runCount: originalMessage.get(RUN_COUNT),
                    command: originalMessage.get(COMMAND),
                    timeStamp: _.now(),
                    packet: packet,
                    version: originalMessage.get(VERSION)
                });
                // silent sets
                messageData.set(LAST_RESPONSE, newMessage.timeStamp);
                messageData.set(IS_DEFERRED, BOOLEAN_TRUE);
                // loud set
                buster.set(LAST_RESPONSE, newMessage.timeStamp);
                postMessage(newMessage, buster);
                buster[DISPATCH_EVENT](RESPONDED, packet);
                return buster;
            },
            /**
             * starts a relationship between two busters. simplifies the initialization process.
             * @returns {number} just for responding to the original message in case there's a handler
             * @func
             * @name Buster#begin
             */
            begin: function (command) {
                var buster = this,
                    children = buster.directive(CHILDREN);
                return children.index(0) || buster.create(command).response(function (e) {
                    connectReceived.call(buster, e);
                }).send();
            }
        });
    if (app.topAccess()) {
        $(win[TOP]).on(MESSAGE, receive);
    }
});