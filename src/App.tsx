import '@/App.css'
import '@/index.css'
import NavBar from './PageComponents/Navbar/NavBar'

import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import About from './Pages/About'
import Explore from './Pages/Explore/Explore'
import Home from './Pages/Home'
import Login from './Pages/Login/Login'
import MyRecipe from './Pages/MyRecipe/MyRecipe'
import Recipe from './Pages/Recipe/Recipe'
import SignUp from './Pages/SignUp/SignUp'
import { useAuthContext } from './context/authContext'
import Setting from './Pages/Setting/Setting'

// this will include all the pages where navbar shouldn's show up
export const NoNavBarPages = [
  '/login',
  '/signUp',
]

function App() {

  const location = useLocation()
  const { loading, user} = useAuthContext()
  
  if(loading) return
  
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
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/explore' />} /> 
          <Route path='/signUp' element={!user ? <SignUp /> : <Navigate to='/explore' />}/>
        </Routes>
      </div>
      <div>
        <Routes>
          {/* USE FOR USER AND RECIPE NEEDED TO BE AUTHENTICATED */}
          <Route path='/recipe/:id' element={<Recipe />  }/>
          <Route path='/myrecipe/*' element={user ? <MyRecipe /> : <Navigate to={`/login?next=${location.pathname}`} />} />
          <Route path='/profile' element={user ? null : <Navigate to={`/login?next=${location.pathname}`} />} />
          <Route path='/settings' element={user ? <Setting /> : <Navigate to={`/login?next=${location.pathname}`} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
