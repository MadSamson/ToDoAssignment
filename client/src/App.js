import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

export default App;
