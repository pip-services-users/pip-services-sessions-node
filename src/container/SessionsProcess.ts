import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { SessionsServiceFactory } from '../build/SessionsServiceFactory';

export class SessionsProcess extends ProcessContainer {

    public constructor() {
        super("sessions", "User sessions microservice");
        this._factories.add(new SessionsServiceFactory);
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }
}
