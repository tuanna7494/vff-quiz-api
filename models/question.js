const mongoose = require('../db')();
const Schema = mongoose.Schema;
require('dotenv').config();
const HOST_URL = `${process.env.APP_EXTERNAL_URL}/uploads`;

// const colorBgHex = ["#e32", "#e40c78", "#6645dd", "#0f65ef", "#007c7c", "#68af15", "#222"];
// const colorTextHex = ["#ffffff", "#222"]

const QuestionSchema = new Schema({
    title: {type: String, required: true},
    color_bg_hex: {type: String, required: true, default: '#e32'},
    color_text_hex: {type: String, required: true, default: '#ffffff'},
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
});


module.exports = mongoose.model('Question', QuestionSchema);