import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { SessionsFactory } from '../build/SessionsFactory';

export class SessionsProcess extends ProcessContainer {

    public constructor() {
        super("sessions", "User sessions microservice");
        this._factories.add(new SessionsFactory);
    }
}
