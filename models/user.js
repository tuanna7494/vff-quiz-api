const mongoose = require('../db')();
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
require('dotenv').config();
const HOST_URL = `${process.env.APP_HOST}:${process.env.APP_PORT}/uploads/`;

const UserSchema = new Schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    first_name: {type: String, require: true},
    last_name: {type: String, require: true},
    avatar: {type: String, default: ''},
    role: {type: String, enum: ['admin', 'user'], default: 'user'}
});

// UserSchema.post("find", function(doc, next) {
//   doc.forEach(function(item) {
//       if (item.avatar != '') {
//           item.avatar = HOST_URL + item.avatar;
//       }
//   });
//   next();
// })


UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} password
     * @return {Boolean}
     * @api public
     */
  
    authenticate: function(password) {
      return bcrypt.compareSync(password, this.password);
    },
  
    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
  
    encryptPassword: function(password) {
      if (!password) return '';
      try {
        return bcrypt.hashSync(password, 10);
      } catch (err) {
        return '';
      }
    },
  
    /**
     * Validation is not required if using OAuth
     */
  
    skipValidation: function() {
      return ~oAuthTypes.indexOf(this.provider);
    }
};

  
module.exports = mongoose.model('User', UserSchema);