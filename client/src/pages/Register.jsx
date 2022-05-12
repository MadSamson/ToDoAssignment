import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function StartPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    function handleOnSubmit(e){
        e.preventDefault()
        const registerPath = 'http://localhost:4000/register'
        const payload = {username,password}
        
        fetch(registerPath, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            if (data === 'username already exists') {
                console.log(data)
                setMessage(data)
                navigate('/register')
            } else (
                navigate('/login')
            )
        })
        
    }

    return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' value={username} onChange={e => setUsername(e.target.value)} required/>
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={e => setPassword(e.target.value)} required/>
            <br />
            <input type="submit" value='Create'/>
            <br />
            <div>{message}</div>
        </form> 
    </div>
    )
}