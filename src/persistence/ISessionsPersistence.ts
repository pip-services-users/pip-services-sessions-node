import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { AnyValueMap } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { SessionV1 } from '../data/version1/SessionV1';

export interface ISessionsPersistence 
    extends IGetter<SessionV1, string>, IWriter<SessionV1, string> 
{
    getPageByFilter(correlation_id: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<SessionV1>) => void): void;

    getOneById(correlation_id: string, id: string, callback: (err: any, item: SessionV1) => void): void;
    
    create(correlation_id: string, item: SessionV1, callback?: (err: any, item: SessionV1) => void): void;

    update(correlation_id: string, item: SessionV1, callback?: (err: any, item: SessionV1) => void): void;

    updatePartially(correlation_id: string, id: string, data: AnyValueMap, callback?: (err: any, item: SessionV1) => void): void;
    
    deleteById(correlation_id: string, id: string, callback?: (err: any, item: SessionV1) => void): void;

    closeExpired(correlation_id: string, request_time: Date, callback?: (err: any) => void): void;
}
