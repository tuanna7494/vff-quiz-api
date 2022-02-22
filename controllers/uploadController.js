require("dotenv").config();
const HOST_URL = `${process.env.APP_EXTERNAL_URL}`;

module.exports = {
    upload: function(req, res) {
        const thumbnail = req.file;
        if (!thumbnail) {
            return res.status(400).send({
                status: 0,
                message: "No file uploaded",
                data: {}
            });
        } else {
            return res.status(200).send({
                status: 1,
                message: "File upload successfully",
                data: {
                    fieldname: thumbnail.fieldname,
                    originalname: thumbnail.originalname,
                    encoding: thumbnail.encoding,
                    mimetype: thumbnail.mimetype,
                    destination: thumbnail.destination,
                    filename: thumbnail.filename,
                    path: `${HOST_URL}/${thumbnail.path}`,
                    size: thumbnail.size
                }
            });
        }
    }
}