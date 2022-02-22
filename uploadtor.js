const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = 'uploads';
        fs.exists(dir, function(exists) {
            if (exists) {
                cb(null, 'uploads/');
            } else {
                fs.mkdir(dir, function(err) {
                    if (!err) {
                        cb(null, 'uploads/');
                    } else {
                        console.log("error when make new dir")
                    }
                   
                })
            }
        })
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({storage: storage});
