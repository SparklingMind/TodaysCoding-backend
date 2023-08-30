import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import "dotenv/config";

const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;

const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: "ap-northeast-2",
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "todaycoding",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
  }),
});
