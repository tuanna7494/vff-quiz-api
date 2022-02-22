const mongoose = require('../db')();
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
   role: String,
   note: String
});

module.exports = mongoose.model('Role', RoleSchema);