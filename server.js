const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 4000
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=>{
    res.json('hello node')
})

mongoose.connect('mongodb://localhost/todo-assignment')
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})