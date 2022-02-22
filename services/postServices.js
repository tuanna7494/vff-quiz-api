const User = require('../models/user');
const Category = require('../models/category');
const Post = require('../models/post')
const Utils = require('../utils/index')

module.exports = {
    getAllPosts: function() {
        return Post.find().populate('category').populate('author')
        .then(data => {
            const responseNoPassword = data.map(post => {
                const cloneObj = post.toObject();
                delete cloneObj.author.password;
                return cloneObj;
            });

            return Promise.resolve(responseNoPassword)
        })
    },
    updatePost: function(postId, data) {
        return Post.findOne({_id: postId})
        .then(post => {
            return new Promise(function(res, rej) {
                post.updateOne(data, function(err, resp) {
                    if (err) {
                        rej(err)
                    } else {
                        res()
                    }
                })
            })
        })
    },

    createPost: function(data) {
        return new Promise(function(res, rej) {
            Post.create(data, function(err) {
                if (err) {
                    rej(err)
                } else {
                    res()
                }
            })
        });
    },
    deletePost: function (postId) {
        return new Promise(function(res, rej) {
            Post.deleteOne({_id: postId}, function(err) {
                if (err) {
                    rej(err)
                } else {
                    res()
                }
            })
        });
    }
}