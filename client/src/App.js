import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default App;
