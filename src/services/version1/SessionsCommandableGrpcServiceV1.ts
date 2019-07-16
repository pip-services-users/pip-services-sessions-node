import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class SessionsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/sessions');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-sessions', 'controller', 'default', '*', '*'));
    }
}