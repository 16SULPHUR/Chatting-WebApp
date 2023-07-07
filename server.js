const http = require("http");
const express = require("express");
const path = require("path");
// const fs = require("fs");
const session = require("express-session");
var mysql = require("mysql");
const loginHandler = require("./serverPartials/loginHandler");
const connectDB = require("./serverPartials/connectDB");
var friendList = [];

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

// Set up session middleware
app.use(
  session({
    secret: "$3cret K3y",
    resave: false,
    saveUninitialized: true,
  })
);


// // Connecting to the database
// var mainConn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "chatting webapp",
// });

// mainConn.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected to the Database!");
// });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());


app.get("/", (req, res) => {
  if (req.session.error) {
    const errorMessage = req.session.error;
    console.log(errorMessage);
    delete req.session.error; // Clear the error message from session
    // Render the error page with the error message
    res.render(path.join(__dirname, "./tamplates/index.pug"), {
      message: errorMessage,
    });
  } else {
    res.render(path.join(__dirname, "./tamplates/index.pug"));
  }
});

app.post("/home.pug", (req, res) => {
  console.log(req.body);

  loginHandler(req.body,req,res);

  // // Handling login form
  // if (req.body.formType == "login") {
  //   friendList = [];
  //   const username = req.body.username;
  //   const password = req.body.password;

  //   const query = `SELECT * FROM \`user information\` WHERE username = '${username}';`;
  //   mainConn.query(query, function (err, result) {
  //     if (err) throw err;
  //     console.log(result[0].username);
  //     const username = result[0].username;

  //     // connecting to user's database
  //     var userConn = mysql.createConnection({
  //       host: "localhost",
  //       user: "root",
  //       password: "",
  //       database: `bt_${username}`,
  //     });
  //     // Getting friend list of user
  //     const query1 = `select \`f-username\` FROM \`friends\`;`;

  //     userConn.query(query1, function (err, result) {
  //       if (err) {
  //         console.log("error while fetching friends");
  //       } else {
  //         for (var row of result) {
  //           friendList.push(row["f-username"]);
  //         }
  //         console.log("FriendList", friendList);

  //         res.render(path.join(__dirname, "./tamplates/home.pug"), {
  //           username: username,
  //           friends: friendList,
  //         });
  //       }
  //     });
  //   });
  // }

  // Handling signup form
  // else
    if(req.body.formType == "signup") {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // Code to check if username or email already exists.
    const query4 = `SELECT username , email FROM \`user information\` WHERE username = '${username}' OR email = '${email}'`;
    mainConn.query(query4, function (err, result) {
      if (err) throw err;
      console.log(result[0]);

      if (result[0] != undefined) {
        console.log("Duplicate entry");
        // Store the error message in session variable
        req.session.error = "Username or email already exists";
        res.redirect(`/`); // Redirect to the error page
      } else {
        console.log("FriendList", friendList);
        // const params = { email: email, password: password, username: username };
        res.render(path.join(__dirname, "./tamplates/home.pug"), {
          username: username,
          friends: friendList,
        });

        // SQL to add user in table
        const query1 =
          "INSERT INTO `user information` (`id`, `email`, `username`, `password`) VALUES (?, ?, ?, ?);";
        const values = ["", email, username, password];
        const id = mainConn.query(query1, values, function (err, result) {
          if (err) throw err;
          console.log("Added new user");

          // SQL to create new db for user
          const query2 = `CREATE DATABASE BT_${username}`;
          mainConn.query(query2, function (err, result) {
            if (err) throw err;
            console.log(`Created new database BT_${username}`);

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
              console.log("friendlist created");
            });
          });
        });
      }
    });
  }

  // Handling addFriend form
  else if (req.body.formType == "addFriend") {
    const username = req.body.username;
    const f_username = req.body.fUsername;

    if (username == f_username) {
      console.log("FriendList", friendList);
      req.session.error = "You can not add yourself as a friend";
      res.render(path.join(__dirname, "./tamplates/home.pug"), {
        username: username,
        friends: friendList,
        message: req.session.error,
      }); // Redirect to the error page
    } else {
      // connecting to user's and friend's database
      var userConn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: `bt_${username}`,
      });
      var friendConn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: `bt_${f_username}`,
      });
      userConn.connect(function (err) {
        if (err) throw err;
        console.log(`Connected to the bt_${username} Database!`);

        // making connection of friend's database
        friendConn.connect(function (err) {
          if (err) throw err;
          console.log(`Connected to the bt_${f_username} Database!`);

          // Getting all details of user to add it to friend's db
          const query4 = `SELECT * FROM \`user information\` WHERE username = '${username}';`;
          mainConn.query(query4, function (err, result) {
            if (err) {
              throw err;
            } else {
              console.log("user info result : " + result[0]);
              var userDetails = result[0];

              const query5 = `INSERT INTO \`friends\` (\`f-id\`, \`f-email\`, \`f-username\`) VALUES ('${userDetails.id}', '${userDetails.email}', '${userDetails.username}');`;
              friendConn.query(query5, function (err, result) {
                if (err) {
                  // Store the error message in session variable
                  req.session.error = "Friend already added";
                  // res.render(path.join(__dirname, "./tamplates/home.pug"), { "username": username, }); // Redirect to the error page
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
        });

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
              res.render(path.join(__dirname, "./tamplates/home.pug"), {
                username: username,
                friends: friendList,
                message: req.session.error,
              }); // Redirect to the error page
            } else {
              console.log("user's friendlist updated");
              // res.render(path.join(__dirname, "./tamplates/index.pug"), { "username": username, });

              // creating table for new chat with added friend
              const query3 = `CREATE TABLE \`bt_${username}\`.\`chat_with_bt_${f_username}\` (\`sentBy\` TEXT NOT NULL , \`dateTime\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , \`message\` TEXT NOT NULL ) ENGINE = InnoDB;`;
              userConn.query(query3, function (err, result) {
                if (err) {
                  console.log("error while creating chat table");
                } else {
                  // console.log("FriendList", friendList);
                  // res.render(path.join(__dirname, "./tamplates/home.pug"), {
                  //   username: username,
                  //   friends: friendList,
                  // });
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
                  res.render(path.join(__dirname, "./tamplates/home.pug"), {
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
      });
    }
  }
});

app.get("/home.pug", (req, res) => {
  const username = req.query.username;
  console.log(`get ${username}`);

  if (req.session.error) {
    const errorMessage = req.session.error;
    console.log(errorMessage);
    delete req.session.error; // Clear the error message from session
    // Render the error page with the error message
    res.render(path.join(__dirname, "./tamplates/home.pug"), {
      message: errorMessage,
      username,
    });
  } else {
    res.render(path.join(__dirname, "./tamplates/home.pug"), { username });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
