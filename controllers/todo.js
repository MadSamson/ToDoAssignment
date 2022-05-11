const express = require('express')
const router = express()
const {
    createTodoModel,
    listToDos,
    completedList,
    completeAToDo,
    toDoDetails,
    editToDo
} = require('../models/todoModel')

router.post(('/create'), async(req, res) => {
    const todoinput = req.body
    const userId = req.user.userId
    const newToDo = await createTodoModel(userId, todoinput)
    res.json(newToDo)
})

router.get('/listToDo', async(req,res)=>{
    const id = req.user.userId
    const listOfToDos = await listToDos(id);
    res.json(listOfToDos);
})

router.get('/complitedList', async(req,res)=>{
    const id = req.user.userId
    const listOfToDos = await completedList(id);
    res.json(listOfToDos);
})

router.put('/:id', async(req, res)=>{
    const id = req.params.id
    const todo = await completeAToDo(id)
    res.json(todo)
})

router.get('/:id', async (req, res)=>{
    const id = req.params.id
    const todo = await toDoDetails(id)
    res.json(todo)
})

router.put('/:id/detail', async (req, res)=>{
    const id = req.params.id
    const {description, LongDescription} = req.body
    console.log(req.body);
    const todo = await editToDo(id, description, LongDescription)
    res.json(todo)
})


module.exports = router