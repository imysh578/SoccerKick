const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const fs = require("fs");
const aws = require("aws-sdk");

aws.config.loadFromPath(__dirname + "/../config/awsconfig.json");

const bucket = "arn:aws:s3:ap-northeast-2:864694562519:accesspoint/jadu";
const s3 = new aws.S3();
const upload = multer(
	{
		storage: multerS3({
			s3: s3,
			bucket: bucket,
			acl: "public-read",
			key: function (req, file, cb) {
				const extension = path.extname(file.originalname);
				const basename = path.basename(file.originalname, extension);
				cb(null, basename + "-" + Date.now() + extension);
				// cb(null, Date.now() + "." + file.originalname.split(".").pop()); // 이름 설정
			},
		}),
	},
	"NONE"
);

module.exports = { upload, bucket };
