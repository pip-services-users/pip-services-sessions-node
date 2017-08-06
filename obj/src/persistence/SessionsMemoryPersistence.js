"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
class SessionsMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let userId = filter.getAsNullableString('user_id');
        let active = filter.getAsNullableBoolean('active');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
        return (item) => {
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, (err, page) => {
            // Remove cached data
            page.data = _.map(page.data, (s) => {
                return _.omit(s, 'user', 'data');
            });
            callback(err, page);
        });
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
        }
        else {
            if (callback)
                callback(null);
        }
    }
}
exports.SessionsMemoryPersistence = SessionsMemoryPersistence;
//# sourceMappingURL=SessionsMemoryPersistence.js.map