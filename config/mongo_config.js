const fs = require("fs");
const gracefulFs = require("graceful-fs");

gracefulFs.gracefulify(fs); /* Avoiding TOO MANY FILES OPEN error */

module.exports.GetURI = function() {
  return new Promise(function(resolve) {
    fs.readFile("./mongoDB.conf.json", "utf8", (err, data) => {
      if (err) {
        console.log("Cannot read mongo config file ! ", err);
      } else {
        let parsedData = JSON.parse(data);
        let mongo_config = {
          host: parsedData.webapp.host,
          port: parsedData.webapp.port,
          schema: parsedData.webapp.schema,
          user: parsedData.webapp.user,
          password: parsedData.webapp.password,
          authMechanism: parsedData.webapp.authMechanism
        };
        resolve(mongo_config);
      }
    });
  });
};
