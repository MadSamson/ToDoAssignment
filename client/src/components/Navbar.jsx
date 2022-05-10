import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate= useNavigate()
  return (
    <div>
        <a href='/login'>Login |</a>
        <a href='/register'> Register |</a>
    </div>
  )
}
