import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { ISessionsController } from './ISessionsController';

export class SessionsCommandSet extends CommandSet {
    private _logic: ISessionsController;

    constructor(logic: ISessionsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetSessionsCommand());
		this.addCommand(this.makeGetSessionByIdCommand());
		this.addCommand(this.makeOpenSessionCommand());
		this.addCommand(this.makeStoreSessionDataCommand());
		this.addCommand(this.makeUpdateSessionUserCommand());
		this.addCommand(this.makeCloseSessionCommand());
		this.addCommand(this.makeCloseExpiredSessionsCommand());
		this.addCommand(this.makeDeleteSessionByIdCommand());
    }

	private makeGetSessionsCommand(): ICommand {
		return new Command(
			"get_sessions",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
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
			new ObjectSchema(true)
				.withRequiredProperty('session_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let sessionId = args.getAsNullableString("session_id");
                this._logic.getSessionById(correlationId, sessionId, callback);
            }
		);
	}

	private makeOpenSessionCommand(): ICommand {
		return new Command(
			"open_session",
			new ObjectSchema(true)
				.withRequiredProperty('user_id', TypeCode.String)
				.withOptionalProperty('user_name', TypeCode.String)
				.withOptionalProperty('address', TypeCode.String)
				.withOptionalProperty('client', TypeCode.String)
				.withOptionalProperty('user', null)
				.withOptionalProperty('data', null),
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
			new ObjectSchema(true)
				.withRequiredProperty('session_id', TypeCode.String)
				.withRequiredProperty('data', null),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let sessionId = args.getAsNullableString("session_id");
                let data = args.get("data");
                this._logic.storeSessionData(correlationId, sessionId, data, callback);
            }
		);
	}

	private makeUpdateSessionUserCommand(): ICommand {
		return new Command(
			"update_session_user",
			new ObjectSchema(true)
				.withRequiredProperty('session_id', TypeCode.String)
				.withRequiredProperty('user', null),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let sessionId = args.getAsNullableString("session_id");
                let user = args.get("user");
                this._logic.updateSessionUser(correlationId, sessionId, user, callback);
            }
		);
	}

	private makeCloseSessionCommand(): ICommand {
		return new Command(
			"close_session",
			new ObjectSchema(true)
				.withRequiredProperty('session_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let sessionId = args.getAsNullableString("session_id");
                this._logic.closeSession(correlationId, sessionId, callback);
            }
		);
	}

	private makeCloseExpiredSessionsCommand(): ICommand {
		return new Command(
			"close_expired_sessions",
			new ObjectSchema(true),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                this._logic.closeExpiredSessions(correlationId, (err) => {
					callback(err, null);
				});
            }
		);
	}
	
	private makeDeleteSessionByIdCommand(): ICommand {
		return new Command(
			"delete_session_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('session_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let sessionId = args.getAsNullableString("session_id");
                this._logic.deleteSessionById(correlationId, sessionId, callback);
            }
		);
	}

}