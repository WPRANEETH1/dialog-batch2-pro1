
const TaskSchema = require('../models/Task')
const UserSchema = require('../models/User')
module.exports = {
    // Connect/Disconnect middleware
    connectDisconnect: (req, res, next) => {
        // Create connection using Mongo Lab URL
        // available in Webtask context
        var connection = mongoose.createConnection('mongodb://root:root@ds153577.mlab.com:53577/tasks');
        // Create a mongoose model using the Schema
        req.TaskModel = connection.model('Task', TaskSchema);
        req.UserModel = connection.model('User', UserSchema);
        req.on('end', () => {
            // Disconnect when request
            // processing is completed
            mongoose.connection.close();
        })
        // Call next to move to
        // the next Express middleware
        next()
    },
}