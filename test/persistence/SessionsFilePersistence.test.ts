import { ConfigParams } from 'pip-services3-commons-node';

import { SessionsFilePersistence } from '../../src/persistence/SessionsFilePersistence';
import { SessionsPersistenceFixture } from './SessionsPersistenceFixture';

suite('SessionsFilePersistence', ()=> {
    let persistence: SessionsFilePersistence;
    let fixture: SessionsPersistenceFixture;
    
    setup((done) => {
        persistence = new SessionsFilePersistence('./data/sessions.test.json');

        fixture = new SessionsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});