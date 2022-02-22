const mongoose = require('../db')();
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
autoIncrement.initialize(mongoose);

const ShareSchema = new Schema({
    result: {type: Schema.Types.ObjectId, ref: 'Result', required: true}, 
    quizz: {type: Schema.Types.ObjectId, ref: 'Quizz', required: true},
});

ShareSchema.plugin(autoIncrement.plugin, 'Share');
module.exports = mongoose.model('Share', ShareSchema);
