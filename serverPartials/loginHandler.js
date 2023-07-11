const express = require("express");
const path = require("path");
const connectDB = require("./connectDB");
var mysql = require("mysql");

const app = express();

function loginHandler(body, req, res) {
  const mainConn = connectDB("chatting webapp");

  friendList = [];
  const username = body.username;
  const password = body.password;

  const query = `SELECT * FROM \`user information\` WHERE username = '${username}';`;
  mainConn.query(query, function (err, result) {
    if (err) throw err;
    const username = result[0].username;

    // connecting to user's database
      userConn = connectDB(`bt_${username}`);
      
    // Getting friend list of user
    const query1 = `select \`f-username\` FROM \`friends\`;`;

    userConn.query(query1, function (err, result) {
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
        });

        console.log("login success")
      }
    });
  });

  mainConn.end();
}

module.exports = loginHandler;
