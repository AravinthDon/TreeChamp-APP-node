var express = require("express");
var router = express.Router();
const cloudinary = require("cloudinary");
const request = require("request");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


router.get("/", function (req, res, next) {
  var loggedin = false;
  res.render("index", { title: "TreeChamp", loggedin: loggedin });
});

router.get("/update/:treeid", function (req, res, next) { 
  res.render("update");
});

router.post("/upload/:treeid", function(req, res, next) {
  // parse a file upload
  const form = new Formidable();

  form.parse(req, (err, fields, files) => {

      // Find Cloudinary documentation using the link below
      // https://cloudinary.com/documentation/upload_images
      cloudinary.uploader.upload(files.upload.path, result => {

          // This will return the output after the code is exercuted both in the terminal and web browser
          // When successful, the output will consist of the metadata of the uploaded file one after the other. These include the name, type, size and many more.
          console.log(result)
          if (result.public_id) {
          
          // The results in the web browser will be returned inform of plain text formart. We shall use the util that we required at the top of this code to do this.
              res.writeHead(200, { 'content-type': 'text/plain' });
              res.write('received uploads:\n\n');
              res.end(util.inspect({ fields: fields, files: files }));
          }
      });
  });
});

router.get("/updates/:treeid", function(req, res, next) {
  var treeid = req.params.treeid;
  var updates;  

  const options = {
    url: `http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/update.php?treeid=${treeid}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8",
      uid: 7,
      appid: "24A3LKX9dJo8txTat9AIT16u6WOSh3pUEgchBLAod5TepYIhUISNblx87dhYnBmn"
    },
  };

  request(options, function (err, resp, body) {
    var json = JSON.parse(body);
    

    // check if the status is success or error
    if(json['status'] == "Success") {
      updates = json['data'];
      res.render("updates", { "updates" : updates });
      //console.log(updates);
    } else {
      // render for no updates found
    }
    
  });
  
});
router.get("/tree/:treeid", function (req, resp, next) {
  var treeid = req.params.treeid;
  var treedata;
  const options = {
    url: `http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/tree.php?treeid=${treeid}`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Accept-Charset": "utf-8",
    },
  };

  request(options, function (err, res, body) {
    let json = JSON.parse(body);

    treedata = json['data'];
    console.log(treedata);
    resp.render("tree", {treedata: treedata});
  });
});


module.exports = router;
