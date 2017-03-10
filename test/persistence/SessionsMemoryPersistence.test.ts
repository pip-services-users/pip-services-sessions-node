import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { SessionsMemoryPersistence } from '../../src/persistence/SessionsMemoryPersistence';
import { SessionsPersistenceFixture } from './SessionsPersistenceFixture';

suite('SessionsFilePersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new SessionsMemoryPersistence();
        db.configure(new ComponentConfig());
        
        fixture = new SessionsPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done);
    });
    
    teardown((done) => {
        db.close(done);
    });
        
    test('Open Session', (done) => {
        fixture.testOpenSession(done);
    });

    test('Close Session', (done) => {
        fixture.testCloseSession(done);
    });

});