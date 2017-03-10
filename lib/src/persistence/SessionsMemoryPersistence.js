"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var SessionsFilePersistence_1 = require('./SessionsFilePersistence');
var SessionsMemoryPersistence = (function (_super) {
    __extends(SessionsMemoryPersistence, _super);
    function SessionsMemoryPersistence() {
        _super.call(this, SessionsMemoryPersistence.Descriptor);
    }
    SessionsMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    SessionsMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the SessionsMemoryPersistence component
     */
    SessionsMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-sessions", "memory", "*");
    return SessionsMemoryPersistence;
}(SessionsFilePersistence_1.SessionsFilePersistence));
exports.SessionsMemoryPersistence = SessionsMemoryPersistence;
