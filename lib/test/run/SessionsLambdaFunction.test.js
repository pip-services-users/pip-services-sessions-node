"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var SessionsLambdaFunction_1 = require('../../src/run/SessionsLambdaFunction');
var buildConfig = pip_services_runtime_node_1.MicroserviceConfig.fromValue({
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    }
});
suite.skip('SessionsLambdaFunction', function () {
    var lambda = new SessionsLambdaFunction_1.SessionsLambdaFunction();
    suiteSetup(function (done) {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    suiteTeardown(function (done) {
        lambda.stop(done);
    });
    test('Ping', function (done) {
        lambda.getHandler()({
            cmd: 'get_sessions',
            user_id: '2'
        }, {
            done: function (err, sessions) {
                assert.isNull(err);
                assert.isArray(sessions);
                done();
            }
        });
    });
});
