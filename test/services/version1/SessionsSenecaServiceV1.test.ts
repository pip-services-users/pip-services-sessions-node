let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { SessionV1 } from '../../../src/data/version1/SessionV1';
import { SessionsMemoryPersistence } from '../../../src/persistence/SessionsMemoryPersistence';
import { SessionsController } from '../../../src/logic/SessionsController';
import { SessionsSenecaServiceV1 } from '../../../src/services/version1/SessionsSenecaServiceV1';

suite('SessionsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: SessionsSenecaServiceV1;
    let persistence: SessionsMemoryPersistence;
    let controller: SessionsController;

    suiteSetup((done) => {
        persistence = new SessionsMemoryPersistence();
        controller = new SessionsController();

        service = new SessionsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-sessions', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    
    test('Open Session', (done) => {
        var session1: SessionV1;
        
        async.series([
        // Create a new session
            (callback) => {
                seneca.act(
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
                seneca.act(
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
        // Open created session
            (callback) => {
                seneca.act(
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
                seneca.act(
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

    test('Close Session', (done) => {
        let session1: SessionV1;

        async.series([
        // Create a new session
            (callback) => {
                seneca.act(
                    {
                        role: 'sessions',
                        cmd: 'open_session',  
                        user_id: '1',
                        user_name: 'User 1',
                        address: 'localhost',
                        client: 'test'
                    },
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.last_request);

                        session1 = session;

                        callback();
                    }
                );
            },
        // Close session
            (callback) => {
                seneca.act(
                    {
                        role: 'sessions',
                        cmd: 'close_session',  
                        session_id: session1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                seneca.act(
                    {
                        role: 'sessions',
                        cmd: 'get_sessions',  
                        filter: {
                            user_id: '1',
                            active: true
                        }
                    },
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(page.data, 0);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});