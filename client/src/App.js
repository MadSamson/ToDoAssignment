import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register'
import Home from './pages/Home'
import ToDoDetail from './pages/ToDoDetail.jsx'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/todo/:toDoId" element={<ToDoDetail />} />
      </Routes>
    </div>
  );
}

export default App;
