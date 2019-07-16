let _ = require('lodash');
let services = require('../../../../src/protos/sessions_v1_grpc_pb');
let messages = require('../../../../src/protos/sessions_v1_pb');

import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { SessionV1 } from '../../data/version1/SessionV1';
import { SessionV1Schema } from '../../data/version1/SessionV1Schema';
import { ISessionsController } from '../../logic/ISessionsController';
import { SessionsGrpcConverterV1 } from './SessionsGrpcConverterV1';

export class SessionsGrpcServiceV1 extends GrpcService {
    private _controller: ISessionsController;
	
    public constructor() {
        super(services.SessionsService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-sessions", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<ISessionsController>('controller');
    }
    
    private getSessions(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        SessionsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = SessionsGrpcConverterV1.toPagingParams(call.request.getPaging());

        this._controller.getSessions(
            correlationId,
            filter,
            paging,
            (err, result) => {
                let error = SessionsGrpcConverterV1.fromError(err);
                let page = err == null ? SessionsGrpcConverterV1.fromSessionPage(result) : null;

                let response = new messages.SessionPageReply();
                response.setError(error);
                response.setPage(page);

                callback(err, response);
            }
        );
    }

    private getSessionById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();

        this._controller.getSessionById(
            correlationId,
            sessionId,
            (err, result) => {
                let error = SessionsGrpcConverterV1.fromError(err);
                let session = err == null ? SessionsGrpcConverterV1.fromSession(result) : null;

                let response = new messages.SessionObjectReply();
                response.setError(error);
                response.setSession(session);

                callback(err, response);
            }
        );
    }

    private openSession(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let userId = call.request.getUserId();
        let userName = call.request.getUserName();
        let address = call.request.getAddress();
        let client = call.request.getClient();
        let user = SessionsGrpcConverterV1.fromJson(call.request.getUser());
        let data = SessionsGrpcConverterV1.fromJson(call.request.getData());

        this._controller.openSession(
            correlationId, userId, userName, address, client, user, data,
            (err, result) => {
                let error = SessionsGrpcConverterV1.fromError(err);
                let session = err == null ? SessionsGrpcConverterV1.fromSession(result) : null;

                let response = new messages.SessionObjectReply();
                response.setError(error);
                if (result)
                    response.setSession(session);

                callback(err, response);
            }
        );
    }

    private storeSessionData(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();
        let data = SessionsGrpcConverterV1.fromJson(call.request.getData());

        this._controller.storeSessionData(
            correlationId, sessionId, data,
            (err, result) => {
                let error = SessionsGrpcConverterV1.fromError(err);
                let session = err == null ? SessionsGrpcConverterV1.fromSession(result) : null;

                let response = new messages.SessionObjectReply();
                response.setError(error);
                if (result)
                    response.setSession(session);

                callback(err, response);
            }
        );
    }

    private updateSessionUser(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();
        let user = SessionsGrpcConverterV1.fromJson(call.request.getUser());

        this._controller.updateSessionUser(
            correlationId, sessionId, user,
            (err, result) => {
                let error = SessionsGrpcConverterV1.fromError(err);
                let session = err == null ? SessionsGrpcConverterV1.fromSession(result) : null;

                let response = new messages.SessionObjectReply();
                response.setError(error);
                if (result)
                    response.setSession(session);

                callback(err, response);
            }
        );
    }
    
    private closeSession(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();

        this._controller.closeSession(
            correlationId,
            sessionId,
            (err, result) => {
                let error = SessionsGrpcConverterV1.fromError(err);
                let session = err == null ? SessionsGrpcConverterV1.fromSession(result) : null;

                let response = new messages.SessionObjectReply();
                response.setError(error);
                if (result)
                    response.setSession(session);

                callback(err, response);
            }
        );
    }    

    private closeExpiredSessions(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();

        this._controller.closeExpiredSessions(
            correlationId,
            (err) => {
                let error = SessionsGrpcConverterV1.fromError(err);

                let response = new messages.SessionEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }    

    private deleteSessionById(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let sessionId = call.request.getSessionId();

        this._controller.deleteSessionById(
            correlationId,
            sessionId,
            (err, result) => {
                let error = SessionsGrpcConverterV1.fromError(err);
                let session = err == null ? SessionsGrpcConverterV1.fromSession(result) : null;

                let response = new messages.SessionObjectReply();
                response.setError(error);
                if (result)
                    response.setSession(session);

                callback(err, response);
            }
        );
    }    
        
    public register() {
        this.registerMethod(
            'get_sessions', 
            null,
            this.getSessions
        );

        this.registerMethod(
            'get_session_by_id', 
            null,
            this.getSessionById
        );

        this.registerMethod(
            'open_session', 
            null,
            this.openSession
        );

        this.registerMethod(
            'store_session_data', 
            null,
            this.storeSessionData
        );

        this.registerMethod(
            'update_session_user', 
            null,
            this.updateSessionUser
        );

        this.registerMethod(
            'close_session', 
            null,
            this.closeSession
        );

        this.registerMethod(
            'close_expired_sessions', 
            null,
            this.closeExpiredSessions
        );

        this.registerMethod(
            'delete_session_by_id',
            null, 
            this.deleteSessionById
        );
    }
}
