var Mongoose = require('mongoose');

// module.exports = Mongoose.model('User', new Mongoose.Schema({
//     username:String,
//     email:String,
//     id:Mongoose.Schema.ObjectId
// }));

module.exports =  new Mongoose.Schema({
        username:String,
        email:String,
        id:Mongoose.Schema.ObjectId
    })