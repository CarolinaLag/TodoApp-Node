const express = require("express");
const router = express.Router();
//models
const TodoTask = require("../models/TodoTask");


// GET METHOD
router.get("/", async (req, res) => {

    try {
      // const {page=1, limit=5} =req.query; .limit(limit * 1).skip((page -1) * limit);
      let result = await TodoTask.find();
      
      console.log(result);
      res.render("todo.ejs", { todoTasks: result });

    } catch (err) {
      console.log(err);
      // res.render("todo.ejs", { todoTasks: ["hej hej"] });
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
      const id = req.params.id;
      await TodoTask.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
      });
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

router.get("/pagination/:id", async (req, res) => {
    
    req.params.id == "content"
    const {page=1, limit=5} =req.query;
      const data = await TodoTask.find().limit(limit * 1).skip((page -1) * limit);
      res.render("todo.ejs", {todoTasks: data})

})

  

  module.exports = router;