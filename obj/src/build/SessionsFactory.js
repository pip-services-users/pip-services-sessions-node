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
class SessionsFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(SessionsFactory.MemoryPersistenceDescriptor, SessionsMemoryPersistence_1.SessionsMemoryPersistence);
        this.registerAsType(SessionsFactory.FilePersistenceDescriptor, SessionsFilePersistence_1.SessionsFilePersistence);
        this.registerAsType(SessionsFactory.MongoDbPersistenceDescriptor, SessionsMongoDbPersistence_1.SessionsMongoDbPersistence);
        this.registerAsType(SessionsFactory.ControllerDescriptor, SessionsController_1.SessionsController);
        this.registerAsType(SessionsFactory.SenecaServiceDescriptor, SessionsSenecaServiceV1_1.SessionsSenecaServiceV1);
        this.registerAsType(SessionsFactory.HttpServiceDescriptor, SessionsHttpServiceV1_1.SessionsHttpServiceV1);
    }
}
SessionsFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "factory", "default", "default", "1.0");
SessionsFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "persistence", "memory", "*", "1.0");
SessionsFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "persistence", "file", "*", "1.0");
SessionsFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "persistence", "mongodb", "*", "1.0");
SessionsFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "controller", "default", "*", "1.0");
SessionsFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "service", "seneca", "*", "1.0");
SessionsFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-sessions", "service", "http", "*", "1.0");
exports.SessionsFactory = SessionsFactory;
//# sourceMappingURL=SessionsFactory.js.map