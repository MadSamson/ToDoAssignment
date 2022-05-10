import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


export default function Home() {
    const [toDosList, setToDosList] = useState('')
    const [toDo, setToDo] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        getUndoneToDo()
    },[])

    function getUndoneToDo() {
        const token = localStorage.getItem('ToDoAssignment')
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
        const url = 'http://localhost:4000/todo/listToDo'
        fetch(url, {
          method: 'GET',
          headers: headers,
        })
        .then(res=>res.json())
        .then(data => {
          setToDosList(data)
        })
    }

    function handleOnSubmit(e) {
      e.preventDefault()
      const payload = { 'description': toDo}
      const token = localStorage.getItem('ToDoAssignment')
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
      const url = 'http://localhost:4000/todo/create'

      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        getUndoneToDo()
      })
    }
    
    function logout() {
      localStorage.removeItem('ToDoAssignment')
      navigate('/login')
    }

  return (
    <>
      <button onClick={logout}>logout</button>
      <form onSubmit={handleOnSubmit}>
        Add a new task: <input type="text" value={toDo} onChange={e => setToDo(e.target.value)}/>
        <input type='submit' value='Create'/>
      </form>

      {toDosList && toDosList.map((item) => {
        return (
          <ul key={item._id}>
            <li>{item.description}</li>
          </ul>
        )
      })}
    </>
    
  )
}
