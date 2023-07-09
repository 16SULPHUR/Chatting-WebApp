const express = require("express");
const path = require("path");
const connectDB = require("./connectDB");
var mysql = require("mysql");

const app = express();
var friendList = [];

function addFriend(req, res) {
  const username = req.body.username;
  const f_username = req.body.fUsername;

  const mainConn = connectDB("chatting webapp");
  const userConn = connectDB(`bt_${username}`);
  const friendConn = connectDB(`bt_${f_username}`);

  // Getting friend list of user
  const query8 = `select \`f-username\` FROM \`friends\`;`;
  userConn.query(query8, function (err, result) {
    if (err) {
      console.log("error while fetching friends");
    } else {
      for (var row of result) {
        friendList.push(row["f-username"]);
      }
      console.log("FriendList: ", friendList);
    }
  });

  // sending error if user enters his/her name
  if (username == f_username) {
    console.log("FriendList: ", friendList);
    req.session.error = "You can not add yourself as a friend";
    res.render(path.join(__dirname, "../tamplates/home.pug"), {
      username: username,
      friends: friendList,
      message: req.session.error,
    }); // Redirect to the error page
  }
  // adding eachother to their friend table
  else {
    // Getting all details of user to add it to friend's db
    const query4 = `SELECT * FROM \`user information\` WHERE username = '${username}';`;
    mainConn.query(query4, function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log("user info result : " + result[0]);
        var userDetails = result[0];
        // adding user to friend's table
        const query5 = `INSERT INTO \`friends\` (\`f-id\`, \`f-email\`, \`f-username\`) VALUES ('${userDetails.id}', '${userDetails.email}', '${userDetails.username}');`;
        friendConn.query(query5, function (err, result) {
          if (err) {
            // sending error if friend already added
            // Store the error message in session variable
            req.session.error = "Friend already added";
            // res.render(path.join(__dirname, "../tamplates/home.pug"), { "username": username, }); // Redirect to the error page
          } else {
            console.log("friend's friendlist updated");

            // creating table for new chat with added friend
            const query6 = `CREATE TABLE \`bt_${f_username}\`.\`chat_with_bt_${username}\` (\`sentBy\` TEXT NOT NULL , \`dateTime\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , \`message\` TEXT NOT NULL ) ENGINE = InnoDB;`;
            friendConn.query(query6, function (err, result) {
              if (err) {
                console.log("error while creating chat table");
              } else {
                console.log("created chat with bt_" + username);
                // res.render(path.join(__dirname, "./tamplates/index.pug"), { "username": username, });
              }
            });
          }
        });
      }
    });

    // adding friend to user's friend table
    // Getting all details of friend
    const query1 = `SELECT * FROM \`user information\` WHERE username = '${f_username}';`;
    mainConn.query(query1, function (err, result) {
      if (err) {
        throw err;
      } else {
        console.log("friend info result : " + result[0]);
        var details = result[0];
      }

      const query2 = `INSERT INTO \`friends\` (\`f-id\`, \`f-email\`, \`f-username\`) VALUES ('${details.id}', '${details.email}', '${details.username}');`;
      userConn.query(query2, function (err, result) {
        if (err) {
          console.log("FriendList", friendList);

          // Store the error message in session variable
          req.session.error = "Friend already added";
          res.render(path.join(__dirname, "../tamplates/home.pug"), {
            username: username,
            friends: friendList,
            message: req.session.error,
          }); // Redirect to the error page
        } else {
          console.log("user's friendlist updated");

          // creating table for new chat with added friend
          const query3 = `CREATE TABLE \`bt_${username}\`.\`chat_with_bt_${f_username}\` (\`sentBy\` TEXT NOT NULL , \`dateTime\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , \`message\` TEXT NOT NULL ) ENGINE = InnoDB;`;
          userConn.query(query3, function (err, result) {
            if (err) {
              console.log("error while creating chat table");
            }
          });

          console.log("created chat with bt_" + f_username);

          friendList = [];
          // Getting friend list of user
          const query7 = `select \`f-username\` FROM \`friends\`;`;

          userConn.query(query7, function (err, result) {
            if (err) {
              console.log("error while fetching friends");
            } else {
              for (var row of result) {
                friendList.push(row["f-username"]);
              }

              console.log("FriendList", friendList);
              res.render(path.join(__dirname, "../tamplates/home.pug"), {
                username: username,
                friends: friendList,
                result: result,
              });
              friendList = [];
            }
          });
        }
      });
    });
  }
}

module.exports = addFriend;
