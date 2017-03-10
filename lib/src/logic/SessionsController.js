"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SessionsCommandSet_1 = require('./SessionsCommandSet');
var SessionsController = (function (_super) {
    __extends(SessionsController, _super);
    function SessionsController() {
        _super.call(this, SessionsController.Descriptor);
    }
    SessionsController.prototype.link = function (components) {
        // Locate reference to quotes persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-sessions", '*', '*'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new SessionsCommandSet_1.SessionsCommandSet(this);
        this.addCommandSet(commands);
    };
    SessionsController.prototype.getSessions = function (correlationId, userId, callback) {
        callback = this.instrument(correlationId, 'sessions.get_sessions', callback);
        this._db.getSessions(correlationId, userId, callback);
    };
    SessionsController.prototype.loadSession = function (correlationId, userId, sessionId, callback) {
        callback = this.instrument(correlationId, 'sessions.load_session', callback);
        this._db.loadSession(correlationId, userId, sessionId, callback);
    };
    SessionsController.prototype.openSession = function (correlationId, user, address, client, data, callback) {
        callback = this.instrument(correlationId, 'sessions.open_session', callback);
        this._db.openSession(correlationId, user, address, client, data, callback);
    };
    SessionsController.prototype.storeSessionData = function (correlationId, userId, sessionId, data, callback) {
        callback = this.instrument(correlationId, 'sessions.store_session_data', callback);
        this._db.storeSessionData(correlationId, userId, sessionId, data, callback);
    };
    SessionsController.prototype.closeSession = function (correlationId, userId, address, client, callback) {
        callback = this.instrument(correlationId, 'sessions.close_session', callback);
        this._db.closeSession(correlationId, userId, address, client, callback);
    };
    SessionsController.prototype.deleteSession = function (correlationId, userId, sessionId, callback) {
        callback = this.instrument(correlationId, 'sessions.delete_session', callback);
        this._db.deleteSession(correlationId, userId, sessionId, callback);
    };
    /**
     * Unique descriptor for the SessionsController component
     */
    SessionsController.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Controllers, "pip-services-sessions", "*", "*");
    return SessionsController;
}(pip_services_runtime_node_3.AbstractController));
exports.SessionsController = SessionsController;
