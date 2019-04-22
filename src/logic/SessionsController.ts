import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';
import { AnyValueMap } from 'pip-services3-commons-node';
import { IOpenable } from 'pip-services3-commons-node';
import { FixedRateTimer } from 'pip-services3-commons-node';
import { CompositeLogger } from 'pip-services3-components-node';

import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from '../persistence/ISessionsPersistence';
import { ISessionsController } from './ISessionsController';
import { SessionsCommandSet } from './SessionsCommandSet';

export class SessionsController implements IConfigurable, IReferenceable, ICommandable, ISessionsController, IOpenable {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'options.cleanup_interval', 900000,
        'options.expire_timeout', 24 * 3600000,

        'dependencies.persistence', 'pip-services-sessions:persistence:*:*:1.0'
    );

    private _logger: CompositeLogger = new CompositeLogger();
    private _dependencyResolver: DependencyResolver = new DependencyResolver(SessionsController._defaultConfig);
    private _persistence: ISessionsPersistence;
    private _commandSet: SessionsCommandSet;

    private _expireTimeout: number = 24 * 3600000;
    private _cleanupInterval: number = 900000;
    private _cleanupTimer: FixedRateTimer;

    public configure(config: ConfigParams): void {
        this._expireTimeout = config.getAsLongWithDefault('options.expire_timeout', this._expireTimeout);
        this._cleanupInterval = config.getAsLongWithDefault('options.cleanup_interval', this._cleanupInterval);

        this._logger.configure(config);
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ISessionsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new SessionsCommandSet(this);
        return this._commandSet;
    }

    public isOpen(): boolean {
        return this._cleanupTimer != null;
    }

    public open(correlationId: string, callback: (err: any) => void): void {
        if (this._cleanupTimer) {
            if (callback) callback(null);
            return;
        }

        this._cleanupTimer = new FixedRateTimer(() => {
            this._logger.info(correlationId, 'Closing expired user sessions');
            this.closeExpiredSessions(correlationId, null);
        }, this._cleanupInterval);
        this._cleanupTimer.start();

        if (callback) callback(null);
    }

    public close(correlationId: string, callback: (err: any) => void): void {
        if (this._cleanupTimer) {
            this._cleanupTimer.stop();
            this._cleanupTimer = null;
        }

        if (callback) callback(null);
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
                'close_time', new Date(), 
                'data', null,
                'user', null
            ),
            callback
        );
    }

    public closeExpiredSessions(correlationId: string,
        callback: (err: any) => void): void {
        let now = new Date().getTime();
        let requestTime = new Date(now - this._expireTimeout);
        this._persistence.closeExpired(correlationId, requestTime, callback);
    }
    
    public deleteSessionById(correlationId: string, sessionId: string,
        callback: (err: any, session: SessionV1) => void): void {
        this._persistence.deleteById(correlationId, sessionId, callback);
    }
}
