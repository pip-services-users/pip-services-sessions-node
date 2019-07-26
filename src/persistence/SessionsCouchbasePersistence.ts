let _ = require('lodash');
let async = require('async');

import { FilterParams, DateTimeConverter } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { StringConverter } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { IdentifiableCouchbasePersistence } from 'pip-services3-couchbase-node';

import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from './ISessionsPersistence';

export class SessionsCouchbasePersistence 
    extends IdentifiableCouchbasePersistence<SessionV1, string> 
    implements ISessionsPersistence {

    constructor() {
        super('users', 'sessions');
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let filters = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            filters.push("id='" + id + "'");

        let userId = filter.getAsNullableString('user_id');
        if (userId != null)
            filters.push("user_id='" + userId + "'");

        let active = filter.getAsNullableBoolean('active');
        if (active != null)
            filters.push("active=" + (active ? 'TRUE' : 'FALSE'));

        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            filters.push("request_time>='" + StringConverter.toString(fromTime) + "'");

        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            filters.push("request_time<'" + StringConverter.toString(toTime) + "'");

        return filters.length > 0 ? filters.join(" AND ") : null;
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(
            correlationId,
            this.composeFilter(filter),
            paging,
            'request_time DESC',
            'id, user_id, user_name, active, open_time, close_time, request_time, address, client',
            callback
        );    
    };

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
        let filter = "request_time<'" + StringConverter.toString(request_time) + "' AND active=TRUE";
        super.getListByFilter(correlation_id, filter, null, null, (err, items) => {
            if (err) {
                callback(err);
                return;
            }

            if (items.length > 0)
                this._logger.debug(correlation_id, 'Closed %d expired sessions', items.length);

            let now = new Date();

            async.each(items, (item, callback) => {
                item.active = false;
                item.request_time = now;
                item.close_time = now;
                item.user = null;
                item.data = null;

                super.update(correlation_id, item, callback);
            }, callback);
        });
    }

}
