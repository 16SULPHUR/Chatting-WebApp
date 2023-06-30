const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs");
var mysql = require("mysql");

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

// Connecting to the database
var mainConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatting webapp",
});

mainConn.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the Database!");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./tamplates/index.html"));
});

app.post("/home.pug", (req, res) => {
  console.log(req.body);
  if (req.body.formType == "login") {
    const username = req.body.username;
    const password = req.body.password;

    const query = `SELECT * FROM \`user information\` WHERE username = '${username}';`;
    mainConn.query(query, function (err, result) {
      if (err) throw err;
      console.log(result[0].username);
      const username = result[0].username;
      res.redirect(`/home.pug?username=${username}`);
    });
  }
  // Handling signup form
  else if (req.body.formType == "signup") {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // const params = { email: email, password: password, username: username };
    res.redirect(`/home.pug?username=${username}`);

    // SQL to add user in table
    const query1 =
      "INSERT INTO `user information` (`id`, `email`, `username`, `password`) VALUES (?, ?, ?, ?);";
    const values = ["", email, username, password];
    const id = mainConn.query(query1, values, function (err, result) {
      if (err) throw err;
      console.log("Table updated");
    });

    // SQL to create new db for user
    const query2 = `CREATE DATABASE BT_${username}`;
    mainConn.query(query2, function (err, result) {
      if (err) throw err;
      console.log(`Created new database BT_${username}`);
    });

    // connecting to user's database
    var userConn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: `bt_${username}`,
    });
    userConn.connect(function (err) {
      if (err) throw err;
      console.log(`Connected to the bt_${username} Database!`);
    });

    const query3 = `CREATE TABLE \`BT_${username}\`.\`friends\` (\`f-id\` INT NOT NULL , \`f-email\` TEXT NOT NULL , \`f-username\` VARCHAR(20) NOT NULL , PRIMARY KEY (\`f-id\`), UNIQUE \`f-email\` (\`f-email\`), UNIQUE \`f-username\` (\`f-username\`)) ENGINE = InnoDB;`;
    userConn.query(query3, function (err, result) {
      if (err) throw err;
      console.log("added friendlist");
    });
  }
  // Handling addFriend form
  else if (req.body.formType == "addFriend") {
    const username = req.body.username;
    const f_username = req.body.fUsername;

    // connecting to user's database
    var userConn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: `bt_${username}`,
    });
    userConn.connect(function (err) {
      if (err) throw err;
      console.log(`Connected to the bt_${username} Database!`);
    });

    // Getting all details of friend
    const query1 = `SELECT * FROM \`user information\` WHERE username = '${f_username}';`;
    mainConn.query(query1, function (err, result) {
      if (err) throw err;
      console.log("user info result : " + result[0]);
      var details = result[0];

      const query2 = `INSERT INTO \`friends\` (\`f-id\`, \`f-email\`, \`f-username\`) VALUES ('${details.id}', '${details.email}', '${details.username}');`;
      userConn.query(query2, function (err, result) {
        if (err) throw err;
        console.log("updated friendlist");
        res.redirect(`/home.pug?username=${username}`);
      });

      // creating table for new chat with added friend
      const query3 = `CREATE TABLE \`bt_${username}\`.\`chat_with_bt_${f_username}\` (\`sentBy\` TEXT NOT NULL , \`dateTime\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , \`message\` TEXT NOT NULL ) ENGINE = InnoDB;`;
      userConn.query(query3, function (err, result) {
        if (err) throw err;
        console.log("created chat with bt_" + f_username);
        res.redirect(`/home.pug?username=${username}`);
      });
    });

    
  }
});

app.get("/home.pug", (req, res) => {
  const username = req.query.username;
  console.log(`get ${username}`);

  res.render(path.join(__dirname, "./tamplates/home.pug"), { username });
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
