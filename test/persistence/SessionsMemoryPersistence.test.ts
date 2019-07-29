import { SessionsMemoryPersistence } from '../../src/persistence/SessionsMemoryPersistence';
import { SessionsPersistenceFixture } from './SessionsPersistenceFixture';

suite('SessionsMemoryPersistence', ()=> {
    let persistence: SessionsMemoryPersistence;
    let fixture: SessionsPersistenceFixture;
    
    setup((done) => {
        persistence = new SessionsMemoryPersistence();
        fixture = new SessionsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Close Expired', (done) => {
        fixture.testCloseExpired(done);
    });

});