import '@/App.css'
import '@/index.css'
import NavBar from './PageComponents/NavBar'

import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import About from './Pages/About'
import Explore from './Pages/Explore/Explore'

// this will include all the pages where navbar shouldn's show up
export const NoNavBarPages = [
  '/login',
  '/signUp',
]

function App() {

  return (
    <div>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/explore' element={<Explore />} />
        </Routes>
      </div>
      <div>
        <Routes>
          {/* USE SEARCH PARAMS OF CALLBACK URL TO HANDLE LOGIN AND SIGNUP */}
          <Route path='/login' element={<Login />} /> 
          <Route path='/signUp' element={<SignUp />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
