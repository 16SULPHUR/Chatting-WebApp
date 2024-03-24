const express = require("express");
const path = require("path");
const connectDB = require("./connectDB");
var mysql = require("mysql");

const app = express();

function signupHandler(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  const mainConn = connectDB("chatting webapp");

  // Code to check if username or email already exists.
  const query4 = `SELECT username , email FROM \`user information\` WHERE username = '${username}' OR email = '${email}'`;
  mainConn.query(query4, function (err, result) {
    // if (err) throw err;
    console.log(result);

    if (result[0] != undefined) {
      console.log("Duplicate entry");
      // Store the error message in session variable
      req.session.error = "Username or email already exists";
      res.redirect(`/`); // Redirect to the error page
    } else {
    //   console.log("FriendList", friendList);
      // const params = { email: email, password: password, username: username };
      res.render(path.join(__dirname, "../tamplates/home.pug"), {
        username: username,
        // friends: friendList,
      });

      // SQL to add user in table
      const query1 =
        "INSERT INTO `user information` (`id`, `email`, `username`, `password`) VALUES (?, ?, ?, ?);";
      const values = ["", email, username, password];
      mainConn.query(query1, values, function (err, result) {
        if (err) throw err;
        console.log("Added new user");

        // SQL to create new db for user
        const query2 = `CREATE DATABASE BT_${username}`;
        mainConn.query(query2, function (err, result) {
          if (err) throw err;
          console.log(`Created new database BT_${username}`);

          // connecting to user's database
          const userConn = connectDB(`bt_${username}`);

        //   userConn.connect(function (err) {
        //     if (err) throw err;
        //     console.log(`Connected to the bt_${username} Database!`);
        //   });

          const query3 = `CREATE TABLE \`BT_${username}\`.\`friends\` (\`f-id\` INT NOT NULL , \`f-email\` TEXT NOT NULL , \`f-username\` VARCHAR(20) NOT NULL , PRIMARY KEY (\`f-id\`), UNIQUE \`f-email\` (\`f-email\`), UNIQUE \`f-username\` (\`f-username\`)) ENGINE = InnoDB;`;
          userConn.query(query3, function (err, result) {
            if (err) throw err;
            console.log("friendlist created");
          });
        });
      });
    }
    console.log(`signup Success!`)
  });
//   mainConn.end();
}

module.exports = signupHandler;
