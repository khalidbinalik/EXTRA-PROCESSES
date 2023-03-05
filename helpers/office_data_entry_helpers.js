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

  add_purifier_to_db: (purifier_name) => {
    return new Promise(async (resolve, reject) => {
      let count = await db
        .get()
        .collection(collection.PURIFIER_LIST)
        .countDocuments({ name: purifier_name });
      if (count == 0) {
        await db
          .get()
          .collection(collection.PURIFIER_LIST)
          .insertOne({ name: purifier_name });
        resolve(purifier_name + " ADDED TO DB");
      } else {
        resolve(purifier_name + " ALREADY EXIST IN PURIFIER NAME LIST");
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

  edit_purifier_to_db: (current_name, new_name) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.PURIFIER_LIST)
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

  delete_purifier_from_db: (purifier_name) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.PURIFIER_LIST)
        .deleteOne({ name: purifier_name });

      resolve(purifier_name + " DELETED FROM LIST");
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

  get_purifier_list: () => {
    return new Promise(async (resolve, reject) => {
      let purifier_list = await db
        .get()
        .collection(collection.PURIFIER_LIST)
        .find()
        .toArray();
      resolve(purifier_list);
    });
  },
};
