let _ = require('lodash');

export class SessionsHandler {
    private _sessionTimeout;
    
    constructor(config: any) {
        config = _.defaultsDeep(config, {
           sessionTimeout: 24 * 3600000, // 24 hours
        });
        
        this._sessionTimeout = config.sessionTimeout;
    }

    public findSession(userSessions, sessionId) {
        if (userSessions.sessions == null || userSessions.sessions.length == 0)
            return null;
            
        // Find a specified session by its id
        for (let i = 0; i < userSessions.sessions.length; i++) {
            let thisSession = userSessions.sessions[i];
            let thisSessionId = thisSession._id || thisSession.id;

            if (sessionId == thisSessionId)
                return thisSession;
        }
        
        return null;
    };

    public cleanupSessions(userSessions) {
        // Skip if there are not sessions
        if (userSessions.sessions == null || userSessions.sessions.length == 0)
            return;

        let currentTime = new Date().getTime();

        for (let i = 0; i < userSessions.sessions.length; i++) {
            let thisSession = userSessions.sessions[i];
            let lastRequest:Date = thisSession.last_request;
            let thisSessionTimeout = currentTime - lastRequest.getTime();

            if (thisSession == null || thisSessionTimeout > this._sessionTimeout) {
                userSessions.sessions.splice(i, 1);
                i--;
            }
        }
        
        if (userSessions.sessions.length == 0)
            userSessions.last_request = null;
    }

    public addSession(userSessions, address, client) {        
        this.cleanupSessions(userSessions);

        // Skip if request is empty
        if (address == null || client == null) return;

        userSessions.sessions = userSessions.sessions || [];

        let session;
        for (let i = 0; i < userSessions.sessions.length; i++) {
            session = userSessions.sessions[i];
            if (session != null
                && session.address == address
                && session.client == client) {
                session.last_request = new Date();
                return session;
            }
        }

        let currentTime = new Date();
        
        // Update last session and request timing
        userSessions.last_session = currentTime;
        userSessions.last_request = currentTime;

        // Create and add a new session
        session = {
            opened: currentTime,
            last_request: currentTime,
            address: address,
            client: client
        };
	    userSessions.sessions.push(session);
        session = userSessions.sessions[userSessions.sessions.length - 1];

	    return session;
    }

    private removeSession(userSessions, address, client) {
        this.cleanupSessions(userSessions);

        // Skip if request is empty
        if (address == null || client == null) return;

        userSessions.sessions = userSessions.sessions || [];
        var removedSession = null;

        for (let i = 0; i < userSessions.sessions.length; i++) {
            let thisSession = userSessions.sessions[i];
            if (thisSession != null
                && thisSession.address == address
                && thisSession.client == client) {
                userSessions.sessions.splice(i, 1);
                removedSession = thisSession;
            }
        }
        
        // Clear last request to define that there are no active sessions
        if (userSessions.sessions.length == 0)
            userSessions.last_request = null;
            
        return removedSession;
    }

}
