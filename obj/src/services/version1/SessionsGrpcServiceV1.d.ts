import { IReferences } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';
export declare class SessionsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getSessions(call, callback);
    private getSessionById(call, callback);
    private openSession(call, callback);
    private storeSessionData(call, callback);
    private updateSessionUser(call, callback);
    private closeSession(call, callback);
    private closeExpiredSessions(call, callback);
    private deleteSessionById(call, callback);
    register(): void;
}
