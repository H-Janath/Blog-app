import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import About from './pages/About'
import Header from './componenet/Header'
import Footer from './componenet/Footer'
import PrivateRoute from './componenet/PrivateRoute'
import OnlyAdminPrivateRoute from './componenet/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path='/create-post' element={<CreatePost/>}/>
          <Route path='/update-post/:postId' element={<UpdatePost/>}/>
      </Route>
      <Route path='/project' element={<Project/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}