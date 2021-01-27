const express = require("express");
const router = express.Router();
//models
const TodoTask = require("../models/TodoTask");


// GET METHOD
router.get("/", async (req, res) => {

    try {
      const {page=1, limit=5} =req.query;
      // .limit(limit * 1).skip((page -1) * limit);
      let result = await TodoTask.find().limit(limit *1).skip((page-1)* limit);
      
      console.log(result);
      res.render("todo.ejs", { todoTasks: result });

    } catch (err) {
      console.log(err);
    }
  });
  
  
  // POST METHOD
  router.post("/", async (req, res) => {
    console.log(req.body);
  
    const todoTask = new TodoTask({
      content: req.body.content,
    });
  
    try {
      const result = await todoTask.save();
      console.log(result);
      res.redirect("/");
    } catch (err) {
      res.redirect("/");
    }
  });
  
  //UPDATE
  router.get("/edit/:id", async (req, res) => {
    const {page=1, limit=5} =req.query;
      const id = req.params.id;
       await TodoTask.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
      }).limit(limit *1).skip((page-1)* limit);
    })

   
    router.post("/edit/:id", async  (req, res) => {
      const id = req.params.id;
      await TodoTask.findByIdAndUpdate(id, { content: req.body.content}, (err) => {
        if (err) return res.send(500, err);
        res.redirect("/");
      });
    });
  
  //DELETE
  router.get("/remove/:id", (req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, (err) => {
      if (err) return res.send(500, err);
      res.redirect("/");
    });
  });

  router.get("/sort/:id", async (req, res) => {
    
        if (req.params.id == "content") {
            const data = await TodoTask.find().sort({ content : 1});
            res.render("todo.ejs", {todoTasks: data})

        } else if (req.params.id == "date") {
            const data = await TodoTask.find().sort({ date : 1});
            res.render("todo.ejs", {todoTasks: data})
        }
        
})

let x = 1;
let page = 1;
let limit = 5;

router.get("/pagination/:id", async (req, res) => {
    
  x--;
  let a = { page, limit };
    req.params.id == "content"
    a = req.query;
    // const {page=2, limit=5} =req.query;
      const data = await TodoTask.find().limit(limit * 1).skip((page - x) * limit);
      res.render("todo.ejs", {todoTasks: data})
    console.log(x);
    return;

})

  

  module.exports = router;