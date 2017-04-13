import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { SessionsFactory } from '../build/SessionsFactory';

export class SessionsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("sessions", "User sessions function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-sessions', 'controller', 'default', '*', '*'));
        this._factories.add(new SessionsFactory());
    }
}

export const handler = new SessionsLambdaFunction().getHandler();