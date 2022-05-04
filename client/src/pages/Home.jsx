import React from 'react'
import {useState, useEffect} from 'react'


export default function Home() {
    const [userData, setUserData] = useState('')
    const [toDos, setToDos] = useState('')
    
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
    }

  return (
    <div>Home</div>
  )
}
