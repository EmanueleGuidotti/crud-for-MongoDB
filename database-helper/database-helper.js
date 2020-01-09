const MongoClient = require("mongodb").MongoClient;
const DBconfig = require("../config/mongo_config");

// Extend the default timeout so MongoDB binaries can download when first run
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// DB global instance
let _db = null;
let _client = null;

/** Open the database connection pooling
 * @param callback - Function error callback
 */

module.exports.start = async function(callback) {
  DBconfig.GetURI().then(function(config) {
    const uri = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.schema}`;
    MongoClient.connect(
      uri,
      {
        poolSize: 10,
        useNewUrlParser: true
        // other options can go here
      },
      function(err, client) {
        _db = client.db(config.schema);
        _client = client;
        return callback(err);
      }
    );
  });
};

module.exports.close = function() {
  if (!_client) return false;
  _client.close();
};

module.exports.getDb = function() {
  return _db;
};
