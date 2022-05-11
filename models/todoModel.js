const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema ({
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: {type: String, required: true},
    tag: [{ type: String }],
    completed: {type: Boolean, default: false},
},
{ timestamps: true })

const ToDo = mongoose.model('ToDo', todoSchema)

const createTodoModel = async(userId, todoinput)=>{
    const newToDo = new ToDo({by: userId, description: todoinput.description})
    await newToDo.save()
    return newToDo
}

const listToDos = async (id) => {
    const data = await ToDo.find({ by: mongoose.Types.ObjectId(id), completed:false}).sort({ createdAt: -1 }).exec();
    return data;
};

const completedList = async(id)=>{
    const data = await ToDo.find({ by: mongoose.Types.ObjectId(id), completed:true}).sort({ createdAt: -1 }).exec();
    return data;
}

const completeAToDo = async(id) => {
    const todo = await ToDo.findOne({_id: mongoose.Types.ObjectId(id)})
    let updatedtodo
    if (todo.completed===true){
        updatedtodo = ToDo.updateOne({_id: mongoose.Types.ObjectId(id)}, {completed: false})
    } else {
        updatedtodo = ToDo.updateOne({_id: mongoose.Types.ObjectId(id)}, {completed: true})
    }
    return updatedtodo
}

const toDoDetails = async(id) => {
    const todo = await ToDo.findOne({_id: mongoose.Types.ObjectId(id)})
    return todo
}

const editToDo = async (id, description) => {
    const todo = await ToDo.findOneAndUpdate(
        {_id: mongoose.Types.ObjectId(id)},
        {description: description},
        {new: true}
    )
    return todo
}

module.exports= {
    createTodoModel,
    listToDos,
    completedList,
    completeAToDo,
    toDoDetails,
    editToDo
}