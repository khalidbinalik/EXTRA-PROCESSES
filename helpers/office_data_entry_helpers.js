var db = require("../config/connection");
var collection = require("../config/collections");

module.exports = {
  add_wh_filter_to_db: (wh_name) => {
    return new Promise(async (resolve, reject) => {
      let count = await db
        .get()
        .collection(collection.WH_FILTER_LIST)
        .countDocuments({ name: wh_name });
      if (count == 0) {
        await db
          .get()
          .collection(collection.WH_FILTER_LIST)
          .insertOne({ name: wh_name });
        resolve(wh_name + " ADDED TO DB");
      } else {
        resolve(wh_name + " ALREADY EXIST IN WH NAME LIST");
      }
    });
  },

  edit_wh_filter_to_db: (current_name, new_name) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.WH_FILTER_LIST)
        .updateOne({ name: current_name }, { $set: { name: new_name } });
      resolve();
    });
  },

  delete_wh_filter_from_db: (wh_name) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.WH_FILTER_LIST)
        .deleteOne({ name: wh_name });

      resolve(wh_name + " DELETED FROM LIST");
    });
  },

  get_wh_filter_list: () => {
    return new Promise(async (resolve, reject) => {
      let wh_list = await db
        .get()
        .collection(collection.WH_FILTER_LIST)
        .find()
        .toArray();

      resolve(wh_list);
    });
  },
};
