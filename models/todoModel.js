const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema ({
    description: {type: String, required: true},
    tag: [{ type: String }],
    completed: {type: Boolean, default: false},
},
{ timestamps: true })

const ToDo = mongoose.model('ToDo', todoSchema)

const createTodoModel = async(todoinput)=>{
    const newToDo = new ToDo({description: todoinput.description})
    await newToDo.save()
    return newToDo
}

const listToDos = async (id) => {
    const data = await ToDo.find({ author: mongoose.Types.ObjectId(id) }).sort({ createdAt: -1 }).exec();
    return data;
};


module.exports= {
    createTodoModel,
    listToDos
}