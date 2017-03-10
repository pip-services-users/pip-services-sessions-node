"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var SessionsMicroservice_1 = require('../run/SessionsMicroservice');
var SessionsLambdaFunction = (function (_super) {
    __extends(SessionsLambdaFunction, _super);
    function SessionsLambdaFunction() {
        _super.call(this, new SessionsMicroservice_1.SessionsMicroservice());
    }
    SessionsLambdaFunction.prototype.link = function (components) {
        this._logic = components.getOneOptional(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-sessions", "*", "*"));
        _super.prototype.link.call(this, components);
        this.registerCommands(this._logic.getCommands());
    };
    return SessionsLambdaFunction;
}(pip_services_runtime_node_3.LambdaFunction));
exports.SessionsLambdaFunction = SessionsLambdaFunction;
