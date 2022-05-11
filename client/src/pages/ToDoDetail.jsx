import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

export default function ToDoDetail() {
    const [toDoDetail, setToDoDetail] = useState('')
    const [description, setDescription] = useState('')
    console.log(description);
    let {toDoId}  = useParams()
    useEffect(()=>{
        getToDoDetail()
    }, [])

    function getToDoDetail() {
        const token = localStorage.getItem('ToDoAssignment')
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
        const url = `http://localhost:4000/todo/${toDoId}`
        fetch(url, {
          method: 'GET',
          headers,
        })
        .then(res=>res.json())
        .then(data => {
          console.log(data)
          setToDoDetail(data)
        })
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('ToDoAssignment')
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
        const url = `http://localhost:4000/todo/${toDoId}/detail`
        const payload = { 'description': description }
        fetch(url,{
            method:'PUT',
            headers: headers,
            body: JSON.stringify(payload)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            getToDoDetail()
        })
    }

  return (
    <div>
        <h4>ToDoDetail</h4>
        {toDoDetail && (
            <div>
                Description: {toDoDetail.description}
                <br />
                Created at: {toDoDetail.createdAt}
            </div>
        )}
        <hr />
        <form onSubmit={handleOnSubmit}>
            A new description: <input type='text' value={description} onChange={e => setDescription(e.target.value)}/>
            <input type="submit" value='submit' />
        </form>
    </div>
  )
}
