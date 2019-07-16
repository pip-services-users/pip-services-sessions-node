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
import { SessionsGrpcServiceV1 } from '../../../src/services/version1/SessionsGrpcServiceV1';
import { SessionsGrpcConverterV1 } from '../../../src/services/version1/SessionsGrpcConverterV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SessionsGrpcServiceV1', ()=> {
    let service: SessionsGrpcServiceV1;
    let persistence: SessionsMemoryPersistence;

    let client: any;

    suiteSetup((done) => {
        persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        service = new SessionsGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-sessions', 'service', 'grpc', 'default', '1.0'), service
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
            __dirname + "../../../../../src/protos/sessions_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).sessions_v1.Sessions;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());

        persistence.clear(null, done);
    });

    test('Open Session', (done) => {
        var session1: SessionV1;
        
        async.series([
        // Create a new session
            (callback) => {
                client.open_session(
                    {
                        user_id: '1',
                        user_name: 'User 1',
                        address: 'localhost',
                        client: 'test',
                        data: SessionsGrpcConverterV1.toJson('abc')
                    },
                    (err, response) => {
                        err = err || response.error;
                        let session = response ? response.session : null;

                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.id);
                        assert.isNotNull(session.last_request);
                        assert.equal(session.user_id, '1');
                        assert.equal(session.user_name, 'User 1');
                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');
                        assert.equal(SessionsGrpcConverterV1.fromJson(session.data), 'abc');

                        session1 = session;
                        
                        callback();
                    }
                );
            },
        // Store session data
            (callback) => {
                client.store_session_data(
                    {
                        session_id: session1.id,
                        data: SessionsGrpcConverterV1.toJson('xyz')
                    },
                    (err, response) => {
                        err = err || response.error;
                        let session = response ? response.session : null;

                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get opened session
            (callback) => {
                client.get_session_by_id(
                    {
                        session_id: session1.id
                    },
                    (err, response) => {
                        err = err || response.error;
                        let session = response ? response.session : null;

                        assert.isNull(err);

                        assert.isObject(session);
                        assert.equal(session.id, session1.id);
                        assert.isNotNull(session.last_request);
                        assert.equal(SessionsGrpcConverterV1.fromJson(session.data), 'xyz');

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                client.get_sessions(
                    {
                        filter: { user_id: '1' }                        
                    },
                    (err, response) => {
                        err = err || response.error;
                        let page = response ? response.page : null;

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
                client.open_session(
                    {
                        user_id: '1',
                        user_name: 'User 1',
                        address: 'localhost',
                        client: 'test'
                    },
                    (err, response) => {
                        err = err || response.error;
                        let session = response ? response.session : null;

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
                client.close_session(
                    {
                        session_id: session1.id
                    },
                    (err, response) => {
                        err = err || response.error;
                        let session = response ? response.session : null;

                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                client.get_sessions(
                    {
                        filter: {
                            user_id: '1',
                            active: true
                        }
                    },
                    (err, response) => {
                        err = err || response.error;
                        let page = response ? response.page : null;

                        assert.isNull(err);
                        
                        assert.lengthOf(page.data, 0);

                        callback();
                    }
                );
            }
        ], done);
    });

});
