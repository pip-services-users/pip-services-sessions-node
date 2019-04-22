let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from './ISessionsPersistence';

export class SessionsMemoryPersistence 
    extends IdentifiableMemoryPersistence<SessionV1, string> 
    implements ISessionsPersistence {

    constructor() {
        super();
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        let id = filter.getAsNullableString('id');
        let userId = filter.getAsNullableString('user_id');
        let active = filter.getAsNullableBoolean('active');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');

        return (item: SessionV1) => {
            if (id != null && id != item.id)
                return false;
            if (userId != null && userId != item.user_id)
                return false;
            if (active != null && active != item.active)
                return false;
            if (fromTime != null && item.request_time >= fromTime)
                return false;
            if (toTime != null && item.request_time < toTime)
                return false;
            return true;
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<SessionV1>) => void): void {
        super.getPageByFilter(
            correlationId, this.composeFilter(filter), paging, null, null,
            (err, page) => {
                // Remove cached data
                page.data = _.map(page.data, (s) => {
                    return _.omit(s, 'user', 'data');
                })

                callback(err, page);
            });
    }

    public create(correlationId: string, item: SessionV1,
        callback?: (err: any, item: SessionV1) => void): void {
        if (item == null) {
            callback(null, null);
            return;
        }

        let now = new Date();
        item.open_time = now;
        item.request_time = now;

        super.create(correlationId, item, callback);
    }

    public update(correlationId: string, item: SessionV1,
        callback?: (err: any, item: SessionV1) => void): void {
        if (item == null) {
            callback(null, null);
            return;
        }

        let now = new Date();
        item.request_time = now;

        super.update(correlationId, item, callback);
    }

    public closeExpired(correlation_id: string, request_time: Date, callback?: (err: any) => void): void {
        let time = request_time.getTime();
        let now = new Date();
        let count = 0;

        for (let item of this._items) {
            if (item.active && item.request_time.getTime() < time) {
                item.active = false;
                item.close_time = now;
                item.request_time = now;
                item.data = null;
                item.user = null;

                count++;
            }
        }

        if (count > 0) {
            this._logger.debug(correlation_id, 'Closed %d expired sessions', count);

            this.save(correlation_id, callback);
        } else {
            if (callback) callback(null);
        }
    }

}
