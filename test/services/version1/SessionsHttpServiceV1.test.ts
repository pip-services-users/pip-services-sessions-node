let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { SessionV1 } from '../../../src/data/version1/SessionV1';
import { SessionsMemoryPersistence } from '../../../src/persistence/SessionsMemoryPersistence';
import { SessionsController } from '../../../src/logic/SessionsController';
import { SessionsHttpServiceV1 } from '../../../src/services/version1/SessionsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SessionsHttpServiceV1', ()=> {
    let persistence: SessionsMemoryPersistence;
    let service: SessionsHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        service = new SessionsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-sessions', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup((done) => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });

        persistence.clear(null, done);
    });
    
    test('Open Session', (done) => {
        var session1: SessionV1;
        
        async.series([
        // Create a new session
            (callback) => {
                rest.post('/v1/sessions/open_session',
                    {
                        user_id: '1',
                        user_name: 'User 1',
                        address: 'localhost',
                        client: 'test',
                        data: 'abc'
                    },
                    (err, req, res, session) => {
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
                rest.post('/v1/sessions/store_session_data',
                    { 
                        session_id: session1.id,
                        data: 'xyz' 
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get opened session
            (callback) => {
                rest.post('/v1/sessions/get_session_by_id',
                    {
                        session_id: session1.id
                    },
                    (err, req, res, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.equal(session.id, session1.id);
                        assert.isNotNull(session.last_request);
                        assert.equal(session.data, 'xyz');

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                rest.post('/v1/sessions/get_sessions',
                    {
                        filter: { user_id: '1' }                        
                    },
                    (err, req, res, page) => {
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
                rest.post('/v1/sessions/open_session',
                    {
                        user_id: '1',
                        user_name: 'User 1',
                        address: 'localhost',
                        client: 'test'
                    },
                    (err, req, res, session) => {
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
                rest.post('/v1/sessions/close_session',
                    {
                        session_id: session1.id
                    },
                    (err, req, res, session) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                rest.post('/v1/sessions/get_sessions',
                    {
                        filter: {
                            user_id: '1',
                            active: true
                        }
                    },
                    (err, req, res, page) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(page.data, 0);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});