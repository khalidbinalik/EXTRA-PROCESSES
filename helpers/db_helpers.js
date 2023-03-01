var db = require("../config/connection"); //CODE FOR ACCESS DB OBJECT FROM connection.js

module.exports = {
  take_full_collections_of_db: () => {
    return new Promise(async (resolve, reject) => {
      db.take_full_collections_names().then((full_collections_names) => {
        resolve(full_collections_names);
      });
    });
  },

  get_full_datas_from_db: (full_collections_of_db) => {
    return new Promise(async (resolve, reject) => {
      var db_full_datas = [];

      for (let i = 0; i < full_collections_of_db.length; i++) {
        const collection_name = full_collections_of_db[i];
        var key = collection_name;
        var datas_obj = {};

        let datas_of_the_collection = await db
          .get()
          .collection(collection_name)
          .find()
          .toArray();

        datas_obj[key] = datas_of_the_collection;
        db_full_datas.push(JSON.stringify(datas_obj));
      }

      resolve(db_full_datas);
    });
  },

  add_datas_to_db: (data) => {
    return new Promise(async (resolve, reject) => {
      let collection_name = data.collection_name;
      let collection_data = data.collection_data;

      try {
        await db.get().collection(collection_name).insertMany(collection_data);
      } catch (error) {
        //console.error(error.code);
        if (error.code == 11000) {
          console.log(
            "ATTEMPT TO INSERT DUPLICATE DATA...! ERROR CODE : " + error.code
          );
        } else {
          console.log("MONGO DB INSERT ATTEMPT ERROR CODE : " + error.code);
        }

        console.log(collection_name + " FAILED TO UPLOAD...!");
        resolve();
      }
      console.log(collection_name + " UPLOADED");
      resolve();
    });
  },
};
