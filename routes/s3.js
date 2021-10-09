const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const fs = require("fs");
const aws = require("aws-sdk");

aws.config.loadFromPath(__dirname + "/../config/awsconfig.json");

const bucket = "arn:aws:s3:ap-northeast-2:864694562519:accesspoint/jadujadu";
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
// 연결할 버킷 설정
let params = {
	Bucket: bucket,
	Key: "",
};
// 불러올 파일 key 설정
function getFile() {
	params.Key = "football-logo-1633748944474.png";
	const fileName = "test.png";
	if (params.Key) {
		s3.getObject(params)
			.promise()
			.then((data) => {
				// downloads 폴더에 저장
				fs.writeFileSync("./public/downloads/" + fileName, data.Body);
				console.log("Loaded " + data.ContentLength + " bytes");
				console.log("file downloaded successfully");
				// do something with data.Body
			})
			.catch((err) => {
				console.log("Failed to retrieve an object: " + error);
				throw err;
			});
	}
}

module.exports = { upload, bucket };
