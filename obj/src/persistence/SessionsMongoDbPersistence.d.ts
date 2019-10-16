import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';
import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from './ISessionsPersistence';
export declare class SessionsMongoDbPersistence extends IdentifiableMongoosePersistence<SessionV1, string> implements ISessionsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    create(correlationId: string, item: SessionV1, callback?: (err: any, item: SessionV1) => void): void;
    update(correlationId: string, item: SessionV1, callback?: (err: any, item: SessionV1) => void): void;
    closeExpired(correlation_id: string, request_time: Date, callback?: (err: any) => void): void;
}
