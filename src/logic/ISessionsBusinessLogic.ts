import { IBusinessLogic } from 'pip-services-runtime-node';

export interface ISessionsBusinessLogic extends IBusinessLogic {
    getSessions(correlationId: string, userId: string, callback: any): void;
    loadSession(correlationId: string, userId: string, sessionId: string, callback: any): void;
    openSession(correlationId: string, user: any, address: string, client: string, data: any, callback: any): void;
    storeSessionData(correlationId: string, userId: string, sessionId: string, data: any, callback: any): void;
    closeSession(correlationId: string, userId: string, address: string, client: string, callback: any): void;
    deleteSession(correlationId: string, userId: string, sessionId: string, callback: any): void;
}
