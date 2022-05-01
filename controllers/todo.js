const express = require('express')
const router = express()
const {
    createTodoModel,
    listToDos,
    completedList,
    completeAToDo
} = require('../models/todoModel')

router.post(('/create'), async(req, res) => {
    const todoinput = req.body
    const newToDo = await createTodoModel(todoinput)
    res.json(newToDo)
})

router.post('/listToDo', async(req,res)=>{
    const id = req.user.userId
    const listOfToDos = await listToDos(id);
    res.json(listOfToDos);
})

router.post('/complitedList', async(req,res)=>{
    const id = req.user.userId
    const listOfToDos = await completedList(id);
    res.json(listOfToDos);
})

router.post('/:id', async(req, res)=>{
    const id = req.params.id
    const todo = await completeAToDo(id)
    res.json(todo)
})


module.exports = router