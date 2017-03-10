import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';

import { ISessionsPersistence } from '../persistence/ISessionsPersistence';
import { ISessionsBusinessLogic } from './ISessionsBusinessLogic';
import { SessionsCommandSet } from './SessionsCommandSet';

export class SessionsController extends AbstractController implements ISessionsBusinessLogic {
	/**
	 * Unique descriptor for the SessionsController component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Controllers, "pip-services-sessions", "*", "*"
	);
    
	private _db: ISessionsPersistence;
    
    constructor() {
        super(SessionsController.Descriptor);
    }
    
    public link(components: ComponentSet): void {
        // Locate reference to quotes persistence component
        this._db = <ISessionsPersistence>components.getOneRequired(
        	new ComponentDescriptor(Category.Persistence, "pip-services-sessions", '*', '*')
    	);
        
        super.link(components);

        // Add commands
        let commands = new SessionsCommandSet(this);
        this.addCommandSet(commands);
    }
    
    public getSessions(correlationId: string, userId: string, callback) {
        callback = this.instrument(correlationId, 'sessions.get_sessions', callback);
        this._db.getSessions(correlationId, userId, callback);
    }

    public loadSession(correlationId: string, userId: string, sessionId: string, callback) {
        callback = this.instrument(correlationId, 'sessions.load_session', callback);
        this._db.loadSession(correlationId, userId, sessionId, callback);
    }

    public openSession(correlationId: string, user: any, address: string, client: string, data: any, callback) {
        callback = this.instrument(correlationId, 'sessions.open_session', callback);
        this._db.openSession(correlationId, user, address, client, data, callback);
    }

    public storeSessionData(correlationId: string, userId: string, sessionId: string, data: any, callback) {
        callback = this.instrument(correlationId, 'sessions.store_session_data', callback);
        this._db.storeSessionData(correlationId, userId, sessionId, data, callback);
    }

    public closeSession(correlationId: string, userId: string, address: string, client: string, callback) {
        callback = this.instrument(correlationId, 'sessions.close_session', callback);
        this._db.closeSession(correlationId, userId, address, client, callback);
    }

    public deleteSession(correlationId: string, userId: string, sessionId: string, callback) {
        callback = this.instrument(correlationId, 'sessions.delete_session', callback);
        this._db.deleteSession(correlationId, userId, sessionId, callback);
    }
    
}
