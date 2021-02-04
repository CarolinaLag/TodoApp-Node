const express = require("express");
const router = express.Router();
//models
const TodoTask = require("../models/TodoTask");

// GET METHOD
router.get("/", async (req, res) => {
  
    const page = +req.query.page || 1;

    const totalData = await TodoTask.find().countDocuments();
    const taskPerReq = 5;
    const totalPages = Math.ceil(totalData / taskPerReq);
    const dataToShow = taskPerReq * page;
    const sorted = +req.query.sorted || 1;
    
try {
  if (page === 1 ) {
    let data = await TodoTask.find()
      .limit(dataToShow)
      .sort({  date: sorted })
      console.log(data)
    res.render("todo.ejs", {
      todoTasks: data,
      page,
      totalData,
      taskPerReq,
      totalPages,
      dataToShow,
    });
  } else {
    let data = await TodoTask.find()
    .limit(5).skip((page -1) *5 )
    .sort({ date: sorted });
    console.log(data)
  res.render("todo.ejs", {
    todoTasks: data,
    page,
    totalData,
    taskPerReq,
    totalPages,
    dataToShow,
  });
  }

  }catch(err) {
    res.redirect("/")
  }
});

// POST METHOD
router.post("/", async (req, res) => {

  const todoTask = new TodoTask({
    content: req.body.content
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
  try {
  await TodoTask.find({}, (err, tasks) => {
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
  });
} catch (err){
  res.redirect("/")
}
});

router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
  await TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
}catch(err) {
 res.redirect("/")
}
});

//DELETE
router.get("/remove/:id", (req, res) => {
  const id = req.params.id;
  try {
  TodoTask.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
} catch (err) {
  res.redirect("/")
}
});


module.exports = router;
