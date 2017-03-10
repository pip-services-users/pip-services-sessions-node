import { CommandSet } from 'pip-services-runtime-node';
import { ICommand } from 'pip-services-runtime-node';
import { Command } from 'pip-services-runtime-node';
import { Schema } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { ISessionsBusinessLogic } from './ISessionsBusinessLogic';

export class SessionsCommandSet extends CommandSet {
    private _logic: ISessionsBusinessLogic;

    constructor(logic: ISessionsBusinessLogic) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetSessionsCommand());
		this.addCommand(this.makeLoadSessionCommand());
		this.addCommand(this.makeOpenSessionCommand());
		this.addCommand(this.makeStoreSessionDataCommand());
		this.addCommand(this.makeCloseSessionCommand());
		this.addCommand(this.makeDeleteSessionCommand());
    }

	private makeGetSessionsCommand(): ICommand {
		return new Command(
			this._logic,
			"get_sessions",
			new Schema()
				.withProperty("user_id", "string")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                this._logic.getSessions(correlationId, userId, callback);
            }
		);
	}

	private makeLoadSessionCommand(): ICommand {
		return new Command(
			this._logic,
			"load_session",
			new Schema()
				.withProperty("user_id", "string")
				.withProperty("session_id", "string")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let sessionId = args.getNullableString("session_id");
                this._logic.loadSession(correlationId, userId, sessionId, callback);
            }
		);
	}

	private makeOpenSessionCommand(): ICommand {
		return new Command(
			this._logic,
			"open_session",
			new Schema()
				.withProperty("user", "object")
				.withProperty("address", "string")
				.withProperty("client", "string")
				.withOptionalProperty("data", "any")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let user = args.get("user");
                let address = args.getNullableString("address");
                let client = args.getNullableString("client");
                let data = args.get("data");
                this._logic.openSession(correlationId, user, address, client, data, callback);
            }
		);
	}

	private makeStoreSessionDataCommand(): ICommand {
		return new Command(
			this._logic,
			"store_session_data",
			new Schema()
				.withProperty("user_id", "string")
				.withProperty("session_id", "string")
				.withOptionalProperty("data", "any")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let sessionId = args.getNullableString("session_id");
                let data = args.get("data");
                this._logic.storeSessionData(correlationId, userId, sessionId, data, callback);
            }
		);
	}

	private makeCloseSessionCommand(): ICommand {
		return new Command(
			this._logic,
			"close_session",
			new Schema()
				.withProperty("user_id", "string")
				.withProperty("address", "string")
				.withProperty("client", "string")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let address = args.getNullableString("address");
                let client = args.getNullableString("client");
                this._logic.closeSession(correlationId, userId, address, client, callback);
            }
		);
	}
    
	private makeDeleteSessionCommand(): ICommand {
		return new Command(
			this._logic,
			"delete_session",
			new Schema()
				.withProperty("user_id", "string")
				.withProperty("session_id", "string")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let sessionId = args.getNullableString("session_id");
                this._logic.deleteSession(correlationId, userId, sessionId, callback);
            }
		);
	}

}