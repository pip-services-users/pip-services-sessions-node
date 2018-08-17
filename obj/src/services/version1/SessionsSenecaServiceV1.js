"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class SessionsSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('sessions');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-sessions', 'controller', 'default', '*', '1.0'));
    }
}
exports.SessionsSenecaServiceV1 = SessionsSenecaServiceV1;
//# sourceMappingURL=SessionsSenecaServiceV1.js.map