const express = require('express')
const router = express()
const {createUser} = require('../models/userModel')
const {User} = require('../models/userModel')

router.post('/register', async (req,res)=>{
    const {username, password} = req.body
    // const newUser = createUser({username, password})
    // res.json(newUser)
    if(await User.findOne({username})){
        res.json('username already exists').status(400)
    } else {
        const user = new User({username, password})
        await user.save()
        res.json('account successfully created')
    }
})

module.exports = router