import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-seneca-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { SessionsMemoryPersistence } from '../persistence/SessionsMemoryPersistence';
import { SessionsFilePersistence } from '../persistence/SessionsFilePersistence';
import { SessionsMongoDbPersistence } from '../persistence/SessionsMongoDbPersistence';
import { SessionsController } from '../logic/SessionsController';
import { SessionsSenecaServiceV1 } from '../services/version1/SessionsSenecaServiceV1';

export class SessionsSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-sessions', seneca, SessionsSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new SessionsController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new SessionsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new SessionsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new SessionsMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        let service = new SessionsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-sessions', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-sessions', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new SessionsSenecaPlugin(seneca, options);
    return { name: plugin.name };
}