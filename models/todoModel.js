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
    const data = await ToDo.find({ author: mongoose.Types.ObjectId(id), completed:false}).sort({ createdAt: -1 }).exec();
    return data;
};

const completedList = async(id)=>{
    const data = await ToDo.find({ author: mongoose.Types.ObjectId(id), completed:true}).sort({ createdAt: -1 }).exec();
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


module.exports= {
    createTodoModel,
    listToDos,
    completedList,
    completeAToDo
}