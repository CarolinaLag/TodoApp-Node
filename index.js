const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');


//models
const TodoTask = require("./models/TodoTask");

dotenv.config();

//console.log(process.env.DB_CONNECT)

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/static", express.static("public"));

//connection to db
mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, dbName: "TodoApp", useUnifiedTopology: true, },  (err) => {
    console.log(err)
    if(err) return
    console.log("Connected to db!");

    
          app.listen(5000, () => console.log("Server is running on port 5000"));
    });




// GET METHOD
app.get("/",  async(req, res) => {


try{

    let resultat = await TodoTask.find();

    console.log(resultat)
 
     res.render("todo.ejs", { todoTasks: resultat });


}
 
catch(err) {
    console.log(err)
    res.render("todo.ejs", { todoTasks: [ "hej hej"] });  
}   
    });

    

// POST METHOD
app.post('/',async (req, res) => {

    console.log(req.body)

    const todoTask = new TodoTask({
    content: req.body.content
    });

    console.log("hello ")
    try {
    const resultat= await todoTask.save();
    console.log(resultat)
    console.log("hello , it runs")
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
        }
    });



   

    //UPDATE
app
.route("/edit/:id")
.get((req, res) => {
const id = req.params.id;
TodoTask.find({}, (err, tasks) => {
res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
});
})
.post((req, res) => {
const id = req.params.id;
TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});

//DELETE
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    });


