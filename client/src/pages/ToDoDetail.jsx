import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

export default function ToDoDetail() {
    const [toDoDetail, setToDoDetail] = useState('')
    const [description, setDescription] = useState('')
    const [longDescription, setLongDescription] = useState('')
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
          setToDoDetail()
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
        const payload = { 'description': description, 'LongDescription':longDescription}
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
                Title: {toDoDetail.description}
                <br />
                Description: {toDoDetail.LongDescription}
                <br />
                Created at: {toDoDetail.createdAt}
            </div>
        )}
        <hr />
        <form onSubmit={handleOnSubmit}>
            title: <input type='text' value={description} onChange={e => setDescription(e.target.value)}/>
            <br />
            Description: <input type='text' value={longDescription} onChange={e => setLongDescription(e.target.value)}/>
            <input type="submit" value='submit' />
        </form>
    </div>
  )
}
