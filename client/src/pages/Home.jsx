import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


export default function Home() {
    const [userData, setUserData] = useState('')
    const [toDos, setToDos] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        getUndoneToDo()
    },[])

    function getUndoneToDo() {
        const token = localStorage.getItem('ToDoAssignment')
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        const url = 'http://localhost:4000/todo/listToDo'
        fetch(url, {
          method: "GET",
          headers: headers,
        })
        .then(res=>res.json())
        .then(data => {
          setToDos(data)
        })
    }
    function logout() {
      localStorage.removeItem('ToDoAssignment')
      navigate('/login')
    }

  return (
    <>
    <button onClick={logout}>logout</button>
    <div>Home</div>
    {toDos && toDos.map((item) => {
      return (
        <div key='{item.id}'>
          {item.by}
          <br />
          {item.description}
        </div>
      )
    })}
    </>
    
  )
}
