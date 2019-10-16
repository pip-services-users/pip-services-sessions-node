"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/sessions_v1_grpc_pb');
let messages = require('../../../../src/protos/sessions_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const SessionsGrpcConverterV1_1 = require("./SessionsGrpcConverterV1");
class SessionsGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.SessionsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor("pip-services-sessions", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getSessions(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let filter = new pip_services3_commons_node_2.FilterParams();
        SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toPagingParams(call.request.getPaging());
        this._controller.getSessions(correlationId, filter, paging, (err, result) => {
            let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
            let page = err == null ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSessionPage(result) : null;
            let response = new messages.SessionPageReply();
            response.setError(error);
            response.setPage(page);
            callback(err, response);
        });
    }
    getSessionById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();
        this._controller.getSessionById(correlationId, sessionId, (err, result) => {
            let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
            let session = err == null ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(result) : null;
            let response = new messages.SessionObjectReply();
            response.setError(error);
            response.setSession(session);
            callback(err, response);
        });
    }
    openSession(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let userName = call.request.getUserName();
        let address = call.request.getAddress();
        let client = call.request.getClient();
        let user = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromJson(call.request.getUser());
        let data = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromJson(call.request.getData());
        this._controller.openSession(correlationId, userId, userName, address, client, user, data, (err, result) => {
            let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
            let session = err == null ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(result) : null;
            let response = new messages.SessionObjectReply();
            response.setError(error);
            if (result)
                response.setSession(session);
            callback(err, response);
        });
    }
    storeSessionData(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();
        let data = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromJson(call.request.getData());
        this._controller.storeSessionData(correlationId, sessionId, data, (err, result) => {
            let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
            let session = err == null ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(result) : null;
            let response = new messages.SessionObjectReply();
            response.setError(error);
            if (result)
                response.setSession(session);
            callback(err, response);
        });
    }
    updateSessionUser(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();
        let user = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromJson(call.request.getUser());
        this._controller.updateSessionUser(correlationId, sessionId, user, (err, result) => {
            let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
            let session = err == null ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(result) : null;
            let response = new messages.SessionObjectReply();
            response.setError(error);
            if (result)
                response.setSession(session);
            callback(err, response);
        });
    }
    closeSession(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();
        this._controller.closeSession(correlationId, sessionId, (err, result) => {
            let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
            let session = err == null ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(result) : null;
            let response = new messages.SessionObjectReply();
            response.setError(error);
            if (result)
                response.setSession(session);
            callback(err, response);
        });
    }
    closeExpiredSessions(call, callback) {
        let correlationId = call.request.getCorrelationId();
        this._controller.closeExpiredSessions(correlationId, (err) => {
            let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
            let response = new messages.SessionEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    deleteSessionById(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();
        this._controller.deleteSessionById(correlationId, sessionId, (err, result) => {
            let error = SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromError(err);
            let session = err == null ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromSession(result) : null;
            let response = new messages.SessionObjectReply();
            response.setError(error);
            if (result)
                response.setSession(session);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('get_sessions', null, this.getSessions);
        this.registerMethod('get_session_by_id', null, this.getSessionById);
        this.registerMethod('open_session', null, this.openSession);
        this.registerMethod('store_session_data', null, this.storeSessionData);
        this.registerMethod('update_session_user', null, this.updateSessionUser);
        this.registerMethod('close_session', null, this.closeSession);
        this.registerMethod('close_expired_sessions', null, this.closeExpiredSessions);
        this.registerMethod('delete_session_by_id', null, this.deleteSessionById);
    }
}
exports.SessionsGrpcServiceV1 = SessionsGrpcServiceV1;
//# sourceMappingURL=SessionsGrpcServiceV1.js.map