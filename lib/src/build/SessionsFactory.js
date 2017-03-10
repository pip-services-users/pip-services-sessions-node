"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var SessionsMongoDbPersistence_1 = require('../persistence/SessionsMongoDbPersistence');
var SessionsFilePersistence_1 = require('../persistence/SessionsFilePersistence');
var SessionsMemoryPersistence_1 = require('../persistence/SessionsMemoryPersistence');
var SessionsController_1 = require('../logic/SessionsController');
var SessionsRestService_1 = require('../services/version1/SessionsRestService');
var SessionsSenecaService_1 = require('../services/version1/SessionsSenecaService');
var SessionsFactory = (function (_super) {
    __extends(SessionsFactory, _super);
    function SessionsFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(SessionsFilePersistence_1.SessionsFilePersistence.Descriptor, SessionsFilePersistence_1.SessionsFilePersistence);
        this.register(SessionsMemoryPersistence_1.SessionsMemoryPersistence.Descriptor, SessionsMemoryPersistence_1.SessionsMemoryPersistence);
        this.register(SessionsMongoDbPersistence_1.SessionsMongoDbPersistence.Descriptor, SessionsMongoDbPersistence_1.SessionsMongoDbPersistence);
        this.register(SessionsController_1.SessionsController.Descriptor, SessionsController_1.SessionsController);
        this.register(SessionsRestService_1.SessionsRestService.Descriptor, SessionsRestService_1.SessionsRestService);
        this.register(SessionsSenecaService_1.SessionsSenecaService.Descriptor, SessionsSenecaService_1.SessionsSenecaService);
    }
    SessionsFactory.Instance = new SessionsFactory();
    return SessionsFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.SessionsFactory = SessionsFactory;
