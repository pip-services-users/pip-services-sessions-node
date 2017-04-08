import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from './ISessionsPersistence';
export declare class SessionsMemoryPersistence extends IdentifiableMemoryPersistence<SessionV1, string> implements ISessionsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SessionV1>) => void): void;
    create(correlationId: string, item: SessionV1, callback?: (err: any, item: SessionV1) => void): void;
    update(correlationId: string, item: SessionV1, callback?: (err: any, item: SessionV1) => void): void;
}
