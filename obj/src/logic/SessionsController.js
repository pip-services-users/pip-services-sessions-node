"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const SessionV1_1 = require("../data/version1/SessionV1");
const SessionsCommandSet_1 = require("./SessionsCommandSet");
class SessionsController {
    constructor() {
        this._logger = new pip_services3_components_node_1.CompositeLogger();
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(SessionsController._defaultConfig);
        this._expireTimeout = 24 * 3600000;
        this._cleanupInterval = 900000;
    }
    configure(config) {
        this._expireTimeout = config.getAsLongWithDefault('options.expire_timeout', this._expireTimeout);
        this._cleanupInterval = config.getAsLongWithDefault('options.cleanup_interval', this._cleanupInterval);
        this._logger.configure(config);
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new SessionsCommandSet_1.SessionsCommandSet(this);
        return this._commandSet;
    }
    isOpen() {
        return this._cleanupTimer != null;
    }
    open(correlationId, callback) {
        if (this._cleanupTimer) {
            if (callback)
                callback(null);
            return;
        }
        this._cleanupTimer = new pip_services3_commons_node_5.FixedRateTimer(() => {
            this._logger.info(correlationId, 'Closing expired user sessions');
            this.closeExpiredSessions(correlationId, null);
        }, this._cleanupInterval);
        this._cleanupTimer.start();
        if (callback)
            callback(null);
    }
    close(correlationId, callback) {
        if (this._cleanupTimer) {
            this._cleanupTimer.stop();
            this._cleanupTimer = null;
        }
        if (callback)
            callback(null);
    }
    getSessions(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getSessionById(correlationId, sessionId, callback) {
        this._persistence.getOneById(correlationId, sessionId, callback);
    }
    openSession(correlationId, user_id, user_name, address, client, user, data, callback) {
        let session = new SessionV1_1.SessionV1(pip_services3_commons_node_3.IdGenerator.nextLong(), user_id, user_name, address, client);
        session.user = user;
        session.data = data;
        this._persistence.create(correlationId, session, callback);
    }
    storeSessionData(correlationId, sessionId, data, callback) {
        this._persistence.updatePartially(correlationId, sessionId, pip_services3_commons_node_4.AnyValueMap.fromTuples('request_time', new Date(), 'data', data), callback);
    }
    updateSessionUser(correlationId, sessionId, user, callback) {
        this._persistence.updatePartially(correlationId, sessionId, pip_services3_commons_node_4.AnyValueMap.fromTuples('request_time', new Date(), 'user', user), callback);
    }
    closeSession(correlationId, sessionId, callback) {
        this._persistence.updatePartially(correlationId, sessionId, pip_services3_commons_node_4.AnyValueMap.fromTuples('active', false, 'request_time', new Date(), 'close_time', new Date(), 'data', null, 'user', null), callback);
    }
    closeExpiredSessions(correlationId, callback) {
        let now = new Date().getTime();
        let requestTime = new Date(now - this._expireTimeout);
        this._persistence.closeExpired(correlationId, requestTime, callback);
    }
    deleteSessionById(correlationId, sessionId, callback) {
        this._persistence.deleteById(correlationId, sessionId, callback);
    }
}
exports.SessionsController = SessionsController;
SessionsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('options.cleanup_interval', 900000, 'options.expire_timeout', 24 * 3600000, 'dependencies.persistence', 'pip-services-sessions:persistence:*:*:1.0');
//# sourceMappingURL=SessionsController.js.map