let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

let services = require('../../../../src/protos/sessions_v1_grpc_pb');
let messages = require('../../../../src/protos/sessions_v1_pb');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { SessionV1 } from '../../../src/data/version1/SessionV1';
import { SessionsMemoryPersistence } from '../../../src/persistence/SessionsMemoryPersistence';
import { SessionsController } from '../../../src/logic/SessionsController';
import { SessionsCommandableGrpcServiceV1 } from '../../../src/services/version1/SessionsCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SessionsCommandableGrpcServiceV1', ()=> {
    let service: SessionsCommandableGrpcServiceV1;
    let persistence: SessionsMemoryPersistence;

    let client: any;

    suiteSetup((done) => {
        persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        service = new SessionsCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-sessions', 'service', 'commandable-grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup((done) => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-node/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());

        persistence.clear(null, done);
    });

    test('Open Session', (done) => {
        var session1: SessionV1;
        
        async.series([
        // Create a new session
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/sessions.open_session',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1',
                            user_name: 'User 1',
                            address: 'localhost',
                            client: 'test',
                            data: 'abc'
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let session = JSON.parse(response.result_json);

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
                client.invoke(
                    {
                        method: 'v1/sessions.store_session_data',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            session_id: session1.id,
                            data: 'xyz' 
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let session = JSON.parse(response.result_json);

                        callback();
                    }
                );
            },
        // Get opened session
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/sessions.get_session_by_id',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            session_id: session1.id
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let session = JSON.parse(response.result_json);

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
                client.invoke(
                    {
                        method: 'v1/sessions.get_sessions',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            filter: { user_id: '1' }                        
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);
                        
                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let page = JSON.parse(response.result_json);

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
                client.invoke(
                    {
                        method: 'v1/sessions.open_session',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            user_id: '1',
                            user_name: 'User 1',
                            address: 'localhost',
                            client: 'test'
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let session = JSON.parse(response.result_json);

                        assert.isObject(session);
                        assert.isNotNull(session.last_request);

                        session1 = session;

                        callback();
                    }
                );
            },
        // Close session
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/sessions.close_session',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            session_id: session1.id
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let session = JSON.parse(response.result_json);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                client.invoke(
                    {
                        method: 'v1/sessions.get_sessions',
                        args_empty: false,
                        args_json: JSON.stringify({ 
                            filter: {
                                user_id: '1',
                                active: true
                            }
                        })
                    },
                    (err, response) => {
                        assert.isNull(err);

                        assert.isFalse(response.result_empty);
                        assert.isString(response.result_json);
                        let page = JSON.parse(response.result_json);
                        
                        assert.lengthOf(page.data, 0);

                        callback();
                    }
                );
            }
        ], done);
    });
    
});
