var db_helpers = require("../helpers/db_helpers");

module.exports = {
  string_to_capitalize: function (object) {
    var temp_obj = new Object();
    for (x in object) {
      //console.log(x);
      //console.log(object[x]);
      /*CAPITALIZE FUNCTION START*/
      const str = object[x];
      const arr = str.split(" ");

      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0) + arr[i].slice(1);
        arr[i] = arr[i].toUpperCase();
      }
      const str2 = arr.join(" ");
      /*CAPITALIZE FUNCTION END*/
      temp_obj[`${x}`] = str2;
    }
    return temp_obj;
  },

  convert_full_date_time_to_date_only_format: (full_date) => {
    let date = new Date(full_date);
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
  },

  convert_full_date_time_to_time_only_format: (full_date) => {
    let date = new Date(full_date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  },

  convert_date_and_new_index_to_service_srl_number: (new_index) => {
    let date = new Date();
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }

    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }

    let year = date.getFullYear();

    return "P" + day + month + year + new_index; //P - PURIFIER
  },

  convert_date_and_new_index_to_reciept_srl_number: (new_index) => {
    let date = new Date();
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }

    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }

    let year = date.getFullYear();

    return "R" + day + month + year + new_index; //R - RECIEPT
  },

  convert_date_and_new_index_to_estimate_srl_number: (new_index) => {
    let date = new Date();
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }

    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }

    let year = date.getFullYear();

    return "E" + day + month + year + new_index; //E - ESTIMATE
  },

  addMonths: (numOfMonths, date = new Date()) => {
    date.setMonth(date.getMonth() + numOfMonths);
    return date;
  },

  convert_dd_mm_yyyy_format_to_yyyy_mm_dd: (old_date) => {
    var [date, month, year] = old_date.split("-");
    return year + "-" + month + "-" + date;
  },

  get_full_datas_from_db: () => {
    return new Promise(async (resolve, reject) => {
      db_helpers
        .take_full_collections_of_db()
        .then((full_collections_of_db) => {
          console.log("GOT FULL COLLECTION NAMES FROM DB");
          db_helpers
            .get_full_datas_from_db(full_collections_of_db)
            .then((db_full_datas) => {
              console.log("GOT FULL DATAS FROM DB");
              resolve(db_full_datas);
            });
        });
    });
  },
};
