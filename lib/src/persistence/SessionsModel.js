var mongoose = require('mongoose'), Schema = mongoose.Schema, Mixed = Schema.Types.Mixed;
var SessionSchema = new Schema({
    /* Identification */
    _id: { type: String, unique: true },
    /* Content */
    opened: { type: Date, required: true, 'default': Date.now },
    last_request: { type: Date, required: true, 'default': Date.now },
    address: { type: String, required: true },
    client: { type: String, required: false },
    data: { type: Mixed, required: false }
});
SessionSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
var SessionsSchema = new Schema({
    /* Identification */
    _id: { type: String, unique: true },
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    /* Activity tracking */
    first_session: { type: Date, required: true, 'default': Date.now },
    last_session: { type: Date, required: true, 'default': Date.now },
    last_request: { type: Date, required: false },
    sessions: { type: [SessionSchema], required: false },
    /* User reference */
    user: { type: Mixed, required: false }
}, {
    collection: 'sessions',
    autoIndex: true,
    strict: true
});
SessionsSchema.set('toJSON', {
    transform: function (doc, ret) {
        //ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        //var session = ret.sessions[ret.sessions.length - 1];
        //ret.last_session_id = (session == undefined ? '' : session.id.toString());
        //delete ret.sessions;
        return ret;
    }
});
module.exports = function (connection) {
    return connection.model('Sessions', SessionsSchema);
};
