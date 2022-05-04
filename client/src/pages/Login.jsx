import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function StartPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    function handleOnSubmit(e){
        e.preventDefault()
        const loginPath = 'http://localhost:4000/login'
        const payload = {username,password}
        
        fetch(loginPath, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('ToDoAssignment', data.token)
        })
        navigate('/home')    
    }

    return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' value={username} onChange={e => setUsername(e.target.value)}/>
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <br />
            <input type="submit" value='Sign in'/>
        </form> 
    </div>
    )
}