"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var SessionsSenecaPlugin_1 = require('../../src/run/SessionsSenecaPlugin');
var buildConfig = {
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
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};
suite('SessionsSenecaPlugin', function () {
    var seneca;
    var plugin = new SessionsSenecaPlugin_1.SessionsSenecaPlugin();
    suiteSetup(function (done) {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    suiteTeardown(function (done) {
        seneca.close(done);
    });
    test('Ping', function (done) {
        seneca.act({
            role: 'sessions',
            cmd: 'get_sessions',
            user_id: '2'
        }, function (err, sessions) {
            assert.isNull(err);
            assert.isArray(sessions || []);
            done();
        });
    });
});
