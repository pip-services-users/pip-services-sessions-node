let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { SessionV1 } from '../../src/data/version1/SessionV1';
import { SessionsMemoryPersistence } from '../../src/persistence/SessionsMemoryPersistence';
import { SessionsController } from '../../src/logic/SessionsController';
import { SessionsLambdaFunction } from '../../src/container/SessionsLambdaFunction';


suite('SessionsLambdaFunction', ()=> {
    let lambda: SessionsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-sessions:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-sessions:controller:default:default:1.0'
        );

        lambda = new SessionsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('Open Session', (done) => {
        var session1: SessionV1;
        
        async.series([
        // Create a new session
            (callback) => {
                lambda.act(
                    {
                        role: 'sessions',
                        cmd: 'open_session',  
                        user_id: '1',
                        user_name: 'User 1',
                        address: 'localhost',
                        client: 'test',
                        data: 'abc'
                    },
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.id);
                        assert.isNotNull(session.last_request);
                        assert.equal(session.user_id, '1');
                        assert.equal(session.user_name, 'User 1');
                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');
                        assert.equal(session.data, 'abc');

                        session1 = session;
                        
                        callback();
                    }
                );
            },
        // Store session data
            (callback) => {
                lambda.act(
                    {
                        role: 'sessions',
                        cmd: 'store_session_data',  
                        session_id: session1.id,
                        data: 'xyz'
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Update session user
            (callback) => {
                lambda.act(
                    {
                        role: 'sessions',
                        cmd: 'update_session_user',  
                        session_id: session1.id,
                        user: 'xyz'
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Open created session
            (callback) => {
                lambda.act(
                    {
                        role: 'sessions',
                        cmd: 'get_session_by_id',  
                        session_id: session1.id
                    },
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.equal(session.id, session1.id);
                        assert.isNotNull(session.last_request);
                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');
                        assert.equal(session.data, 'xyz');

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                lambda.act(
                    {
                        role: 'sessions',
                        cmd: 'get_sessions',  
                        filter: {
                            user_id: '1'
                        }
                    },
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(page.data, 1);
                        let session = page.data[0];

                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');

                        callback();
                    }
                );
            }
        ], done);
    });

});