"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SessionsMongoDbPersistence_1 = require('../../src/persistence/SessionsMongoDbPersistence');
var SessionsPersistenceFixture_1 = require('./SessionsPersistenceFixture');
var options = new pip_services_runtime_node_3.DynamicMap(require('../../../config/config'));
var dbOptions = pip_services_runtime_node_2.ComponentConfig.fromValue(options.getNullableMap('persistence'));
suite('SessionsMongoDbPersistence', function () {
    // Skip test if mongodb is not configured
    if (dbOptions.getRawContent().getString('descriptor.type') != 'mongodb')
        return;
    var db = new SessionsMongoDbPersistence_1.SessionsMongoDbPersistence();
    db.configure(dbOptions);
    var fixture = new SessionsPersistenceFixture_1.SessionsPersistenceFixture(db);
    suiteSetup(function (done) {
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    suiteTeardown(function (done) {
        db.close(done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Open Session', function (done) {
        fixture.testOpenSession(done);
    });
    test('Close Session', function (done) {
        fixture.testCloseSession(done);
    });
});
