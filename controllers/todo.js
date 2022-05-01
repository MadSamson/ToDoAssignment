const express = require('express')
const router = express()
const {
    createTodoModel,
    listToDos
} = require('../models/todoModel')

router.post(('/create'), async(req, res) => {
    const todoinput = req.body
    const newToDo = await createTodoModel(todoinput)
    res.json(newToDo)
})

router.post('/listToDo', async(req,res)=>{
    const id = req.user.userId
    const allDoDos = await listToDos(id);
    res.json({ allDoDos });
})


module.exports = router