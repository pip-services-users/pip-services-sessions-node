import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let SessionsMongoDbSchema = function(collection?: string) {
    collection = collection || 'sessions';

    let schema = new Schema(
        {
            /* Identification */
            _id: { type: String },
            user_id: { type: String, required: true, index: true },
            user_name: { type: String, required: false },
            
            /* Session info */
            active: { type: Boolean, required: true, 'default': true},
            open_time: { type: Date, required: true, 'default': Date.now },
            close_time: { type: Date, required: false },
            request_time: { type: Date, required: true, 'default': Date.now },
            address: { type: String, required: false },
            client: { type: String, required: false },

            /* Cached content */
            user: { type: Mixed, required: false },
            data: { type: Mixed, required: false }
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;

            return ret;
        }
    });

    return schema;
}