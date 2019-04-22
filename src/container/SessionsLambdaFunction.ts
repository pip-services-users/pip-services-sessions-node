import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { SessionsServiceFactory } from '../build/SessionsServiceFactory';

export class SessionsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("sessions", "User sessions function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-sessions', 'controller', 'default', '*', '*'));
        this._factories.add(new SessionsServiceFactory());
    }
}

export const handler = new SessionsLambdaFunction().getHandler();