
import { Route, Routes } from 'react-router'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Me from './pages/Me'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Map from './pages/Map'

function App() {

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register/> } />
        <Route path='/login' element={<Login/> } />
        <Route path='/me' element={<ProtectedRoute><Me /></ProtectedRoute> } />
        <Route path='/map' element={<ProtectedRoute><Map /></ProtectedRoute> } />
        <Route path='*' element="404 not fond"/>
      </Routes>
    </>
  )
}

export default App
