let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { ISessionsBusinessLogic } from '../../logic/ISessionsBusinessLogic';

export class SessionsRestService extends RestService {       
	/**
	 * Unique descriptor for the SessionsRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-sessions", "rest", "1.0"
	);
    
	private _logic: ISessionsBusinessLogic;

    constructor() {
        super(SessionsRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <ISessionsBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-sessions", "*", "*")
		);

		super.link(components);		
	}
    
    private getSessions(req, res) {
        if (req.params.session_id)
            this._logic.loadSession(
                req.params.correlation_id,
                req.params.userId,
                req.params.session_id,
                this.sendResult(req, res)
            );
        else
            this._logic.getSessions(
                req.params.correlation_id,
                req.params.userId,
                this.sendResult(req, res)
            );
    }

    private openSession(req, res) {
        this._logic.openSession(
            req.params.correlation_id,
            req.body.user,
            req.body.address,
            req.body.client,
            req.body.data,
            this.sendCreatedResult(req, res)
        );
    }

    private storeSessionData(req, res) {
        this._logic.storeSessionData(
            req.params.correlation_id,
            req.params.userId,
            req.params.session_id,
            req.body.data,
            this.sendResult(req, res)
        );
    }

    private deleteSession(req, res) {
        if (req.params.session_id)
            this._logic.deleteSession(
                req.params.correlation_id,
                req.params.userId,
                req.params.session_id,
                this.sendResult(req, res)
            );
        else
            this._logic.closeSession(
                req.params.correlation_id,
                req.params.userId,
                req.params.address,
                req.params.client,
                this.sendDeletedResult(req, res)
            );
    }
        
    protected register() {
        this.registerRoute('get', '/sessions/:userId', this.getSessions);
        this.registerRoute('post', '/sessions', this.openSession);
        this.registerRoute('post', '/sessions/:userId', this.storeSessionData);
        this.registerRoute('delete', '/sessions/:userId', this.deleteSession);
    }
}
