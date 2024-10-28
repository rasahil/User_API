
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { MainNavbar } from './Components/MainNavbar'
import { SignUp } from './Components/SignUp'
import { SignIn } from './Components/SignIn'
import Profile from './Components/Profile'

function App() {
  

  return (
    <>
    <div >
      <div >
        <MainNavbar/>

      </div>
      <div>
        <Routes>
          
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </div>
      </div>
    </>
  )
}

export default App
