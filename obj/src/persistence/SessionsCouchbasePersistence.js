"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_couchbase_node_1 = require("pip-services3-couchbase-node");
class SessionsCouchbasePersistence extends pip_services3_couchbase_node_1.IdentifiableCouchbasePersistence {
    constructor() {
        super('users', 'sessions');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
            filters.push("request_time>='" + pip_services3_commons_node_2.StringConverter.toString(fromTime) + "'");
        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            filters.push("request_time<'" + pip_services3_commons_node_2.StringConverter.toString(toTime) + "'");
        return filters.length > 0 ? filters.join(" AND ") : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, 'request_time DESC', 'id, user_id, user_name, active, open_time, close_time, request_time, address, client', callback);
    }
    ;
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
        let filter = "request_time<'" + pip_services3_commons_node_2.StringConverter.toString(request_time) + "' AND active=TRUE";
        super.getListByFilter(correlation_id, filter, null, null, (err, items) => {
            if (err) {
                this._logger.error(correlation_id, err, 'Failed to close expired sessions');
                if (callback)
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
exports.SessionsCouchbasePersistence = SessionsCouchbasePersistence;
//# sourceMappingURL=SessionsCouchbasePersistence.js.map