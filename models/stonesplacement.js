const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stonePlacementSchema = new Schema({
  'match1': {
    type: Array,
    required: true
  },
  'turn': {
    type: Number
  },
  'win': {
    type: Number,
    required: true
  }
});

//setup model with Schema and collection name
//In order to access collection with variable StonePlacement
const StonePlacement = mongoose.model('StonePlacement', stonePlacementSchema);
module.exports = StonePlacement;