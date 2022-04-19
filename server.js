const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const register = require('./controllers/register')
const app = express()
const port = 4000
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/', register)

mongoose.connect('mongodb://localhost/todo-assignment')
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})