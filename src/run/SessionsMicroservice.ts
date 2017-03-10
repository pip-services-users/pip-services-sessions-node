import { Microservice } from 'pip-services-runtime-node';

import { SessionsFactory } from '../build/SessionsFactory';

/**
 * User sessions microservice class.
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-25
 */
export class SessionsMicroservice extends Microservice {
	/**
	 * Creates instance of sessions microservice.
	 */
	constructor() {
		super("pip-services-sessions", SessionsFactory.Instance);
	}
}
