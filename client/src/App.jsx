import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import About from './pages/About'
import Header from './componenet/Header'
import Footer from './componenet/Footer'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/project' element={<Project/>}/>
     
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}