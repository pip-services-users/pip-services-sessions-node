let _ = require('lodash');
let assert = require('chai').assert;

import { SessionsSenecaPlugin } from '../../src/run/SessionsSenecaPlugin';

let buildConfig = {
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

suite('SessionsSenecaPlugin', ()=> {    
    let seneca;
    let plugin = new SessionsSenecaPlugin();

    suiteSetup((done) => {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    
    suiteTeardown((done) => {
        seneca.close(done);
    });
                
    test('Ping', (done) => {
        seneca.act(
            {
                role: 'sessions',
                cmd: 'get_sessions',
                user_id: '2' 
            },
            (err, sessions) => {
                assert.isNull(err);
                
                assert.isArray(sessions || []);
                                
                done();
            }
        );
    });
});