const express = require("express"),
  // cookieSession = require('cookie-session'),
  session = require("express-session"),
  bodyParse = require("body-parser"),
  mongoose = require("mongoose"),
  livereload = require("connect-livereload"),
  database = "MyApp",
  cors = require("cors"),
  cookieParser = require("cookie-parser"),
  port = 8080;

const app = express();

// app.set("trust proxy", 1); // trust first proxy
// app.use(
//   cors({
//     credentials: true
//   })
// );
app.use("/css", express.static(__dirname + "/view/css"));
app.use("/js", express.static(__dirname + "/view/js"));
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
//
app.use(cookieParser());
app.use(
  session({
    secret: "yoursecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      path: "/",
      httpOnly: true,
      domain: "http://127.0.0.1:4200",
      maxAge: 1000 * 60 * 24 // 24 hours
    }
  })
);
app.use(function(req, res, next) {
  console.log(req.session.id);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
//
app.use(livereload());
var UserRouter = require("./route/userRouter");
var ProductRouter = require("./route/productRouter");
var CartRouter = require("./route/cartRouter");
var TestRoute = require("./route/testRoute");
app.use(UserRouter);
app.use(ProductRouter(express));
app.use(CartRouter(express));
app.use(TestRoute(express));
// database config
mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb://localhost/${database}`,
  {
    useMongoClient: true
  },
  err => {
    console.log("connected db");
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("we're connected to collection: " + database);
});

app.listen(port, () => {
  console.log("listen on port: " + port);
});
