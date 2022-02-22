const mongoose = require('../db')();
const Schema = mongoose.Schema;
require('dotenv').config();
const HOST_URL = `${process.env.APP_EXTERNAL_URL}/uploads/`;

const QuizzSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    slug: {type: String, default: '', unique: true},
    thumbnail: {type: String, default: ''},
    enabled: {type: Boolean, default: true},
    data_ads_client: {type: String, default: ''},
    data_ads_slot: {type: String, default: ''},
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    results: [{type: mongoose.Schema.Types.ObjectId, ref: 'Result'}], 
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sequence: {type: Number, default: 0},
});

// QuizzSchema.post("find", function(doc, next) {
//     doc.forEach(function(item) {
//         if (item.thumbnail !== '') {
//             item.thumbnail = HOST_URL + item.thumbnail;
//         }
//     });
//     next();
// })

module.exports = mongoose.model('Quizz', QuizzSchema);