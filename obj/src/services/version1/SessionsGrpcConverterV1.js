"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let messages = require('../../../../src/protos/sessions_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
class SessionsGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_node_4.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        SessionsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: SessionsGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_node_5.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (_.isFunction(values.toObject))
            values = values.toObject();
        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            for (let propName in values) {
                if (values.hasOwnProperty(propName))
                    map[propName] = values[propName];
            }
        }
    }
    static getMap(map) {
        let values = {};
        SessionsGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_node_1.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromSession(session) {
        if (session == null)
            return null;
        let obj = new messages.Session();
        obj.setId(session.id);
        obj.setUserId(session.user_id);
        obj.setUserName(session.user_name);
        obj.setActive(session.active);
        obj.setOpenTime(pip_services3_commons_node_2.StringConverter.toString(session.open_time));
        obj.setCloseTime(pip_services3_commons_node_2.StringConverter.toString(session.close_time));
        obj.setRequestTime(pip_services3_commons_node_2.StringConverter.toString(session.request_time));
        obj.setAddress(session.address);
        obj.setClient(session.client);
        obj.setUser(SessionsGrpcConverterV1.toJson(session.user));
        obj.setData(SessionsGrpcConverterV1.toJson(session.data));
        return obj;
    }
    static toSession(obj) {
        if (obj == null)
            return null;
        let session = {
            id: obj.getId(),
            user_id: obj.getUserId(),
            user_name: obj.getUserName(),
            active: obj.getActive(),
            open_time: pip_services3_commons_node_3.DateTimeConverter.toDateTime(obj.getOpenTime()),
            close_time: pip_services3_commons_node_3.DateTimeConverter.toDateTime(obj.getCloseTime()),
            request_time: pip_services3_commons_node_3.DateTimeConverter.toDateTime(obj.getRequestTime()),
            address: obj.getAddress(),
            client: obj.getClient(),
            user: SessionsGrpcConverterV1.fromJson(obj.getUser()),
            data: SessionsGrpcConverterV1.fromJson(obj.getData())
        };
        return session;
    }
    static fromSessionPage(page) {
        if (page == null)
            return null;
        let obj = new messages.SessionPage();
        obj.setTotal(page.total);
        let data = _.map(page.data, SessionsGrpcConverterV1.fromSession);
        obj.setDataList(data);
        return obj;
    }
    static toSessionPage(obj) {
        if (obj == null)
            return null;
        let data = _.map(obj.getDataList(), SessionsGrpcConverterV1.toSession);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.SessionsGrpcConverterV1 = SessionsGrpcConverterV1;
//# sourceMappingURL=SessionsGrpcConverterV1.js.map