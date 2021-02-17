require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
var timeout = require("connect-timeout");

mongoose.connect(
  "mongodb+srv://priya15:Pmddoshi@meme.4yaxc.mongodb.net/memes?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(timeout("5s"));
// var corsOptions = {
//   origin: "http://localhost",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors());
app.options("*", cors());
app.use(haltOnTimedout);
const articleRouter = require("./routes/article");
const { urlencoded } = require("body-parser");

// app.get("/", (req, res) => {
//   res.send("hello world");
// });
console.log("server js called");
app.use("/memes", articleRouter);
app.use(haltOnTimedout);

// app.use(
//   cors({
//     methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
//     allowedHeaders:
//       "origin, content-type, Accept, X-Access-Token, Authorization",
//     optionsSuccessStatus: 200,
//   })
// );
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(haltOnTimedout);
// app.get("/testing", function (req, res) {
//   res.send("tesing");
// });
// var whitelist = ["http://localhost:3001", "http://localhost"];

app.use(bodyparser, urlencoded({ extended: true }));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

app.listen(process.env.PORT || 8080, () => console.log("Server Statrted"));
