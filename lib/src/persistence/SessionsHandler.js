"use strict";
var _ = require('lodash');
var SessionsHandler = (function () {
    function SessionsHandler(config) {
        config = _.defaultsDeep(config, {
            sessionTimeout: 24 * 3600000,
        });
        this._sessionTimeout = config.sessionTimeout;
    }
    SessionsHandler.prototype.findSession = function (userSessions, sessionId) {
        if (userSessions.sessions == null || userSessions.sessions.length == 0)
            return null;
        // Find a specified session by its id
        for (var i = 0; i < userSessions.sessions.length; i++) {
            var thisSession = userSessions.sessions[i];
            var thisSessionId = thisSession._id || thisSession.id;
            if (sessionId == thisSessionId)
                return thisSession;
        }
        return null;
    };
    ;
    SessionsHandler.prototype.cleanupSessions = function (userSessions) {
        // Skip if there are not sessions
        if (userSessions.sessions == null || userSessions.sessions.length == 0)
            return;
        var currentTime = new Date().getTime();
        for (var i = 0; i < userSessions.sessions.length; i++) {
            var thisSession = userSessions.sessions[i];
            var lastRequest = thisSession.last_request;
            var thisSessionTimeout = currentTime - lastRequest.getTime();
            if (thisSession == null || thisSessionTimeout > this._sessionTimeout) {
                userSessions.sessions.splice(i, 1);
                i--;
            }
        }
        if (userSessions.sessions.length == 0)
            userSessions.last_request = null;
    };
    SessionsHandler.prototype.addSession = function (userSessions, address, client) {
        this.cleanupSessions(userSessions);
        // Skip if request is empty
        if (address == null || client == null)
            return;
        userSessions.sessions = userSessions.sessions || [];
        var session;
        for (var i = 0; i < userSessions.sessions.length; i++) {
            session = userSessions.sessions[i];
            if (session != null
                && session.address == address
                && session.client == client) {
                session.last_request = new Date();
                return session;
            }
        }
        var currentTime = new Date();
        // Update last session and request timing
        userSessions.last_session = currentTime;
        userSessions.last_request = currentTime;
        // Create and add a new session
        session = {
            opened: currentTime,
            last_request: currentTime,
            address: address,
            client: client
        };
        userSessions.sessions.push(session);
        session = userSessions.sessions[userSessions.sessions.length - 1];
        return session;
    };
    SessionsHandler.prototype.removeSession = function (userSessions, address, client) {
        this.cleanupSessions(userSessions);
        // Skip if request is empty
        if (address == null || client == null)
            return;
        userSessions.sessions = userSessions.sessions || [];
        var removedSession = null;
        for (var i = 0; i < userSessions.sessions.length; i++) {
            var thisSession = userSessions.sessions[i];
            if (thisSession != null
                && thisSession.address == address
                && thisSession.client == client) {
                userSessions.sessions.splice(i, 1);
                removedSession = thisSession;
            }
        }
        // Clear last request to define that there are no active sessions
        if (userSessions.sessions.length == 0)
            userSessions.last_request = null;
        return removedSession;
    };
    return SessionsHandler;
}());
exports.SessionsHandler = SessionsHandler;
