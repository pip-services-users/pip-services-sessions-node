"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class SessionsHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/sessions');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-sessions', 'controller', 'default', '*', '1.0'));
    }
}
exports.SessionsHttpServiceV1 = SessionsHttpServiceV1;
//# sourceMappingURL=SessionsHttpServiceV1.js.map