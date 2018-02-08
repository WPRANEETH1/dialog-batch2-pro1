var Mongoose = require('mongoose');

var model =  new Mongoose.Schema({
    user:{type: Mongoose.Schema.Types.ObjectId, ref: 'User'},
    title:String,
    description:String,
    subTasks:[ { type:String}],
    id:Mongoose.Schema.ObjectId
});

// module.exports = Mongoose.model('Task',model);
module.exports = model;