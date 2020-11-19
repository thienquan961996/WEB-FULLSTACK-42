const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema({
   
       players: [String],
       scores:{
           type: [[Number]],
           defaul: [[0,0,0,0]]
       } 
 
});

const GameModel = mongoose.model('game', GameSchema);
module.exports = GameModel;