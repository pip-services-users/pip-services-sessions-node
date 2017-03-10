"use strict";
var async = require('async');
var assert = require('chai').assert;
var USER = {
    id: '123',
    name: 'Test User'
};
var SessionsPersistenceFixture = (function () {
    function SessionsPersistenceFixture(db) {
        assert.isNotNull(db);
        this._db = db;
    }
    SessionsPersistenceFixture.prototype.testOpenSession = function (done) {
        var _this = this;
        var session1;
        async.series([
            // Create a new session
            function (callback) {
                _this._db.openSession(null, USER, 'localhost', 'test', 'abc', function (err, session) {
                    assert.isNull(err);
                    assert.isObject(session);
                    assert.isNotNull(session.id);
                    assert.isNotNull(session.last_request);
                    assert.equal(session.address, 'localhost');
                    assert.equal(session.client, 'test');
                    assert.equal(session.data, 'abc');
                    session1 = session;
                    callback();
                });
            },
            // Store session data
            function (callback) {
                _this._db.storeSessionData(null, USER.id, session1.id, 'xyz', function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Open created session
            function (callback) {
                _this._db.loadSession(null, USER.id, session1.id, function (err, session) {
                    assert.isNull(err);
                    assert.isObject(session);
                    assert.equal(session.id, session1.id);
                    assert.isNotNull(session.last_request);
                    assert.equal(session.address, 'localhost');
                    assert.equal(session.client, 'test');
                    assert.equal(session.data, 'xyz');
                    assert.isDefined(session.user);
                    assert.equal(session.user.id, USER.id);
                    assert.equal(session.user.name, USER.name);
                    callback();
                });
            },
            // Get open sessions
            function (callback) {
                _this._db.getSessions(null, USER.id, function (err, sessions) {
                    assert.isNull(err);
                    assert.lengthOf(sessions, 1);
                    var session = sessions[0];
                    assert.equal(session.address, 'localhost');
                    assert.equal(session.client, 'test');
                    callback();
                });
            }
        ], done);
    };
    SessionsPersistenceFixture.prototype.testCloseSession = function (done) {
        var _this = this;
        async.series([
            // Create a new session
            function (callback) {
                _this._db.openSession(null, USER, 'localhost', 'test', null, function (err, session) {
                    assert.isNull(err);
                    assert.isObject(session);
                    assert.isNotNull(session.last_request);
                    callback();
                });
            },
            // Close session
            function (callback) {
                _this._db.closeSession(null, USER.id, 'localhost', 'test', function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Get open sessions
            function (callback) {
                _this._db.getSessions(null, USER.id, function (err, sessions) {
                    assert.isNull(err);
                    assert.lengthOf(sessions, 0);
                    callback();
                });
            }
        ], done);
    };
    return SessionsPersistenceFixture;
}());
exports.SessionsPersistenceFixture = SessionsPersistenceFixture;
