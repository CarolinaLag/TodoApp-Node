require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/todoRoute")
// const nodeSass = require("node-sass-middleware");
// const path = require("path");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/static", express.static("public"));

// app.use(
//   nodeSass(
//     { src: path.join(__dirname, "/scss"), 
//       dest: path.join(__dirname, "/public/css"),
//       debug:true, 
//     })
// );
// app.use('/public', express.static(path.join(__dirname, 'public')));



// app.use(nodeSass( 
//     src , 
//     { 
//        src: __dirname + "/scss" ,             
//        dest : __dirname+ "/public/css"      
//     }
//     ,dest,
//     )) 

//connection to db
mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");

app.use("/", router)

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, dbName: "TodoApp", useUnifiedTopology: true },
  (err) => {
    console.log(err);
    if (err) return;
    console.log("Connected to db!");

    app.listen(5000, () => console.log("Server is running on port 5000"));
  }
);




