const router = require("express").Router();
const uploadFile = require("../../middleware/upload.js");
const fs = require("fs");
const path = require("path");
const reader = require("xlsx");

router.post("/upload", async (req, res) => {
  try {
    await uploadFile(req, res);

    // if (req.files.length == 0) {
    //   return res.status(400).send({ message: "Please upload a file!" });
    // }
    let fileInfos = [];
    req.files.forEach((file) => {
      fileInfos.push(file);
    });

    res.status(200).send(fileInfos);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
});

router.get("/files", (req, res) => {
  const directoryPath = path.join(__dirname, "../../assets/upload/customer/");

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: directoryPath + file,
      });
    });

    res.status(200).send(fileInfos);
  });
});

router.get("/files/:name", (req, res) => {
  const fileName = req.params.name;
  const directoryPath = path.join(__dirname, "../../assets/upload/customer/");

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
});

router.post("/excelupload", async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.files.length == 0) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const file = reader.readFile(req.files[0].path)
    let data = []
    
    const sheets = file.SheetNames
    console.log(sheets)
    for(let i = 0; i < sheets.length; i++)
    {
       const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])   
       temp.forEach((res) => {
          data.push(res)
       })
      
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
});

module.exports = router;
