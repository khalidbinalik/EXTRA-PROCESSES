var express = require("express");
var router = express.Router();
var functions = require("../config/functions");
var db_helpers = require("../helpers/db_helpers")
const multer = require("multer");

router.get("/backup_full_db", function (req, res, next) {
  functions.get_full_datas_from_db().then((db_full_datas) => {
    res.render("./db_download", { db_full_datas });
  });
});

router.get("/restore_full_db", function (req, res, next) {
  res.render("./db_backup/db_backup_form")
});

router.post("/db_file_from_front", multer().array("uploadedFile"), function (req, res) {
  let file = req.files;
  file = JSON.parse(file[0].buffer);

  for (let i = 0; i < file.length; i++) {
    const collection_with_data = JSON.parse(file[i]);

    var collection_name = Object.keys(collection_with_data);
    collection_name = collection_name[0];

    let data = {
      collection_name: collection_name,
      collection_data: collection_with_data[collection_name],
    };

    db_helpers.add_datas_to_db(data).then(() => {
    });
  }
  res.send("DATABASE UPLOAD PROCESS COMPLETED...!");
});

module.exports = router;
