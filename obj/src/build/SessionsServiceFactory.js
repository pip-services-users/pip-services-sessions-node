"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const SessionsMongoDbPersistence_1 = require("../persistence/SessionsMongoDbPersistence");
const SessionsFilePersistence_1 = require("../persistence/SessionsFilePersistence");
const SessionsMemoryPersistence_1 = require("../persistence/SessionsMemoryPersistence");
const SessionsController_1 = require("../logic/SessionsController");
const SessionsHttpServiceV1_1 = require("../services/version1/SessionsHttpServiceV1");
const SessionsSenecaServiceV1_1 = require("../services/version1/SessionsSenecaServiceV1");
class SessionsServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SessionsServiceFactory.MemoryPersistenceDescriptor, SessionsMemoryPersistence_1.SessionsMemoryPersistence);
        this.registerAsType(SessionsServiceFactory.FilePersistenceDescriptor, SessionsFilePersistence_1.SessionsFilePersistence);
        this.registerAsType(SessionsServiceFactory.MongoDbPersistenceDescriptor, SessionsMongoDbPersistence_1.SessionsMongoDbPersistence);
        this.registerAsType(SessionsServiceFactory.ControllerDescriptor, SessionsController_1.SessionsController);
        this.registerAsType(SessionsServiceFactory.SenecaServiceDescriptor, SessionsSenecaServiceV1_1.SessionsSenecaServiceV1);
        this.registerAsType(SessionsServiceFactory.HttpServiceDescriptor, SessionsHttpServiceV1_1.SessionsHttpServiceV1);
    }
}
SessionsServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "factory", "default", "default", "1.0");
SessionsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "persistence", "memory", "*", "1.0");
SessionsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "persistence", "file", "*", "1.0");
SessionsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "persistence", "mongodb", "*", "1.0");
SessionsServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "controller", "default", "*", "1.0");
SessionsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "service", "seneca", "*", "1.0");
SessionsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "service", "http", "*", "1.0");
exports.SessionsServiceFactory = SessionsServiceFactory;
//# sourceMappingURL=SessionsServiceFactory.js.map