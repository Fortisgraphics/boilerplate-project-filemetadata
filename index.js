var express = require("express");
const multer = require("multer");
var cors = require("cors");
require("dotenv").config();
const path = require("path");

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

/*Method 1 */
// we store the file using the memoryStorage Method
const storage = multer.memoryStorage();
// Now we upload the sile which have begin stored, and give it a name
const upload = multer({ storage: storage });

//now we post to your file
app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  (req, res) => {
    let upLoadImg = req.file;
    const fileDetail = {
      name: upLoadImg.originalname,
      type: upLoadImg.mimetype,
      size: upLoadImg.size,
    };
    res.json(fileDetail);
  },
  (error, next, res, req) => {
    res.status(500).json({ err: "message erro" });
  },
);

/* Method 2 */
/* create a imageStorage, imageUpload and then you post*/
// const imageStorage = multer.diskStorage({
//   destination: "upload/",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname),
//     );
//   },
// file.fieldname is name of the field (image)
// path.extname get the uploaded file extension
// });

// const imageUpload = multer({
//   storage: imageStorage,
//   limits: { fileSize: 100000 },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg|jpeg)$/) || ) {
// upload only png and jpg format, but you can add more formate above
//      return cb(new Error("Please, upload file"));
//     }
//     cb(null, true);
//   },
// });
//now we post to your file
// app.post(
//   "/api/fileanalyse",
//   upload.single("upfile"),
//   (req, res) => {
//     let upLoadImg = req.file;
//     const fileDetail = {
//       name: upLoadImg.originalname,
//       type: upLoadImg.mimetype,
//       size: upLoadImg.size,
//     };
//     res.json(fileDetail);
//   },
//   (error, next, res, req) => {
//     res.status(500).json({ err: "message erro" });
//   },
// );

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
