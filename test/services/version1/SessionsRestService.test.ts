let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { SessionsMemoryPersistence } from '../../../src/persistence/SessionsMemoryPersistence';
import { SessionsController } from '../../../src/logic/SessionsController';
import { SessionsRestService } from '../../../src/services/version1/SessionsRestService';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.host', 'localhost',  
    'endpoint.port', 3000
);

let USER = {
    id: '123',
    name: 'Test User'
};

suite('SessionsRestService', ()=> {    
    let db = new SessionsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new SessionsController();
    ctrl.configure(new ComponentConfig());

    let service = new SessionsRestService();
    service.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, service);

    let url = restConfig.getEndpoint().getUri();
    let rest = restify.createJsonClient({ url: url, version: '*' });

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Open Session', (done) => {
        var session1;
        
        async.series([
        // Create a new session
            (callback) => {
                rest.post('/sessions',
                    {
                        user: USER,
                        address: 'localhost',
                        client: 'test',
                        data: 'abc'
                    },
                    (err, req, res, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.id);
                        assert.isNotNull(session.last_request);
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
                rest.post('/sessions/' + USER.id + '?session_id=' + session1.id,
                    { 
                        data: 'xyz' 
                    },
                    (err, req, res) => {
                        assert.isNotNull(err);
                        assert.equal(err.statusCode, 404);

                        callback();
                    }
                );
            },
        // Get opened session
            (callback) => {
                rest.get('/sessions/' + USER.id + '?session_id=' + session1.id,
                    (err, req, res, session) => {
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
                    }
                );
            },
        // Get open sessions
            (callback) => {
                rest.get('/sessions/' + USER.id,
                    (err, req, res, sessions) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(sessions, 1);
                        let session = sessions[0];

                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Close Session', (done) => {
        async.series([
        // Create a new session
            (callback) => {
                rest.post('/sessions',
                    {
                        user: USER,
                        address: 'localhost',
                        client: 'test'
                    },
                    (err, req, res, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.last_request);

                        callback();
                    }
                );
            },
        // Close session
            (callback) => {
                rest.del('/sessions/' + USER.id + '?address=localhost&client=test',
                    (err, req, res, session) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                rest.get('/sessions/' + USER.id,
                    (err, req, res, sessions) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(sessions, 0);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});