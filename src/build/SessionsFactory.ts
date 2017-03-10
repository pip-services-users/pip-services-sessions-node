import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

import { SessionsMongoDbPersistence } from '../persistence/SessionsMongoDbPersistence';
import { SessionsFilePersistence } from '../persistence/SessionsFilePersistence';
import { SessionsMemoryPersistence } from '../persistence/SessionsMemoryPersistence';
import { SessionsController } from '../logic/SessionsController';
import { SessionsRestService } from '../services/version1/SessionsRestService';
import { SessionsSenecaService } from '../services/version1/SessionsSenecaService'; 

export class SessionsFactory extends ComponentFactory {
	public static Instance: SessionsFactory = new SessionsFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(SessionsFilePersistence.Descriptor, SessionsFilePersistence);
		this.register(SessionsMemoryPersistence.Descriptor, SessionsMemoryPersistence);
		this.register(SessionsMongoDbPersistence.Descriptor, SessionsMongoDbPersistence);
		this.register(SessionsController.Descriptor, SessionsController);
		this.register(SessionsRestService.Descriptor, SessionsRestService);
		this.register(SessionsSenecaService.Descriptor, SessionsSenecaService);
	}
	
}
