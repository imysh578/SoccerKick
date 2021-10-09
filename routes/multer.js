require("dotenv").config();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads");
	},
	filename: function (req, file, cb) {
		const extension = path.extname(file.originalname);
		const basename = path.basename(file.originalname, extension);
		cb(null, basename + "-" + Date.now() + extension);
	},
});

upload = multer({ storage: storage });

module.exports = upload;
