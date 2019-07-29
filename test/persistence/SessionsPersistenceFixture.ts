let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { AnyValueMap } from 'pip-services3-commons-node';

import { ISessionsPersistence } from '../../src/persistence/ISessionsPersistence';
import { SessionV1 } from '../../src/data/version1/SessionV1';

let SESSION1: SessionV1 = new SessionV1(null, '1', 'User 1');
let SESSION2: SessionV1 = new SessionV1(null, '2', 'User 2');

export class SessionsPersistenceFixture {
    private _persistence: ISessionsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }
                
    public testCrudOperations(done) {
        let session1;
        let session2;

        async.series([
        // Create one session
            (callback) => {
                this._persistence.create(
                    null,
                    SESSION1,
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.id);
                        assert.isNotNull(session.open_time);
                        assert.isNotNull(session.request_time);
                        assert.equal(session.user_id, SESSION1.user_id);

                        session1 = session;

                        callback();
                    }
                );
            },
        // Create another session
            (callback) => {
                this._persistence.create(
                    null,
                    SESSION2,
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.isNotNull(session.id);
                        assert.isNotNull(session.open_time);
                        assert.isNotNull(session.request_time);
                        assert.equal(session.user_id, SESSION2.user_id);

                        session2 = session;

                        callback();
                    }
                );
            },
        // Partially update
            (callback) => {
                this._persistence.updatePartially(
                    null,
                    session1.id,
                    AnyValueMap.fromTuples(
                        "data", "123"
                    ),
                    (err, session) => {
                        assert.isNull(err);

                        assert.isObject(session);
                        assert.equal(session1.id, session.id);
                        assert.equal("123", session.data);

                        callback();
                    }
                );
            },
        // Get user sessions
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromTuples('user_id', '1'),
                    new PagingParams(),
                    (err, events) => {
                        assert.isNull(err);

                        assert.isObject(events);
                        assert.lengthOf(events.data, 1);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testCloseExpired(done) {
        this._persistence.closeExpired("", new Date(), done);
    }

}
