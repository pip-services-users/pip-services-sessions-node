import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { SessionsMongoDbPersistence } from '../persistence/SessionsMongoDbPersistence';
import { SessionsFilePersistence } from '../persistence/SessionsFilePersistence';
import { SessionsMemoryPersistence } from '../persistence/SessionsMemoryPersistence';
import { SessionsController } from '../logic/SessionsController';
import { SessionsHttpServiceV1 } from '../services/version1/SessionsHttpServiceV1';
import { SessionsSenecaServiceV1 } from '../services/version1/SessionsSenecaServiceV1'; 

export class SessionsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-sessions", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-sessions", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-sessions", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-sessions", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-sessions", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-sessions", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-sessions", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(SessionsServiceFactory.MemoryPersistenceDescriptor, SessionsMemoryPersistence);
		this.registerAsType(SessionsServiceFactory.FilePersistenceDescriptor, SessionsFilePersistence);
		this.registerAsType(SessionsServiceFactory.MongoDbPersistenceDescriptor, SessionsMongoDbPersistence);
		this.registerAsType(SessionsServiceFactory.ControllerDescriptor, SessionsController);
		this.registerAsType(SessionsServiceFactory.SenecaServiceDescriptor, SessionsSenecaServiceV1);
		this.registerAsType(SessionsServiceFactory.HttpServiceDescriptor, SessionsHttpServiceV1);
	}
	
}
