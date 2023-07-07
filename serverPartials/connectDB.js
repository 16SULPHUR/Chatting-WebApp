var mysql = require("mysql");

function connectDB(db) {
  // Connecting to the database
  var mainConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: `${db}`,
  });

  mainConn.connect(function (err) {
      if (err) {
        console.log("error while connecting database")
        return
    };
    console.log(`Connected to the ${db} Database!`);
  });
    
    return mainConn;
}

module.exports = connectDB;