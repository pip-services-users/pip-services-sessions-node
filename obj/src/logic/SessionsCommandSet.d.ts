import { CommandSet } from 'pip-services-commons-node';
import { ISessionsBusinessLogic } from './ISessionsBusinessLogic';
export declare class SessionsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ISessionsBusinessLogic);
    private makeGetSessionsCommand();
    private makeGetSessionByIdCommand();
    private makeOpenSessionCommand();
    private makeStoreSessionDataCommand();
    private makeCloseSessionCommand();
    private makeDeleteSessionByIdCommand();
}
