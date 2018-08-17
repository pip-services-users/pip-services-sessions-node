import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-seneca-node';

export class SessionsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('sessions');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-sessions', 'controller', 'default', '*', '1.0'));
    }
}