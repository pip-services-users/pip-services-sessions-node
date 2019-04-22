import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class SessionsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/sessions');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-sessions', 'controller', 'default', '*', '1.0'));
    }
}