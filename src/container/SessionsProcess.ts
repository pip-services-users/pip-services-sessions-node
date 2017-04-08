import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { SessionsFactory } from '../build/SessionsFactory';

export class SessionsProcess extends ProcessContainer {

    protected initReferences(references: IReferences): void {
        super.initReferences(references);

        // Factory to statically resolve Sessions components
        references.put(SessionsFactory.Descriptor, new SessionsFactory());
    }

    public runWithArguments(args: string[]): void {
        return this.runWithArgumentsOrConfigFile("sessions", args, "./config/config.yaml");
    }

}
