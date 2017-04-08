import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsBusinessLogic } from './ISessionsBusinessLogic';
export declare class SessionsController implements IConfigurable, IReferenceable, ICommandable, ISessionsBusinessLogic {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getSessions(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SessionV1>) => void): void;
    getSessionById(correlationId: string, sessionId: string, callback: (err: any, session: SessionV1) => void): void;
    openSession(correlationId: string, user_id: string, user_name: string, address: string, client: string, user: any, data: any, callback: (err: any, session: SessionV1) => void): void;
    storeSessionData(correlationId: string, sessionId: string, data: any, callback: (err: any, session: SessionV1) => void): void;
    closeSession(correlationId: string, sessionId: string, callback: (err: any, session: SessionV1) => void): void;
    deleteSessionById(correlationId: string, sessionId: string, callback: (err: any, session: SessionV1) => void): void;
}
