import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { IdGenerator } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';

import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from '../persistence/ISessionsPersistence';
import { ISessionsController } from './ISessionsController';
import { SessionsCommandSet } from './SessionsCommandSet';

export class SessionsController implements IConfigurable, IReferenceable, ICommandable, ISessionsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-sessions:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(SessionsController._defaultConfig);
    private _persistence: ISessionsPersistence;
    private _commandSet: SessionsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ISessionsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new SessionsCommandSet(this);
        return this._commandSet;
    }

    public getSessions(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<SessionV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    
    public getSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void {
        this._persistence.getOneById(correlationId, sessionId, callback);
    }

    public openSession(correlationId: string, user_id: string, user_name: string,
        address: string, client: string, user: any, data: any,
        callback: (err: any, session: SessionV1) => void): void {
        let session = new SessionV1(
            IdGenerator.nextLong(),
            user_id, user_name, address, client
        );
        session.user = user;
        session.data = data;

        this._persistence.create(
            correlationId, session, callback
        );
    }
    
    public storeSessionData(correlationId: string, sessionId: string, data: any,
        callback: (err: any, session: SessionV1) => void): void {
        this._persistence.updatePartially(
            correlationId, sessionId, 
            AnyValueMap.fromTuples(
                'request_time', new Date(),
                'data', data
            ),
            callback
        );
    }

    public updateSessionUser(correlationId: string, sessionId: string, user: any,
        callback: (err: any, session: SessionV1) => void): void {
        this._persistence.updatePartially(
            correlationId, sessionId, 
            AnyValueMap.fromTuples(
                'request_time', new Date(),
                'user', user
            ),
            callback
        );
    }
    
    public closeSession(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void {
        this._persistence.updatePartially(
            correlationId, sessionId, 
            AnyValueMap.fromTuples(
                'active', false,
                'request_time', new Date(),
                'close_time', new Date()
            ),
            callback
        );
    }

    public deleteSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void {
        this._persistence.deleteById(correlationId, sessionId, callback);
    }
}
