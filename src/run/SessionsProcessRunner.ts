import { ProcessRunner } from 'pip-services-runtime-node';

import { SessionsMicroservice } from './SessionsMicroservice';

/**
 * User sessions process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-25
 */
export class SessionsProcessRunner extends ProcessRunner {
    /**
     * Creates instance of sessions process runner
     */
    constructor() {
        super(new SessionsMicroservice());
    }
}