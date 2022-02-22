const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require("bcrypt");
const Utils = require('../utils');

module.exports = {
    login: async function(email, password) {
        let userCache = await User.findOne({email: email});
        if (!userCache) {
            return false
        };

        let isAuthenticated = userCache.authenticate(password);
        if (isAuthenticated) {
            return userCache;
        } else {
            return false;
        }
    },

    register: async function(user) {
        let userCache = await User.findOne({email: user.email});
        console.log(userCache)
        if (userCache) {
            return false;
        } else {
            let newUser = new User(user);
            newUser.password = newUser.encryptPassword(user.password);
            await newUser.save();
            newUser = Utils.removeListFieldObj(newUser._doc, ['password']);
            return newUser;
        }
    },
    
    getAllUser: function() {
        return User.find().select("-password");
    },

    deleteUser: function(userId) {
        return new Promise(function(resolve, reject) {
            User.deleteOne({_id: userId}, function(err) {
                if (!err) {
                    resolve()
                } else {
                    reject(err)
                }
            })
        })
    },

    getUser: function(userId) {
        return User.findOne({_id: userId}).select("-password");
    },
    
    updateUser: async function(userId, data) {
        let password = data.password;
        let updateUser = data;
        if (password != undefined && password != "") {
            password = bcrypt.hashSync(password, 10);
            updateUser = Object.assign({}, data, {password: password});
        } 
        const updatedUser = await User.updateOne({_id: userId}, updateUser, {new: true});
        return this.getUser(userId);
    }
}