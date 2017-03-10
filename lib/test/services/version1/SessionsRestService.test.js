"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SessionsMemoryPersistence_1 = require('../../../src/persistence/SessionsMemoryPersistence');
var SessionsController_1 = require('../../../src/logic/SessionsController');
var SessionsRestService_1 = require('../../../src/services/version1/SessionsRestService');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.host', 'localhost', 'endpoint.port', 3000);
var USER = {
    id: '123',
    name: 'Test User'
};
suite('SessionsRestService', function () {
    var db = new SessionsMemoryPersistence_1.SessionsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new SessionsController_1.SessionsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new SessionsRestService_1.SessionsRestService();
    service.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service);
    var url = restConfig.getEndpoint().getUri();
    var rest = restify.createJsonClient({ url: url, version: '*' });
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Open Session', function (done) {
        var session1;
        async.series([
            // Create a new session
            function (callback) {
                rest.post('/sessions', {
                    user: USER,
                    address: 'localhost',
                    client: 'test',
                    data: 'abc'
                }, function (err, req, res, session) {
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
                rest.post('/sessions/' + USER.id + '?session_id=' + session1.id, {
                    data: 'xyz'
                }, function (err, req, res) {
                    assert.isNotNull(err);
                    assert.equal(err.statusCode, 404);
                    callback();
                });
            },
            // Get opened session
            function (callback) {
                rest.get('/sessions/' + USER.id + '?session_id=' + session1.id, function (err, req, res, session) {
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
                rest.get('/sessions/' + USER.id, function (err, req, res, sessions) {
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
                rest.post('/sessions', {
                    user: USER,
                    address: 'localhost',
                    client: 'test'
                }, function (err, req, res, session) {
                    assert.isNull(err);
                    assert.isObject(session);
                    assert.isNotNull(session.last_request);
                    callback();
                });
            },
            // Close session
            function (callback) {
                rest.del('/sessions/' + USER.id + '?address=localhost&client=test', function (err, req, res, session) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Get open sessions
            function (callback) {
                rest.get('/sessions/' + USER.id, function (err, req, res, sessions) {
                    assert.isNull(err);
                    assert.lengthOf(sessions, 0);
                    callback();
                });
            }
        ], done);
    });
});
