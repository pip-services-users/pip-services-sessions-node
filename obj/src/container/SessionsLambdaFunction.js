"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const SessionsServiceFactory_1 = require("../build/SessionsServiceFactory");
class SessionsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("sessions", "User sessions function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-sessions', 'controller', 'default', '*', '*'));
        this._factories.add(new SessionsServiceFactory_1.SessionsServiceFactory());
    }
}
exports.SessionsLambdaFunction = SessionsLambdaFunction;
exports.handler = new SessionsLambdaFunction().getHandler();
//# sourceMappingURL=SessionsLambdaFunction.js.map