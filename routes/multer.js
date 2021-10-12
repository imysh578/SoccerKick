require("dotenv").config();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const extension = path.extname(file.originalname);
		if (extension == ".png" || extension == ".jpeg" || extension == ".jpg") {
			cb(null, "public/uploads");
		} else {
			console.log("업로드 실패!! PNG, JPEG, JPG 파일 형식만 가능합니다.");
		}
	},
	filename: function (req, file, cb) {
		const extension = path.extname(file.originalname);
		const basename = path.basename(file.originalname, extension);
		cb(null, basename + "-" + Date.now() + extension);
	},
});

upload = multer({
	storage: storage,
	// limits: {
	// 	fileSize: 1000, //size of u file
	// },
});

module.exports = upload;
