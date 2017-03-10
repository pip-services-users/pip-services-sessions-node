let async = require('async');
let assert = require('chai').assert;

import { ISessionsPersistence } from '../../src/persistence/ISessionsPersistence';

let USER = {
    id: '123',
    name: 'Test User'
};

export class SessionsPersistenceFixture {
    private _db: ISessionsPersistence;
    
    constructor(db) {
        assert.isNotNull(db);
        this._db = db;
    }

    testOpenSession(done) {
        var session1;
        
        async.series([
        // Create a new session
            (callback) => {
                this._db.openSession(
                    null,
                    USER,
                    'localhost',
                    'test',
                    'abc',
                    (err, session) => {
                        assert.isNull(err);
                        
                        assert.isObject(session);
                        assert.isNotNull(session.id);
                        assert.isNotNull(session.last_request);
                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');
                        assert.equal(session.data, 'abc');

                        session1 = session;
                        
                        callback();
                    }
                );
            },
        // Store session data
            (callback) => {
                this._db.storeSessionData(
                    null,
                    USER.id,
                    session1.id,
                    'xyz',
                    (err) => {
                        assert.isNull(err);
                        
                        callback();
                    }
                );
            },
        // Open created session
            (callback) => {
                this._db.loadSession(
                    null,
                    USER.id,
                    session1.id,
                    (err, session) => {
                        assert.isNull(err);
                        
                        assert.isObject(session);
                        assert.equal(session.id, session1.id);
                        assert.isNotNull(session.last_request);
                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');
                        assert.equal(session.data, 'xyz');

                        assert.isDefined(session.user);
                        assert.equal(session.user.id, USER.id);
                        assert.equal(session.user.name, USER.name);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                this._db.getSessions(
                    null,
                    USER.id,
                    (err, sessions) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(sessions, 1);
                        var session = sessions[0];

                        assert.equal(session.address, 'localhost');
                        assert.equal(session.client, 'test');

                        callback();
                    }
                );
            }
        ], done);
    }

    testCloseSession(done) {
        async.series([
        // Create a new session
            (callback) => {
                this._db.openSession(
                    null,
                    USER,
                    'localhost',
                    'test',
                    null,
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.last_request);

                        callback();
                    }
                );
            },
        // Close session
            (callback) => {
                this._db.closeSession(
                    null,
                    USER.id,
                    'localhost',
                    'test',
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Get open sessions
            (callback) => {
                this._db.getSessions(
                    null,
                    USER.id,
                    (err, sessions) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(sessions, 0);

                        callback();
                    }
                );
            }
        ], done);
    }

}
