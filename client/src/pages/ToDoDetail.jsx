import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

export default function ToDoDetail() {
    const [toDoDetail, setToDoDetail] = useState('')
    const [description, setDescription] = useState('')
    const [longDescription, setLongDescription] = useState('')
    const [files, setFiles] = useState(null)
    let {toDoId}  = useParams()
    useEffect(()=>{
        getToDoDetail()
    }, [])
    const token = localStorage.getItem('ToDoAssignment')

    function getToDoDetail() {
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

    function handleOnSubmitFiles(e) {
        e.preventDefault()
        const url = `http://localhost:4000/uploads/${toDoId}`
        console.log(url);
        const form = new FormData()
        
        for (let i = 0; i < files.length; i++) {
            form.append("files", files[i]);
        }

        fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form,
        }).then(res => res.text())
        .then(data =>{
            console.log(data)
            getToDoDetail()
        })
    }

    function handleOnClick_removeFiles(id) {
        const url = `http://localhost:4000/delete/${toDoId}`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
        fetch(url, {
            method: 'PUT',
            headers: headers,
        }).then(res => res.text())
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
                <br />
                Attachment: {
                    toDoDetail.files && toDoDetail.files.map((item, i)=>{
                        return(
                            <ul key={i}>
                                <li>{item.originalname}</li>
                            </ul>
                        )
                    })
                }
                <br />
                <button onClick={e => handleOnClick_removeFiles(toDoDetail._id)}>Remove</button>
            </div>
        )}
        <hr />
        <form onSubmit={handleOnSubmit}>
            title: <input type='text' value={description} onChange={e => setDescription(e.target.value)}/>
            <br />
            Description: <input type='text' value={longDescription} onChange={e => setLongDescription(e.target.value)}/>
            <input type="submit" value='submit' />
        </form>
        <br />
        <form onSubmit={handleOnSubmitFiles}>
            <input type="file" name="file" onChange={e=> setFiles(e.target.files)} multiple required/>
            <input type="submit" value="upload" />
        </form>
    </div>
  )
}
