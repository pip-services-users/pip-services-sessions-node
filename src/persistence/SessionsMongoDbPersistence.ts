let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';

import { SessionV1 } from '../data/version1/SessionV1';
import { ISessionsPersistence } from './ISessionsPersistence';
import { SessionsMongoDbSchema } from './SessionsMongoDbSchema';

export class SessionsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<SessionV1, string> 
    implements ISessionsPersistence {

    constructor() {
        super('sessions', SessionsMongoDbSchema());
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let userId = filter.getAsNullableString('user_id');
        if (userId != null)
            criteria.push({ user_id: userId });

        let active = filter.getAsNullableBoolean('active');
        if (active != null)
            criteria.push({ active: active });

        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ request_time: { $gte: fromTime } });

        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ request_time: { $lt: toTime } });

        return criteria.length > 0 ? { $and: criteria } : {};
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-request_time', { user: 0, data: 0 }, callback);
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
        let criteria = {
            request_time: { $lt: request_time },
            active: true
        };
        let newItem = {
            $set: {
                active: false,
                request_time: new Date(),
                close_time: new Date(),
                user: null,
                data: null
            }
        };
        let options = {
            multi: true
        };

        this._model.update(criteria, newItem, options, (err, count) => {
            if (count > 0)
                this._logger.debug(correlation_id, 'Closed %d expired sessions', count);
    
            if (callback) callback(err);
        });
    }

}