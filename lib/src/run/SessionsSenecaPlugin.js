"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var SessionsMicroservice_1 = require('./SessionsMicroservice');
var SessionsSenecaPlugin = (function (_super) {
    __extends(SessionsSenecaPlugin, _super);
    function SessionsSenecaPlugin() {
        _super.call(this, 'sessions', new SessionsMicroservice_1.SessionsMicroservice());
    }
    return SessionsSenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.SessionsSenecaPlugin = SessionsSenecaPlugin;
