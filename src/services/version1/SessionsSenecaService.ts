let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';

import { ISessionsBusinessLogic } from '../../logic/ISessionsBusinessLogic';

export class SessionsSenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the SessionsSenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-sessions", "seneca", "1.0"
	);

    private _logic: ISessionsBusinessLogic;

    constructor() {
        super(SessionsSenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <ISessionsBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-sessions", "*", "*")
		);

		super.link(components);		

        this.registerCommands('sessions', this._logic.getCommands());
	}

}
