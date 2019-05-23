var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({

    username: {type: String},

    score: {type: Number},

    
});

module.exports = mongoose.model('Player', playerSchema)