import { YamlConfigReader } from 'pip-services-commons-node';

import { SessionsMongoDbPersistence } from '../../src/persistence/SessionsMongoDbPersistence';
import { SessionsPersistenceFixture } from './SessionsPersistenceFixture';

suite('SessionsMongoDbPersistence', ()=> {
    let persistence: SessionsMongoDbPersistence;
    let fixture: SessionsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new SessionsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new SessionsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});