"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
const pip_services_seneca_node_2 = require("pip-services-seneca-node");
const SessionsMemoryPersistence_1 = require("../persistence/SessionsMemoryPersistence");
const SessionsFilePersistence_1 = require("../persistence/SessionsFilePersistence");
const SessionsMongoDbPersistence_1 = require("../persistence/SessionsMongoDbPersistence");
const SessionsController_1 = require("../logic/SessionsController");
const SessionsSenecaServiceV1_1 = require("../services/version1/SessionsSenecaServiceV1");
class SessionsSenecaPlugin extends pip_services_seneca_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-sessions', seneca, SessionsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_components_node_1.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new SessionsController_1.SessionsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new SessionsMongoDbPersistence_1.SessionsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new SessionsFilePersistence_1.SessionsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new SessionsMemoryPersistence_1.SessionsMemoryPersistence();
        else
            throw new pip_services_commons_node_4.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_seneca_node_2.SenecaInstance(seneca);
        let service = new SessionsSenecaServiceV1_1.SessionsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-sessions', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-sessions', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-sessions', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.SessionsSenecaPlugin = SessionsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new SessionsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=SessionsSenecaPlugin.js.map