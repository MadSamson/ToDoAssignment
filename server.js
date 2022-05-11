const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const register = require('./controllers/register')
const login = require('./controllers/login')
const newToDo = require('./controllers/todo')
const multer = require('multer')
const {ToDo} = require('./models/todoModel')

const app = express()
const port = 4000
app.use(cors())
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
})
const upload = multer({ storage: storage })
app.use(upload.array('files'));
app.use('/uploads', express.static('./uploads'));

app.use((req, _res, next) => {
    const authHeader = req.header('Authorization');
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      req.user = jwt.verify(token, process.env.token_secret);
    }
    next();
});

app.post('/uploads/:todo_id', async(req,res)=>{
  const files = req.files
  console.log('files ====>',files)
  const uploadedFile = await ToDo.findOneAndUpdate(
    {'_id': req.params.todo_id},
    {'files': files},
    {new: true}
  )
  res.send('completed')
})

app.use('/', register)
app.use('/', login)
app.use('/todo', newToDo)


mongoose.connect('mongodb://localhost/todo-assignment')
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})