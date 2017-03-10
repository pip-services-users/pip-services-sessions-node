"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var SessionsFilePersistence_1 = require('../../src/persistence/SessionsFilePersistence');
var SessionsPersistenceFixture_1 = require('./SessionsPersistenceFixture');
var config = pip_services_runtime_node_2.ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/sessions.test.json',
        data: []
    }
});
suite('SessionsFilePersistence', function () {
    var db, fixture;
    setup(function (done) {
        db = new SessionsFilePersistence_1.SessionsFilePersistence();
        db.configure(config);
        fixture = new SessionsPersistenceFixture_1.SessionsPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    teardown(function (done) {
        db.close(done);
    });
    test('Open Session', function (done) {
        fixture.testOpenSession(done);
    });
    test('Close Session', function (done) {
        fixture.testCloseSession(done);
    });
});
