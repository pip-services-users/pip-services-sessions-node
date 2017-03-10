"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SessionsRestService = (function (_super) {
    __extends(SessionsRestService, _super);
    function SessionsRestService() {
        _super.call(this, SessionsRestService.Descriptor);
    }
    SessionsRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-sessions", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    SessionsRestService.prototype.getSessions = function (req, res) {
        if (req.params.session_id)
            this._logic.loadSession(req.params.correlation_id, req.params.userId, req.params.session_id, this.sendResult(req, res));
        else
            this._logic.getSessions(req.params.correlation_id, req.params.userId, this.sendResult(req, res));
    };
    SessionsRestService.prototype.openSession = function (req, res) {
        this._logic.openSession(req.params.correlation_id, req.body.user, req.body.address, req.body.client, req.body.data, this.sendCreatedResult(req, res));
    };
    SessionsRestService.prototype.storeSessionData = function (req, res) {
        this._logic.storeSessionData(req.params.correlation_id, req.params.userId, req.params.session_id, req.body.data, this.sendResult(req, res));
    };
    SessionsRestService.prototype.deleteSession = function (req, res) {
        if (req.params.session_id)
            this._logic.deleteSession(req.params.correlation_id, req.params.userId, req.params.session_id, this.sendResult(req, res));
        else
            this._logic.closeSession(req.params.correlation_id, req.params.userId, req.params.address, req.params.client, this.sendDeletedResult(req, res));
    };
    SessionsRestService.prototype.register = function () {
        this.registerRoute('get', '/sessions/:userId', this.getSessions);
        this.registerRoute('post', '/sessions', this.openSession);
        this.registerRoute('post', '/sessions/:userId', this.storeSessionData);
        this.registerRoute('delete', '/sessions/:userId', this.deleteSession);
    };
    /**
     * Unique descriptor for the SessionsRestService component
     */
    SessionsRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-sessions", "rest", "1.0");
    return SessionsRestService;
}(pip_services_runtime_node_3.RestService));
exports.SessionsRestService = SessionsRestService;
