import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { SessionsFilePersistence } from '../../src/persistence/SessionsFilePersistence';
import { SessionsPersistenceFixture } from './SessionsPersistenceFixture';

let config = ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/sessions.test.json',
        data: []
    }
});

suite('SessionsFilePersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new SessionsFilePersistence();
        db.configure(config);

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