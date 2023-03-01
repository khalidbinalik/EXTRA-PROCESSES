const mongoClient = require("mongodb").MongoClient;
const state = {
  db: null,
};

module.exports.connect = function (done) {
  const url = "mongodb://127.0.0.1:27017";
  const dbname = "db1";

  mongoClient.connect(url, (err, data) => {
    if (err) return done(err);
    state.db = data.db(dbname);
    done();
  });
};

module.exports.get = function () {
  return state.db;
};

module.exports.take_full_collections_names = () => {
  return new Promise(async (resolve, reject) => {
    let collections_name = [];
    var collections_data = await state.db.listCollections().toArray();
    for (let i = 0; i < collections_data.length; i++) {
      const element = collections_data[i];
      collections_name.push(element.name);
    }
    resolve(collections_name);
  });
};
