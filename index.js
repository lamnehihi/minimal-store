require("dotenv").config();

var express = require("express");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

var productsRoute = require("./routes/products.route");
var cartRoute = require("./routes/cart.route");

var cookieMiddleware = require("./middlewares/cookies.middleware");
var sessionMiddleware = require("./middlewares/session.middleware");

var app = express();
var port = 3000;

app.set("views", "./view");
app.set("view engine", "pug");

app.use(cookieParser(process.env.SESSION_SECRECT));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use(
  "/products",
  cookieMiddleware.requireCookieId, 
  sessionMiddleware.requireSession, 
  productsRoute
);
app.use(
  "/cart",
  cookieMiddleware.requireCookieId, 
  sessionMiddleware.requireSession, 
  cartRoute
);

app.get("/", (req, res) => res.render("index"));
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
