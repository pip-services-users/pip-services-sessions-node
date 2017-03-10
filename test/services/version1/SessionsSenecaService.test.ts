let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { SessionsMemoryPersistence } from '../../../src/persistence/SessionsMemoryPersistence';
import { SessionsController } from '../../../src/logic/SessionsController';
import { SessionsSenecaService } from '../../../src/services/version1/SessionsSenecaService';

let USER = {
    id: '123',
    name: 'Test User'
};

suite('SessionsSenecaService', ()=> {        
    let db = new SessionsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new SessionsController();
    ctrl.configure(new ComponentConfig());

    let service = new SessionsSenecaService();
    service.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, service, seneca);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Open Session', (done) => {
        var session1;
        
        async.series([
        // Create a new session
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'sessions',
                        cmd: 'open_session',  
                        user: USER,
                        address: 'localhost',
                        client: 'test',
                        data: 'abc'
                    },
                    (err, session) => {
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
                seneca.getSeneca().act(
                    {
                        role: 'sessions',
                        cmd: 'store_session_data',  
                        user_id: USER.id,
                        session_id: session1.id,
                        data: 'xyz'
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Open created session
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'sessions',
                        cmd: 'load_session',  
                        user_id: USER.id,
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

                        assert.isDefined(session.user);
                        assert.equal(session.user.id, USER.id);
                        assert.equal(session.user.name, USER.name);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'sessions',
                        cmd: 'get_sessions',  
                        user_id: USER.id
                    },
                    (err, sessions) => {
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
                seneca.getSeneca().act(
                    {
                        role: 'sessions',
                        cmd: 'open_session',  
                        user: USER,
                        address: 'localhost',
                        client: 'test'
                    },
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.last_request);

                        callback();
                    }
                );
            },
        // Close session
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'sessions',
                        cmd: 'close_session',  
                        user_id: USER.id,
                        address: 'localhost',
                        client: 'test'
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'sessions',
                        cmd: 'get_sessions',  
                        user_id: USER.id
                    },
                    (err, sessions) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(sessions, 0);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});