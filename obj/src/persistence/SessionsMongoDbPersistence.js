"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const SessionsMongoDbSchema_1 = require("./SessionsMongoDbSchema");
class SessionsMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('sessions', SessionsMongoDbSchema_1.SessionsMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-request_time', { user: 0, data: 0 }, callback);
    }
    create(correlationId, item, callback) {
        if (item == null) {
            callback(null, null);
            return;
        }
        let now = new Date();
        item.open_time = now;
        item.request_time = now;
        super.create(correlationId, item, callback);
    }
    update(correlationId, item, callback) {
        if (item == null) {
            callback(null, null);
            return;
        }
        let now = new Date();
        item.request_time = now;
        super.update(correlationId, item, callback);
    }
    closeExpired(correlation_id, request_time, callback) {
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
            if (callback)
                callback(err);
        });
    }
}
exports.SessionsMongoDbPersistence = SessionsMongoDbPersistence;
//# sourceMappingURL=SessionsMongoDbPersistence.js.map