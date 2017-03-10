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
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var SessionsHandler_1 = require('./SessionsHandler');
var SessionsMongoDbPersistence = (function (_super) {
    __extends(SessionsMongoDbPersistence, _super);
    function SessionsMongoDbPersistence() {
        _super.call(this, SessionsMongoDbPersistence.Descriptor, require('./SessionsModel'));
    }
    SessionsMongoDbPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config);
        this._handler = new SessionsHandler_1.SessionsHandler(config.getOptions());
    };
    SessionsMongoDbPersistence.prototype.getSessions = function (correlationId, userId, callback) {
        var _this = this;
        this.getById(userId, function (err, item) {
            if (err || item == null) {
                callback(err, null);
                return;
            }
            var sessions = _.map(item.sessions, _this.jsonToPublic);
            callback(null, sessions);
        });
    };
    SessionsMongoDbPersistence.prototype.loadSession = function (correlationId, userId, sessionId, callback) {
        var _this = this;
        this._model.findById(userId, function (err, item) {
            if (err || item == null) {
                callback(err);
                return;
            }
            var session = _this._handler.findSession(item, sessionId);
            if (session == null) {
                callback(null, null);
                return;
            }
            // Update session time and save async
            session.last_request = new Date();
            item.last_request = session.last_request;
            item.save(function (err) {
                if (err)
                    _this.error('Failed to save user session', err);
            });
            // Return loaded session together with saved user object
            session = _this.jsonToPublic(session);
            session.user = item.user;
            callback(null, session);
        });
    };
    SessionsMongoDbPersistence.prototype.openSession = function (correlationId, user, address, client, data, callback) {
        var _this = this;
        var currentTime = new Date();
        if (user == null) {
            callback(new pip_services_runtime_node_4.BadRequestError(this, 'NoUser', 'User is not defined'));
            return;
        }
        if (user.id == null) {
            callback(new pip_services_runtime_node_4.BadRequestError(this, 'NoUserId', 'User id is not defined'));
            return;
        }
        if (address == null) {
            callback(new pip_services_runtime_node_4.BadRequestError(this, 'NoAddress', 'User client address is not defined'));
            return;
        }
        if (client == null) {
            callback(new pip_services_runtime_node_4.BadRequestError(this, 'NoClient', 'User client app is not defined'));
            return;
        }
        this._model.findById(user.id, function (err, item) {
            if (err) {
                callback(err);
                return;
            }
            // Create a new sessions object
            if (item == null) {
                item = new _this._model({
                    _id: user.id,
                    user_id: user.id,
                    first_session: currentTime
                });
            }
            // Update user name and user object to the last one
            item.user_name = user.name;
            item.user = user;
            // Add a new session
            var session = _this._handler.addSession(item, address, client);
            if (data)
                session.data = data;
            if (session._id == null)
                session._id = _this.createUuid();
            // Save session object
            item.save(function (err) {
                if (err)
                    callback(err);
                else {
                    // Return the opened session
                    session = _this.jsonToPublic(session);
                    callback(err, session);
                }
            });
        });
    };
    SessionsMongoDbPersistence.prototype.storeSessionData = function (correlationId, userId, sessionId, data, callback) {
        var _this = this;
        this._model.findById(userId, function (err, item) {
            if (err || item == null) {
                callback(err);
                return;
            }
            var session = _this._handler.findSession(item, sessionId);
            if (session == null) {
                callback(new pip_services_runtime_node_5.NotFoundError(_this, 'SessionNotFound', 'Session was not found').withDetails(sessionId));
                return;
            }
            session.data = data;
            item.save(callback);
        });
    };
    SessionsMongoDbPersistence.prototype.closeSession = function (correlationId, userId, address, client, callback) {
        var _this = this;
        this._model.findById(userId, function (err, item) {
            if (err || item == null) {
                if (callback)
                    callback(err);
                return;
            }
            // Close session and save user
            var session = _this._handler.removeSession(item, address, client);
            item.save(callback);
        });
    };
    SessionsMongoDbPersistence.prototype.deleteSession = function (correlationId, userId, sessionId, callback) {
        var _this = this;
        this._model.findById(userId, function (err, item) {
            if (err || item == null || item.sessions == null) {
                callback(err);
                return;
            }
            var session = _this._handler.findSession(item, sessionId);
            if (session == null) {
                callback(null, null);
                return;
            }
            session.remove();
            item.save(callback);
        });
    };
    /**
     * Unique descriptor for the SessionsMongoDbPersistence component
     */
    SessionsMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-sessions", "mongodb", "*");
    return SessionsMongoDbPersistence;
}(pip_services_runtime_node_3.MongoDbPersistence));
exports.SessionsMongoDbPersistence = SessionsMongoDbPersistence;
