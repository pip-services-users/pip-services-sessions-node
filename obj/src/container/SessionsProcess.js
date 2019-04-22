"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const SessionsServiceFactory_1 = require("../build/SessionsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class SessionsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("sessions", "User sessions microservice");
        this._factories.add(new SessionsServiceFactory_1.SessionsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.SessionsProcess = SessionsProcess;
//# sourceMappingURL=SessionsProcess.js.map