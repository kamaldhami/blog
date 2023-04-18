const multer = require("multer");
const fs = require('fs');
const path = require('path');

var storage = multer.diskStorage({
    destination: "./public",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage });


module.exports = upload