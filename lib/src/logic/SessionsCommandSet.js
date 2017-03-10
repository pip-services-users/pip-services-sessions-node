"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SessionsCommandSet = (function (_super) {
    __extends(SessionsCommandSet, _super);
    function SessionsCommandSet(logic) {
        _super.call(this);
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetSessionsCommand());
        this.addCommand(this.makeLoadSessionCommand());
        this.addCommand(this.makeOpenSessionCommand());
        this.addCommand(this.makeStoreSessionDataCommand());
        this.addCommand(this.makeCloseSessionCommand());
        this.addCommand(this.makeDeleteSessionCommand());
    }
    SessionsCommandSet.prototype.makeGetSessionsCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_sessions", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            _this._logic.getSessions(correlationId, userId, callback);
        });
    };
    SessionsCommandSet.prototype.makeLoadSessionCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "load_session", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withProperty("session_id", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var sessionId = args.getNullableString("session_id");
            _this._logic.loadSession(correlationId, userId, sessionId, callback);
        });
    };
    SessionsCommandSet.prototype.makeOpenSessionCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "open_session", new pip_services_runtime_node_3.Schema()
            .withProperty("user", "object")
            .withProperty("address", "string")
            .withProperty("client", "string")
            .withOptionalProperty("data", "any"), function (correlationId, args, callback) {
            var user = args.get("user");
            var address = args.getNullableString("address");
            var client = args.getNullableString("client");
            var data = args.get("data");
            _this._logic.openSession(correlationId, user, address, client, data, callback);
        });
    };
    SessionsCommandSet.prototype.makeStoreSessionDataCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "store_session_data", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withProperty("session_id", "string")
            .withOptionalProperty("data", "any"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var sessionId = args.getNullableString("session_id");
            var data = args.get("data");
            _this._logic.storeSessionData(correlationId, userId, sessionId, data, callback);
        });
    };
    SessionsCommandSet.prototype.makeCloseSessionCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "close_session", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withProperty("address", "string")
            .withProperty("client", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var address = args.getNullableString("address");
            var client = args.getNullableString("client");
            _this._logic.closeSession(correlationId, userId, address, client, callback);
        });
    };
    SessionsCommandSet.prototype.makeDeleteSessionCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "delete_session", new pip_services_runtime_node_3.Schema()
            .withProperty("user_id", "string")
            .withProperty("session_id", "string"), function (correlationId, args, callback) {
            var userId = args.getNullableString("user_id");
            var sessionId = args.getNullableString("session_id");
            _this._logic.deleteSession(correlationId, userId, sessionId, callback);
        });
    };
    return SessionsCommandSet;
}(pip_services_runtime_node_1.CommandSet));
exports.SessionsCommandSet = SessionsCommandSet;
