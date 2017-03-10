let _ = require('lodash');
let assert = require('chai').assert;

import { MicroserviceConfig } from 'pip-services-runtime-node';
import { SessionsLambdaFunction } from '../../src/run/SessionsLambdaFunction';

let buildConfig = MicroserviceConfig.fromValue({
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

suite.skip('SessionsLambdaFunction', ()=> {    
    let lambda = new SessionsLambdaFunction();

    suiteSetup((done) => {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    
    suiteTeardown((done) => {
        lambda.stop(done);
    });
                
    test('Ping', (done) => {
        lambda.getHandler()(
            {
                cmd: 'get_sessions',
                user_id: '2'
            },
            {
                done: (err, sessions) => {
                    assert.isNull(err);

                    assert.isArray(sessions);

                    done();
                }
            }
        );
    });
});