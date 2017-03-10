let _ = require('lodash');


import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { BadRequestError } from 'pip-services-runtime-node';
import { NotFoundError } from 'pip-services-runtime-node';

import { ISessionsPersistence } from './ISessionsPersistence';
import { SessionsHandler } from './SessionsHandler';

export class SessionsMongoDbPersistence extends MongoDbPersistence implements ISessionsPersistence {
	/**
	 * Unique descriptor for the SessionsMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-sessions", "mongodb", "*"
	);

    private _handler
    
    constructor() {
        super(SessionsMongoDbPersistence.Descriptor, require('./SessionsModel'));
    }
        
    public configure(config: ComponentConfig) {
        super.configure(config);

        this._handler = new SessionsHandler(config.getOptions());
    }
        
    public getSessions(correlationId: string, userId: string, callback) {
        this.getById(
            userId,
            (err, item) => {
                if (err || item == null) {
                    callback(err, null);
                    return;
                }

                var sessions = _.map(item.sessions, this.jsonToPublic);
                callback(null, sessions);
            }
        );
    }

    public loadSession(correlationId: string, userId: string, sessionId: string, callback) {
        this._model.findById(
            userId,
            (err, item) => {
                if (err || item == null) {
                    callback(err);
                    return;
                }

                let session = this._handler.findSession(item, sessionId);

                if (session == null) {
                    callback(null, null);
                    return;
                }

                // Update session time and save async
                session.last_request = new Date();
                item.last_request = session.last_request;
                item.save((err) => {
                    if (err) this.error('Failed to save user session', err);
                });

                // Return loaded session together with saved user object
                session = this.jsonToPublic(session);
                session.user = item.user;
                                        
                callback(null, session);
            }
        );
    }

    public openSession(correlationId: string, user: any, address: string, client: string, data: any, callback) {
        let currentTime = new Date();

        if (user == null) {
            callback(new BadRequestError(this, 'NoUser', 'User is not defined'));
            return;
        }

        if (user.id == null) {
            callback(new BadRequestError(this, 'NoUserId', 'User id is not defined'));
            return;
        }
        
        if (address == null) {
            callback(new BadRequestError(this, 'NoAddress', 'User client address is not defined'));
            return;
        }
        
        if (client == null) {
            callback(new BadRequestError(this, 'NoClient', 'User client app is not defined'));
            return;
        }

        this._model.findById(
            user.id,
            (err, item) => {
                if (err) {
                    callback(err);
                    return;
                }
                            
                // Create a new sessions object
                if (item == null) {
                    item = new this._model({
                        _id: user.id,
                        user_id: user.id,
                        first_session: currentTime
                    });
                }
                
                // Update user name and user object to the last one
                item.user_name = user.name;
                item.user = user;

                // Add a new session
                let session = this._handler.addSession(item, address, client);

                if (data) 
                    session.data = data;

                if (session._id == null)
                    session._id = this.createUuid();

                // Save session object
                item.save((err) => {
                    if (err) 
                        callback(err);
                    else {                
                        // Return the opened session
                        session = this.jsonToPublic(session);
                        callback(err, session);
                    }
                });            
            }
        );
    }

    public storeSessionData(correlationId: string, userId: string, sessionId: string, data: any, callback) {        
        this._model.findById(
            userId,
            (err, item) => {
                if (err || item == null) {
                    callback(err);
                    return;
                }

                let session = this._handler.findSession(item, sessionId);

                if (session == null) {
                    callback(new NotFoundError(this, 'SessionNotFound', 'Session was not found').withDetails(sessionId));
                    return;
                }

                session.data = data;
                item.save(callback);
            }
        );
    }

    public closeSession(correlationId: string, userId: string, address: string, client: string, callback) {
        this._model.findById(
            userId,
            (err, item) => {
                if (err || item == null) {
                    if (callback) callback(err);
                    return;
                }

                // Close session and save user
                let session = this._handler.removeSession(item, address, client);

                item.save(callback);
            }
        );
    }

    public deleteSession(correlationId: string, userId: string, sessionId: string, callback) {
        this._model.findById(
            userId,
            (err, item) => {
                if (err || item == null || item.sessions == null) {
                    callback(err);
                    return;
                }

                let session = this._handler.findSession(item, sessionId);

                if (session == null) {
                    callback(null, null);
                    return;
                }

                session.remove();
                item.save(callback);
            }
        );
    }
        
}
