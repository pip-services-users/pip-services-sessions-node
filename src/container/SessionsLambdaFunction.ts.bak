import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { SessionsMicroservice } from '../run/SessionsMicroservice';
import { ISessionsBusinessLogic } from '../logic/ISessionsBusinessLogic';

export class SessionsLambdaFunction extends LambdaFunction {
    private _logic: ISessionsBusinessLogic;

    constructor() {
        super(new SessionsMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <ISessionsBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-sessions", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
}