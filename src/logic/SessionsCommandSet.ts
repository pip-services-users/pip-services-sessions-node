import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { ISessionsBusinessLogic } from './ISessionsBusinessLogic';

export class SessionsCommandSet extends CommandSet {
    private _logic: ISessionsBusinessLogic;

    constructor(logic: ISessionsBusinessLogic) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetSessionsCommand());
		this.addCommand(this.makeGetSessionByIdCommand());
		this.addCommand(this.makeOpenSessionCommand());
		this.addCommand(this.makeStoreSessionDataCommand());
		this.addCommand(this.makeCloseSessionCommand());
		this.addCommand(this.makeDeleteSessionByIdCommand());
    }

	private makeGetSessionsCommand(): ICommand {
		return new Command(
			"get_sessions",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getSessions(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetSessionByIdCommand(): ICommand {
		return new Command(
			"get_session_by_id",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let sessionId = args.getAsNullableString("session_id");
                this._logic.getSessionById(correlationId, sessionId, callback);
            }
		);
	}

	private makeOpenSessionCommand(): ICommand {
		return new Command(
			"open_session",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let userId = args.getAsNullableString("user_id");
                let userName = args.getAsNullableString("user_name");
                let address = args.getAsNullableString("address");
                let client = args.getAsNullableString("client");
                let user = args.get("user");
                let data = args.get("data");
                this._logic.openSession(correlationId, userId, userName, address, client, user, data, callback);
            }
		);
	}

	private makeStoreSessionDataCommand(): ICommand {
		return new Command(
			"store_session_data",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let sessionId = args.getAsNullableString("session_id");
                let data = args.get("data");
                this._logic.storeSessionData(correlationId, sessionId, data, callback);
            }
		);
	}

	private makeCloseSessionCommand(): ICommand {
		return new Command(
			"close_session",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let sessionId = args.getAsNullableString("session_id");
                this._logic.closeSession(correlationId, sessionId, callback);
            }
		);
	}
    
	private makeDeleteSessionByIdCommand(): ICommand {
		return new Command(
			"delete_session_by_id",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let sessionId = args.getAsNullableString("session_id");
                this._logic.deleteSessionById(correlationId, sessionId, callback);
            }
		);
	}

}