let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { SessionsFilePersistence } from './SessionsFilePersistence';
import { ISessionsPersistence } from './ISessionsPersistence';

export class SessionsMemoryPersistence extends SessionsFilePersistence implements ISessionsPersistence {
	/**
	 * Unique descriptor for the SessionsMemoryPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-sessions", "memory", "*"
	);

    constructor() {
        super(SessionsMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }
}
