"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
class SessionsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetSessionsCommand());
        this.addCommand(this.makeGetSessionByIdCommand());
        this.addCommand(this.makeOpenSessionCommand());
        this.addCommand(this.makeStoreSessionDataCommand());
        this.addCommand(this.makeUpdateSessionUserCommand());
        this.addCommand(this.makeCloseSessionCommand());
        this.addCommand(this.makeCloseExpiredSessionsCommand());
        this.addCommand(this.makeDeleteSessionByIdCommand());
    }
    makeGetSessionsCommand() {
        return new pip_services_commons_node_2.Command("get_sessions", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getSessions(correlationId, filter, paging, callback);
        });
    }
    makeGetSessionByIdCommand() {
        return new pip_services_commons_node_2.Command("get_session_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('session_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let sessionId = args.getAsNullableString("session_id");
            this._logic.getSessionById(correlationId, sessionId, callback);
        });
    }
    makeOpenSessionCommand() {
        return new pip_services_commons_node_2.Command("open_session", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('user_id', pip_services_commons_node_6.TypeCode.String)
            .withOptionalProperty('user_name', pip_services_commons_node_6.TypeCode.String)
            .withOptionalProperty('address', pip_services_commons_node_6.TypeCode.String)
            .withOptionalProperty('client', pip_services_commons_node_6.TypeCode.String)
            .withOptionalProperty('user', null)
            .withOptionalProperty('data', null), (correlationId, args, callback) => {
            let userId = args.getAsNullableString("user_id");
            let userName = args.getAsNullableString("user_name");
            let address = args.getAsNullableString("address");
            let client = args.getAsNullableString("client");
            let user = args.get("user");
            let data = args.get("data");
            this._logic.openSession(correlationId, userId, userName, address, client, user, data, callback);
        });
    }
    makeStoreSessionDataCommand() {
        return new pip_services_commons_node_2.Command("store_session_data", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('session_id', pip_services_commons_node_6.TypeCode.String)
            .withRequiredProperty('data', null), (correlationId, args, callback) => {
            let sessionId = args.getAsNullableString("session_id");
            let data = args.get("data");
            this._logic.storeSessionData(correlationId, sessionId, data, callback);
        });
    }
    makeUpdateSessionUserCommand() {
        return new pip_services_commons_node_2.Command("update_session_user", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('session_id', pip_services_commons_node_6.TypeCode.String)
            .withRequiredProperty('user', null), (correlationId, args, callback) => {
            let sessionId = args.getAsNullableString("session_id");
            let user = args.get("user");
            this._logic.updateSessionUser(correlationId, sessionId, user, callback);
        });
    }
    makeCloseSessionCommand() {
        return new pip_services_commons_node_2.Command("close_session", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('session_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let sessionId = args.getAsNullableString("session_id");
            this._logic.closeSession(correlationId, sessionId, callback);
        });
    }
    makeCloseExpiredSessionsCommand() {
        return new pip_services_commons_node_2.Command("close_expired_sessions", new pip_services_commons_node_5.ObjectSchema(true), (correlationId, args, callback) => {
            this._logic.closeExpiredSessions(correlationId, (err) => {
                callback(err, null);
            });
        });
    }
    makeDeleteSessionByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_session_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('session_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let sessionId = args.getAsNullableString("session_id");
            this._logic.deleteSessionById(correlationId, sessionId, callback);
        });
    }
}
exports.SessionsCommandSet = SessionsCommandSet;
//# sourceMappingURL=SessionsCommandSet.js.map