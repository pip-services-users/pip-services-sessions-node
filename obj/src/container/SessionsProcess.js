"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const SessionsFactory_1 = require("../build/SessionsFactory");
class SessionsProcess extends pip_services_container_node_1.ProcessContainer {
    initReferences(references) {
        super.initReferences(references);
        // Factory to statically resolve Sessions components
        references.put(SessionsFactory_1.SessionsFactory.Descriptor, new SessionsFactory_1.SessionsFactory());
    }
    runWithArguments(args) {
        return this.runWithArgumentsOrConfigFile("sessions", args, "./config/config.yaml");
    }
}
exports.SessionsProcess = SessionsProcess;
//# sourceMappingURL=SessionsProcess.js.map