var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//I CHANGED OR ADDED START
var homeRouter = require("./routes/home");
var processRouter = require("./routes/process");
var office_data_entryRouter = require("./routes/office_data_entry");

//I CHANGED OR ADDED END

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//I ADDED START
var db = require("./config/connection");
var session = require("express-session");

var oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Key",
    cookie: { maxAge: oneDay },
  })
);

db.connect((err) => {
  console.log("LOG FROM : db.connect function defined in app.js");
  if (err) console.log("CONNECTION ERROR" + err);
  else console.log("DB CONNECTED ON PORT 27017");
});

var hbs = require("express-handlebars");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials/",
  })
);

//var fileUpload = require("express-fileupload"); //CODE FOR FILE/IMAGE UPLOAD FROM hbs TO server
//app.use(fileUpload()); //CODE FOR FILE/IMAGE UPLOAD FROM hbs TO server
//I ADDED END

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRouter);
app.use("/process", processRouter);
app.use("/office_data_entry", office_data_entryRouter);


/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//FULL DB DATAS BACKUP TO GOOGLE DRIVE - START
var functions = require("./config/functions");
const { google } = require("googleapis");
// const schedule = require("node-schedule");
const KEYFILEPATH = path.join(__dirname, "db_backeup_Gdrive_credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

// setInterval(function () {
//   let Time_start = "09:00:00";
//   let Time_end = "19:00:00";

//   currentTime = new Date();
//   startTime = new Date(currentTime.getTime());
//   startTime.setHours(Time_start.split(":")[0]);
//   startTime.setMinutes(Time_start.split(":")[1]);
//   startTime.setSeconds(Time_start.split(":")[2]);

//   endTime = new Date(currentTime.getTime());
//   endTime.setHours(Time_end.split(":")[0]);
//   endTime.setMinutes(Time_end.split(":")[1]);
//   endTime.setSeconds(Time_end.split(":")[2]);

//   let check_Time = startTime < currentTime && endTime > currentTime;
//   if (check_Time) {
//     console.log("TIME FOR BACKUP THE FULL DB");
//     functions.get_full_datas_from_db().then(async (db_full_datas) => {
//       var content = new Object();
//       try {
//         content.name = "DB_OF_" + new Date().toLocaleString();
//         content.body = JSON.stringify(db_full_datas);
//         await uploadFile(content);
//         console.log("DB BACKUP COMPLETED");
//       } catch (f) {
//         console.log(f.message);
//       }
//     });

//     const uploadFile = async (content) => {
//       await google.drive({ version: "v3", auth }).files.create({
//         media: {
//           mimeType: "application/json",
//           body: content.body,
//         },
//         requestBody: {
//           name: content.name,
//           parents: ["1351aD6KDtVqoLk-KrksOlD-NFhgdnQLP"],
//         },
//         fields: "id,name",
//       });
//     };
//   }
// }, 300000);

//FULL DB DATAS BACKUP TO GOOGLE DRIVE - END

module.exports = app;
