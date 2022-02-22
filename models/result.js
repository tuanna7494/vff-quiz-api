const mongoose = require('../db')();
const Schema = mongoose.Schema;
require('dotenv').config();
const HOST_URL = `${process.env.APP_EXTERNAL_URL}/uploads/`;

const ResultSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    thumbnail: {type: String, default: ''},
});

// ResultSchema.post("find", function(doc, next) {
//     doc.forEach(function(item) {
//         if (item.thumbnail !== '') {
//             item.thumbnail = HOST_URL + item.thumbnail;
//         }
//     });
//     next();
// })

module.exports = mongoose.model('Result', ResultSchema);