import React from 'react'
// import Layout from './components/Layout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'


//usestate inside of app --> maintaining user
//user start as a null
//use effect-->check if JWT is stored in local storage
//if there is --> decode and save as user

// const [user, setUser] = useState("")

// useEffect(() => {
//   first

//   return () => {
//     second
//   }
// }, [third])



function App() {
  return (
   <Router>
      <Routes>
        <Route path='/home-page' element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/sign-up' element={<SignUpPage/>}/>
      </Routes>
   </Router>
   
  )
}

export default App