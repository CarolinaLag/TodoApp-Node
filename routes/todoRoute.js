const express = require("express");
const router = express.Router();
//models
const TodoTask = require("../models/TodoTask");


// GET METHOD
router.get("/", async (req, res) => {

  const page = +req.query.page || 1

  const totalData = await TodoTask.find().countDocuments();
  const taskPerReq = 5;
  const totalPages = Math.ceil(totalData/taskPerReq);
  const dataToShow = taskPerReq * page
 
 // var data = await TodoTask.find().limit(dataToShow)

  
  // let sorted = " "
    
  // if( req.query.date ) {
  //      sorted= req.query.date
  //    }
  //    else if( req.query.content ) {
  //       sorted = req.query.content
  //    }
  const sorted = + req.query.sorted || 1 

  // .sort({ sorted:1 });
  
     var data = await TodoTask.find().limit(dataToShow).sort({content: sorted, date: sorted })
       res.render("todo.ejs", {todoTasks: data, page, totalData, taskPerReq, totalPages, dataToShow})
    // try {

    //   // const { limit=5} =req.query;
    //   // // .limit(limit * 1).skip((page -1) * limit);
    //   // let result = await TodoTask.find().limit(limit *1).skip((page-1)* limit);
      
    //   console.log(result);
    //   res.render("todo.ejs", { todoTasks: result, page, totalData, taskPerReq, totalPages:totalPages, dataToShow });

    // } catch (err) {
    //   console.log(err);
    // }
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


router.get("/sort", async (req, res) => {

   //const {page=1, limit=5, sort=1, content=1} =req.query;

   const { page= 1, limit = 5, date, content} = +req.query
    
 if( req.query.date ) {
      var data = await TodoTask.find().limit(limit *1).skip((page-1)* limit).sort({ date });
      res.render("todo.ejs", {todoTasks: data, page:1, totalData:" ", taskPerReq:1, totalPages:1, dataToShow:1, data:1})
    }
    else if( req.query.content ) {
      var data = await TodoTask.find().limit(limit *1).skip((page-1)* limit).sort({ content });
      res.render("todo.ejs", {todoTasks: data, page:1, totalData:" ", taskPerReq:1, totalPages:1, dataToShow:1, data:1})
    }

})



  

  module.exports = router;