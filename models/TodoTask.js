const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
content: {type: String,required: true },
date: { type: Date, default: Date.now }
}
)
// ask to database

const TodoTask = mongoose.model("task",todoTaskSchema); 

// const TodoTask = mongoose.model("todotask",todoTaskSchema);

//const Model = mongoose.model("Model", fileSchema, "NameOfCollection");

module.exports = TodoTask;
//databse - collections - docs