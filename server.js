const http = require("http");
const express = require("express");
const path = require("path");
// const fs = require("fs");
const session = require("express-session");
var mysql = require("mysql");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const httpMsg = require("http-msgs")
const connectDB = require("./serverPartials/connectDB");
const loginHandler = require("./serverPartials/loginHandler");
const signupHandler = require("./serverPartials/signupHandler");
const addFriend = require("./serverPartials/addFriend");
var friendList = [];

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

// Set up session middleware
app.use(
  session({
    key:"user_id",
    secret: "$3cret K3y",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires:600000,
    }
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.get("/", (req, res) => {
  if (req.session.error) {
    const errorMessage = req.session.error;
    console.log("got: ", errorMessage);
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

  if (req.body.formType == "login") {
    loginHandler(req.body, req, res);
  }

  // Handling signup form
  else if (req.body.formType == "signup") {
    signupHandler(req, res);
  }

  // Handling addFriend form
  else if (req.body.formType == "addFriend") {
    addFriend(req, res);
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

var jsonParser = bodyParser.json();

app.post("/ajax", jsonParser, (req, res) => {
  
  console.log(req.body);
  httpMsg.sendJSON(req, res, {
    response:req.body
  })
});

app.get("/ajax", (req, res) => {
  res.render(path.join(__dirname, "./tamplates/ajax.pug"));
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
