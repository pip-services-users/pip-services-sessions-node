"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const SessionsFactory_1 = require("../build/SessionsFactory");
class SessionsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("sessions", "User sessions microservice");
        this._factories.add(new SessionsFactory_1.SessionsFactory);
    }
}
exports.SessionsProcess = SessionsProcess;
//# sourceMappingURL=SessionsProcess.js.map