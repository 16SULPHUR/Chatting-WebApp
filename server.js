const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs");
var mysql = require("mysql");

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

// Connecting to the database
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatting webapp",
});

conn.connect(function (err) {
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
    const email = req.body.email;
    const password = req.body.password;

    const query = `SELECT * FROM \`user information\` WHERE email = '${email}';`;
    const username = conn.query(query, function (err, result) {
      if (err) throw err;
      console.log(result[0].username);
      const username = result[0].username;
      res.redirect(`/home.pug?username=${username}`);
      return;
    });

    // const params = { "email": email, "password": password };
    // res.render(
    //   path.join(
    //     __dirname,
    //     `./tamplates/home.pug`
    //   ),
    //   params
    // );

    

  }
  else if (req.body.formType == "signup") {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    const params = { "email": email, "password": password, "username": username };
    res.render(path.join(__dirname, "./tamplates/home.pug"), params);

    const query =
      "INSERT INTO `user information` (`id`, `email`, `username`, `password`) VALUES (?, ?, ?, ?);";
    const values = ["", email, username, password];
      conn.query(query, values, function (err, result) {
        if (err) throw err;
        console.log("Table updated");
      });
    }

  
  }
);

app.get("/home.pug", (req, res) => {
  const username = req.query.username
  console.log(`get ${username}`);
  
  res.render(path.join(__dirname, "./tamplates/home.pug"), { username });

});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
