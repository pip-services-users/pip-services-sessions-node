"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const SessionV1_1 = require("../data/version1/SessionV1");
const SessionsCommandSet_1 = require("./SessionsCommandSet");
class SessionsController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(SessionsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new SessionsCommandSet_1.SessionsCommandSet(this);
        return this._commandSet;
    }
    getSessions(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getSessionById(correlationId, sessionId, callback) {
        this._persistence.getOneById(correlationId, sessionId, callback);
    }
    openSession(correlationId, user_id, user_name, address, client, user, data, callback) {
        let session = new SessionV1_1.SessionV1(pip_services_commons_node_3.IdGenerator.nextLong(), user_id, user_name, address, client);
        session.user = user;
        session.data = data;
        this._persistence.create(correlationId, session, callback);
    }
    storeSessionData(correlationId, sessionId, data, callback) {
        this._persistence.updatePartially(correlationId, sessionId, pip_services_commons_node_4.AnyValueMap.fromTuples('request_time', new Date(), 'data', data), callback);
    }
    closeSession(correlationId, sessionId, callback) {
        this._persistence.updatePartially(correlationId, sessionId, pip_services_commons_node_4.AnyValueMap.fromTuples('active', false, 'request_time', new Date(), 'close_time', new Date()), callback);
    }
    deleteSessionById(correlationId, sessionId, callback) {
        this._persistence.deleteById(correlationId, sessionId, callback);
    }
}
SessionsController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-sessions:persistence:*:*:1.0');
exports.SessionsController = SessionsController;
//# sourceMappingURL=SessionsController.js.map