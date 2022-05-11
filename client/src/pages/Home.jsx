import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


export default function Home() {
    const [toDosList, setToDosList] = useState('')
    const [completedToDosList, setCompletedToDosList] = useState('')
    const [toDo, setToDo] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        getUndoneToDo()
        getCompeletedToDo()
    },[])

    function getUndoneToDo() {
        const token = localStorage.getItem('ToDoAssignment')
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
    function getCompeletedToDo() {
      const token = localStorage.getItem('ToDoAssignment')
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
        const url = 'http://localhost:4000/todo/complitedList'
        fetch(url, {
          method: 'GET',
          headers: headers,
        })
        .then(res=>res.json())
        .then(data => {
          setCompletedToDosList(data)
        })
    }

    function handleOnSubmit(e) {
      e.preventDefault()
      const payload = { 'description': toDo}
      const token = localStorage.getItem('ToDoAssignment')
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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

    function handleOnClick_finished(id) {
      const payload = { 'completed': true}
      const token = localStorage.getItem('ToDoAssignment')
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
      const url = `http://localhost:4000/todo/${id}`
      fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(payload)
      }).then(res => res.json())
      .then( data => {
        getUndoneToDo()
        getCompeletedToDo()
      })
    }

    function handleOnClick_return(id) {
      const payload = { 'completed': false}
      const token = localStorage.getItem('ToDoAssignment')
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
      const url = `http://localhost:4000/todo/${id}`
      fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(payload)
      }).then(res => res.json())
      .then( data => {
        getUndoneToDo()
        getCompeletedToDo()
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

      <h4>ToDos</h4>
      {toDosList && toDosList.map((item) => {
        if (item.completed === false) return (
          <ul key={item._id}>
            <li>
              <Link to={`/todo/${item._id}`}>
                {item.description}
                <br />
                {item.createdAt}
              </Link>
              <br />
              <button onClick={ e => handleOnClick_finished(item._id)}>Finished</button>
            </li>
            
          </ul>
        )
      })}
      <hr />

      <h4>completed</h4>
      {completedToDosList && completedToDosList.map((item) => {
        if (item.completed === true) return (
          <ul key={item._id}>
            <li>
              {item.description}
              <br />
              {item.createdAt}
              <br />
              <button onClick={ e => handleOnClick_return(item._id)}>Return to ToDos</button>
            </li>
            
          </ul>
        )
      })}
    </>
    
  )
}
