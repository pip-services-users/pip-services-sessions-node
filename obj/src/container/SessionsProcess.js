"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const SessionsServiceFactory_1 = require("../build/SessionsServiceFactory");
class SessionsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("sessions", "User sessions microservice");
        this._factories.add(new SessionsServiceFactory_1.SessionsServiceFactory);
    }
}
exports.SessionsProcess = SessionsProcess;
//# sourceMappingURL=SessionsProcess.js.map