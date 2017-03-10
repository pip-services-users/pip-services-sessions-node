import { SenecaPlugin } from 'pip-services-runtime-node';

import { SessionsMicroservice} from './SessionsMicroservice';

export class SessionsSenecaPlugin extends SenecaPlugin {
    constructor() {
        super('sessions', new SessionsMicroservice());
    }
}