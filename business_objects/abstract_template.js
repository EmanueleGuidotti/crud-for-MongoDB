const dbHelper = require("../database-helper/database-helper");
let Db;
dbHelper.start(function(err, client) {
  if (err) return console.error("MongoClient connection error: ", err);
  Db = dbHelper.getDb();
});

/** Insert one document
 * @method persistOne
 * @param collectionName - The name of the collection to modify
 * @param collectionData - The object to persist
 */
module.exports.persistOne = function(collectionName, collectionData) {
  return new Promise(function(resolve, reject) {
    Db.collection(collectionName, function(err, collection) {
      collection.insertOne(collectionData, function(err, result) {
        if (err) {
          console.error("*ERROR PERSIST ONE TEMPLATE BO*", err);
          reject(err);
        } else resolve(result);
      });
    });
  });
};

/** Insert more than one document
 * @method persistMany
 * @param collectionName - The name of the collection to modify
 * @param collectionData - An array of arguments to persist in the collection
 */
module.exports.persistMany = function(collectionName, collectionData) {
  return new Promise(function(resolve, reject) {
    Db.collection(collectionName, function(err, collection) {
      collection.insertMany(collectionData, function(err, result) {
        if (err) {
          console.error("*ERROR PERSIST MANY TEMPLATE BO*", err);
          reject(err);
        } else resolve(result);
      });
    });
  });
};

/** Find and update one or more documents
 * @method findAndModify
 * @param collectionName - The name of the collection to modify
 * @param collectionQuery - The search condition
 * @param collectionData - The data to update
 */
module.exports.findAndModify = function(
  collectionName,
  collectionQuery,
  collectionData
) {
  return new Promise(function(resolve, reject) {
    Db.collection(collectionName, function(err, collection) {
      collection.findAndModify(
        collectionQuery,
        [],
        { $set: collectionData },
        { new: true, upsert: true },
        function(err, result) {
          if (err) {
            console.error("*ERROR FIND AND MODIFY TEMPLATE BO*", err);
            reject(err);
          } else resolve(result);
        }
      );
    });
  });
};

/** Find and update multiple documents at the same time
 * @method updateMany
 * @param collectionName - The name of the collection to modify
 * @param collectionQuery - The search condition
 * @param collectionData - The data to update
 */
module.exports.updateMany = function(
  collectionName,
  collectionQuery,
  collectionData
) {
  return new Promise(function(resolve, reject) {
    Db.collection(collectionName, function(err, collection) {
      collection.updateMany(
        collectionQuery,
        { $set: collectionData },
        { upsert: false },
        function(err, result) {
          if (err) {
            console.error("*ERROR UPDATE MANY TEMPLATE BO*", err);
            reject(err);
          } else resolve(result);
        }
      );
    });
  });
};

/** Find documents by the given query
 * @method find
 * @param collectionName - The name of the collection to modify
 * @param collectionQuery - The search condition
 * */
module.exports.find = function(collectionName, collectionQuery) {
  return new Promise(function(resolve, reject) {
    Db.collection(collectionName, function(err, collection) {
      collection.find(collectionQuery).toArray(function(err, result) {
        if (err) {
          console.error("*ERROR FIND TEMPLATE BO*", err);
          reject(err);
        } else resolve(result);
      });
    });
  });
};

/** Find one documents by the given query
 * @method findOne
 * @param collectionName - The name of the collection to modify
 * @param collectionQuery - The search condition
 * */
module.exports.findOne = function(collectionName, collectionQuery) {
  return new Promise(function(resolve, reject) {
    Db.collection(collectionName, function(err, collection) {
      collection.findOne(collectionQuery, function(err, result) {
        if (err) {
          console.error("*ERROR FIND ONE TEMPLATE BO*", err);
          reject(err);
        } else resolve(result);
      });
    });
  });
};

/** Find latest document in collection
 * @method findLatest
 * @param collectionName - The name of the collection to modify
 * @operator $natural - the $natural operator uses the following syntax to return documents in the order they exist on disk: $natural: 1 from olders to newer, or $natural: -1 from newer to older
 * */
module.exports.findLatest = function(collectionName) {
  return new Promise(function(resolve, reject) {
    Db.collection(collectionName, function(err, collection) {
      collection
        .find()
        .limit(1)
        .sort({ $natural: -1 })
        .nextObject(function(err, result) {
          if (err) {
            console.error("*ERROR FIND THE LATEST RECORD BO*", err);
            reject(err);
          } else resolve(result);
        });
    });
  });
};

/** Delete document from collection
 * @method findOneAndDelete
 * @param collectionName - The name of the collection to modify
 * @param collectionQuery - The search condition
 * */
module.exports.findOneAndDelete = function(collectionName, collectionQuery) {
  return new Promise(function(resolve, reject) {
    Db.collection(collectionName, function(err, collection) {
      collection.findOneAndDelete(collectionQuery).then(function(result) {
        if (err) {
          console.error("*ERROR DELETE THE GIVEN RECORD BO*", err);
          reject(err);
        } else resolve(result);
      });
    });
  });
};

/** Truncate a collection
 * @method truncate
 * @param collectionName - The name of the collection to truncate
 */
module.exports.truncate = function(collectionName) {
  return new Promise(function(resolve, reject) {
    Db.collection(collectionName, function(err, collection) {
      collection.remove({}, function(err, result) {
        if (err) {
          console.error("*ERROR TRUNCATE TEMPLATE BO*", err);
          reject(err);
        } else resolve(result);
      });
    });
  });
};

/** Order documents by the given query
 * @method findAndSort
 * @param collectionName - The name of the collection to modify
 * @param sortQuery - orderby condition
 * */
module.exports.findAndSort = function(collectionName, sortQuery) {
  return new Promise(function(resolve, reject) {
    Db.collection(collectionName, function(err, collection) {
      collection
        .find()
        .sort(sortQuery)
        .toArray(function(err, result) {
          if (err) {
            console.error("*ERROR SORT RECORD BO*", err);
            reject(err);
          } else resolve(result);
        });
    });
  });
};
