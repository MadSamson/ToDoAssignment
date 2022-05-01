const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const register = require('./controllers/register')
const login = require('./controllers/login')
const newToDo = require('./controllers/todo')
const listToDo = require('./controllers/todo')
const completeAToDo = require('./controllers/todo')
const complitedList = require('./controllers/todo')
const app = express()
const port = 4000
app.use(cors())
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use((req, _res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      req.user = jwt.verify(token, process.env.token_secret);
    }
    next();
  });

app.use('/', register)
app.use('/', login)
app.use('/todo', newToDo)
app.use('/todo', listToDo)
app.use('/todo', complitedList)
app.use('/todo', completeAToDo)

mongoose.connect('mongodb://localhost/todo-assignment')
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})