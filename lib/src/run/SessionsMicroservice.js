"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var SessionsFactory_1 = require('../build/SessionsFactory');
/**
 * User sessions microservice class.
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-25
 */
var SessionsMicroservice = (function (_super) {
    __extends(SessionsMicroservice, _super);
    /**
     * Creates instance of sessions microservice.
     */
    function SessionsMicroservice() {
        _super.call(this, "pip-services-sessions", SessionsFactory_1.SessionsFactory.Instance);
    }
    return SessionsMicroservice;
}(pip_services_runtime_node_1.Microservice));
exports.SessionsMicroservice = SessionsMicroservice;
