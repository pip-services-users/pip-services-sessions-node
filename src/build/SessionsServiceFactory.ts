import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { SessionsCouchbasePersistence } from '../persistence/SessionsCouchbasePersistence';
import { SessionsMongoDbPersistence } from '../persistence/SessionsMongoDbPersistence';
import { SessionsFilePersistence } from '../persistence/SessionsFilePersistence';
import { SessionsMemoryPersistence } from '../persistence/SessionsMemoryPersistence';
import { SessionsController } from '../logic/SessionsController';
import { SessionsHttpServiceV1 } from '../services/version1/SessionsHttpServiceV1';
import { SessionsCommandableGrpcServiceV1 } from '../services/version1/SessionsCommandableGrpcServiceV1';
import { SessionsGrpcServiceV1 } from '../services/version1/SessionsGrpcServiceV1';

export class SessionsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-sessions", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-sessions", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-sessions", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-sessions", "persistence", "mongodb", "*", "1.0");
	public static CouchbasePersistenceDescriptor = new Descriptor("pip-services-sessions", "persistence", "couchbase", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-sessions", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-sessions", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("pip-services-sessions", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("pip-services-sessions", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(SessionsServiceFactory.MemoryPersistenceDescriptor, SessionsMemoryPersistence);
		this.registerAsType(SessionsServiceFactory.FilePersistenceDescriptor, SessionsFilePersistence);
		this.registerAsType(SessionsServiceFactory.MongoDbPersistenceDescriptor, SessionsMongoDbPersistence);
		this.registerAsType(SessionsServiceFactory.CouchbasePersistenceDescriptor, SessionsCouchbasePersistence);
		this.registerAsType(SessionsServiceFactory.ControllerDescriptor, SessionsController);
		this.registerAsType(SessionsServiceFactory.HttpServiceDescriptor, SessionsHttpServiceV1);
		this.registerAsType(SessionsServiceFactory.CommandableGrpcServiceDescriptor, SessionsCommandableGrpcServiceV1);
		this.registerAsType(SessionsServiceFactory.GrpcServiceDescriptor, SessionsGrpcServiceV1);
	}
	
}
