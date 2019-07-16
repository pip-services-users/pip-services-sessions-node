import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { SessionsServiceFactory } from '../build/SessionsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';
import { DefaultGrpcFactory } from 'pip-services3-grpc-node';

export class SessionsProcess extends ProcessContainer {

    public constructor() {
        super("sessions", "User sessions microservice");
        this._factories.add(new SessionsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
    }
}
