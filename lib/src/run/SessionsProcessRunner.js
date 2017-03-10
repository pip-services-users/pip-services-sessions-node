"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var SessionsMicroservice_1 = require('./SessionsMicroservice');
/**
 * User sessions process runner
 *
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-25
 */
var SessionsProcessRunner = (function (_super) {
    __extends(SessionsProcessRunner, _super);
    /**
     * Creates instance of sessions process runner
     */
    function SessionsProcessRunner() {
        _super.call(this, new SessionsMicroservice_1.SessionsMicroservice());
    }
    return SessionsProcessRunner;
}(pip_services_runtime_node_1.ProcessRunner));
exports.SessionsProcessRunner = SessionsProcessRunner;
