"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var SessionsMemoryPersistence_1 = require('../../../src/persistence/SessionsMemoryPersistence');
var SessionsController_1 = require('../../../src/logic/SessionsController');
var SessionsSenecaService_1 = require('../../../src/services/version1/SessionsSenecaService');
var USER = {
    id: '123',
    name: 'Test User'
};
suite('SessionsSenecaService', function () {
    var db = new SessionsMemoryPersistence_1.SessionsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new SessionsController_1.SessionsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new SessionsSenecaService_1.SessionsSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Open Session', function (done) {
        var session1;
        async.series([
            // Create a new session
            function (callback) {
                seneca.getSeneca().act({
                    role: 'sessions',
                    cmd: 'open_session',
                    user: USER,
                    address: 'localhost',
                    client: 'test',
                    data: 'abc'
                }, function (err, session) {
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
                seneca.getSeneca().act({
                    role: 'sessions',
                    cmd: 'store_session_data',
                    user_id: USER.id,
                    session_id: session1.id,
                    data: 'xyz'
                }, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Open created session
            function (callback) {
                seneca.getSeneca().act({
                    role: 'sessions',
                    cmd: 'load_session',
                    user_id: USER.id,
                    session_id: session1.id
                }, function (err, session) {
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
                seneca.getSeneca().act({
                    role: 'sessions',
                    cmd: 'get_sessions',
                    user_id: USER.id
                }, function (err, sessions) {
                    assert.isNull(err);
                    assert.lengthOf(sessions, 1);
                    var session = sessions[0];
                    assert.equal(session.address, 'localhost');
                    assert.equal(session.client, 'test');
                    callback();
                });
            }
        ], done);
    });
    test('Close Session', function (done) {
        async.series([
            // Create a new session
            function (callback) {
                seneca.getSeneca().act({
                    role: 'sessions',
                    cmd: 'open_session',
                    user: USER,
                    address: 'localhost',
                    client: 'test'
                }, function (err, session) {
                    assert.isNull(err);
                    assert.isObject(session);
                    assert.isNotNull(session.last_request);
                    callback();
                });
            },
            // Close session
            function (callback) {
                seneca.getSeneca().act({
                    role: 'sessions',
                    cmd: 'close_session',
                    user_id: USER.id,
                    address: 'localhost',
                    client: 'test'
                }, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Get open sessions
            function (callback) {
                seneca.getSeneca().act({
                    role: 'sessions',
                    cmd: 'get_sessions',
                    user_id: USER.id
                }, function (err, sessions) {
                    assert.isNull(err);
                    assert.lengthOf(sessions, 0);
                    callback();
                });
            }
        ], done);
    });
});
