const express = require('express')
const router = express()
const {createUser} = require('../models/userModel')

router.post('/register', async (req,res)=>{
    const {username, password} = req.body
    createUser({username, password})
    res.json(username)
})

module.exports = router