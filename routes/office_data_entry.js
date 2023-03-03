var express = require("express");
var router = express.Router();
var office_data_entry_helpers = require("../helpers/office_data_entry_helpers");

router.get("/data_enty_pages", function (req, res, next) {
  res.render("./office_data_entry/office_data_entry_home");
});

router.get("/wh_filter_add_edit_delete", function (req, res, next) {
  office_data_entry_helpers.get_wh_filter_list().then((wh_list) => {
    res.render("./office_data_entry/wh_filter_add_edit_delete", {
      wh_list,
    });
  });
});

router.get("/purifier_add_edit_delete", function (req, res, next) {
  office_data_entry_helpers.get_purifier_list().then((purifier_list) => {
    res.render("./office_data_entry/purifier_add_edit_delete", {
      purifier_list,
    });
  });
});

router.post("/add_wh_filter", function (req, res, next) {
  let wh_name = req.body.wh_filter.toUpperCase();
  office_data_entry_helpers.add_wh_filter_to_db(wh_name).then((ret_msg) => {
    console.log(ret_msg);
    res.redirect("wh_filter_add_edit_delete");
  });
});

router.post("/add_purifier", function (req, res, next) {
  let purifier_name = req.body.purifier.toUpperCase();
  office_data_entry_helpers.add_purifier_to_db(purifier_name).then((ret_msg) => {
    console.log(ret_msg);
    res.redirect("purifier_add_edit_delete");
  });
});

router.post("/edit_wh_filter", function (req, res, next) {
  let current_name = req.body.current_name;
  let new_name = req.body.new_name.toUpperCase();
  office_data_entry_helpers
    .edit_wh_filter_to_db(current_name, new_name)
    .then(() => {
      console.log(current_name + "CHANGED TO " + new_name);
      res.redirect("wh_filter_add_edit_delete");
    });
});

router.post("/edit_purifier", function (req, res, next) {
  let current_name = req.body.current_name;
  let new_name = req.body.new_name.toUpperCase();
  office_data_entry_helpers
    .edit_purifier_to_db(current_name, new_name)
    .then(() => {
      console.log(current_name + "CHANGED TO " + new_name);
      res.redirect("purifier_add_edit_delete");
    });
});

router.post("/delete_wh_filter", function (req, res, next) {
  let wh_name = req.body.wh_filter;
  office_data_entry_helpers
    .delete_wh_filter_from_db(wh_name)
    .then((ret_msg) => {
      console.log(ret_msg);
      res.redirect("wh_filter_add_edit_delete");
    });
});

router.post("/delete_purifier", function (req, res, next) {
  let purifier_name = req.body.purifier;
  office_data_entry_helpers
    .delete_purifier_from_db(purifier_name)
    .then((ret_msg) => {
      console.log(ret_msg);
      res.redirect("purifier_add_edit_delete");
    });
});

module.exports = router;
