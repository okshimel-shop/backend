const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: path.join(__dirname + "../../../tmp"),
  filename: (req, file, cb) => {

    const type = file.mimetype

    if (type === 'image/jpeg') {
      cb(null, shortid.generate() + '.jpg');
    }
  },
});

exports.upload = multer({ storage });
