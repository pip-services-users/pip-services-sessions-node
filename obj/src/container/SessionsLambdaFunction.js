"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const SessionsFactory_1 = require("../build/SessionsFactory");
class SessionsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("sessions", "User sessions function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-sessions', 'controller', 'default', '*', '*'));
        this._factories.add(new SessionsFactory_1.SessionsFactory());
    }
}
exports.SessionsLambdaFunction = SessionsLambdaFunction;
exports.handler = new SessionsLambdaFunction().getHandler();
//# sourceMappingURL=SessionsLambdaFunction.js.map