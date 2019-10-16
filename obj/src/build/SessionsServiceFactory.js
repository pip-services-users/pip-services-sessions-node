"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const SessionsCouchbasePersistence_1 = require("../persistence/SessionsCouchbasePersistence");
const SessionsMongoDbPersistence_1 = require("../persistence/SessionsMongoDbPersistence");
const SessionsFilePersistence_1 = require("../persistence/SessionsFilePersistence");
const SessionsMemoryPersistence_1 = require("../persistence/SessionsMemoryPersistence");
const SessionsController_1 = require("../logic/SessionsController");
const SessionsHttpServiceV1_1 = require("../services/version1/SessionsHttpServiceV1");
const SessionsCommandableGrpcServiceV1_1 = require("../services/version1/SessionsCommandableGrpcServiceV1");
const SessionsGrpcServiceV1_1 = require("../services/version1/SessionsGrpcServiceV1");
class SessionsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SessionsServiceFactory.MemoryPersistenceDescriptor, SessionsMemoryPersistence_1.SessionsMemoryPersistence);
        this.registerAsType(SessionsServiceFactory.FilePersistenceDescriptor, SessionsFilePersistence_1.SessionsFilePersistence);
        this.registerAsType(SessionsServiceFactory.MongoDbPersistenceDescriptor, SessionsMongoDbPersistence_1.SessionsMongoDbPersistence);
        this.registerAsType(SessionsServiceFactory.CouchbasePersistenceDescriptor, SessionsCouchbasePersistence_1.SessionsCouchbasePersistence);
        this.registerAsType(SessionsServiceFactory.ControllerDescriptor, SessionsController_1.SessionsController);
        this.registerAsType(SessionsServiceFactory.HttpServiceDescriptor, SessionsHttpServiceV1_1.SessionsHttpServiceV1);
        this.registerAsType(SessionsServiceFactory.CommandableGrpcServiceDescriptor, SessionsCommandableGrpcServiceV1_1.SessionsCommandableGrpcServiceV1);
        this.registerAsType(SessionsServiceFactory.GrpcServiceDescriptor, SessionsGrpcServiceV1_1.SessionsGrpcServiceV1);
    }
}
exports.SessionsServiceFactory = SessionsServiceFactory;
SessionsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sessions", "factory", "default", "default", "1.0");
SessionsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sessions", "persistence", "memory", "*", "1.0");
SessionsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sessions", "persistence", "file", "*", "1.0");
SessionsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sessions", "persistence", "mongodb", "*", "1.0");
SessionsServiceFactory.CouchbasePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sessions", "persistence", "couchbase", "*", "1.0");
SessionsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sessions", "controller", "default", "*", "1.0");
SessionsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sessions", "service", "http", "*", "1.0");
SessionsServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sessions", "service", "commandable-grpc", "*", "1.0");
SessionsServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services-sessions", "service", "grpc", "*", "1.0");
//# sourceMappingURL=SessionsServiceFactory.js.map