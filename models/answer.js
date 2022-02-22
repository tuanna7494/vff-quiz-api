const mongoose = require('../db')();
const Schema = mongoose.Schema;
require('dotenv').config();
const HOST_URL = `${process.env.APP_EXTERNAL_URL}/uploads/`;

const AnwserSchema = new Schema({
    title: {type: String, default: ''},
    thumbnail: {type: String, default: ''},
    type: {type: String, enum: ['text', 'image'], default: 'text'},
    result: {type: mongoose.Schema.Types.ObjectId, ref: 'Result', require: true},
});

// AnwserSchema.post("find", function(doc, next) {
//     doc.forEach(function(item) {
//         if (item.thumbnail !== '') {
//             item.thumbnail = HOST_URL + item.thumbnail;
//         }
//     });
//     next();
// })

module.exports = mongoose.model('Answer', AnwserSchema);