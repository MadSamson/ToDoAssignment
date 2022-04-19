const express = require('express')
const router = express()
const {createUser} = require('../models/userModel')

router.post('/register', async (req,res)=>{
    const {username, password} = req.body
    const value = createUser({username, password})
    res.json(value)
})

module.exports = router