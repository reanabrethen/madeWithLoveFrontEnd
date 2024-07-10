import {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import { Box } from '@mui/material'
import {Button, CssBaseline, FormControl, FormLabel, Input, Typography} from '@mui/material'
import { NavLink } from 'react-router-dom'
import Axios  from '../../utils/Axios'
import {jwtDecode} from 'jwt-decode'


function LoginPage(props) {

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")



useEffect(() => {
  const loginUser = async ()=>{
    try {
        const loggedInUser = await Axios.post("http://localhost:3000/user/login", {
            email: email,
            password: password
        })
        setEmail(loggedInUser.data.payload.email)
        setPassword(loggedInUser.data.payload.password)
    }catch (error) {
    console.log(error.message)
    }
  } 
  if(props.user){
    loginUser()
  }
 }, [props.user, email, password])
  


async function handleOnSubmit(e){
    e.preventDefault()
    try {
      const user = await Axios.post("/login", {email, password})
      const currentUser = jwtDecode(user.data.payload)
      localStorage.setItem("jwt", user.data.payload)
      setEmail(currentUser)
    } catch (error) {
      console.log(error)
    }
    setEmail("")
    setPassword("")
}
 
  return (
    <Layout>
             <Box>
                  <Typography>Sign in to continue.</Typography>
            </Box>
            <Box>
                <Typography component="h3">
                    <b>Login</b>
                </Typography>
            </Box>   
            <form onSubmit={handleOnSubmit}>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                type="text"
                id='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                type="password"
                id='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Box>
                <Button>Submit</Button>
                <div>
                    <p>Don't have an account? Sign-up <NavLink to="/sign-up">here</NavLink></p>
                </div>
            </Box>
            </form>
    </Layout>
  )
}

export default LoginPage
















// import {Button, CssBaseline, FormControl, FormLabel, Input, Link, Typography, Sheet} from '@mui/joy';
// import Layout from '../components/Layout';
// import { Box } from '@mui/material';



// import axios from 'axios'
// import {toast} from 'react-toastify'
// import {jwtDecode} from 'jwt-decode'

// import Layout from '../components/Layout'
// import { Box, CssBaseline, FormControl, FormLabel, Input, Typography } from '@mui/material'
// import Sheet from '@mui/joy/Sheet'

// export class Login extends Component {

//     state = { 
//         email: "",
//         password: ""
//     }

//     handleOnChange = (event) =>{
//         this.setState({[event.target.name]: event.target.value})
//     }

 
//     handleOnSubmit = async (event)=>{
//         event.preventDefault()
//         try {
//             const response = await axios.post('http://localhost:3000/user/login', {
//                 email: this.state.email,
//                 password: this.state.password
//             })
//             const decodedObj = jwtDecode(response.data.payload)
//             toast.success(`Hello ${decodedObj.username}`)
//             window.localStorage.setItem('jwt', response.data.payload)
//             this.props.handleUserLogin(decodedObj)
//         } catch (error) {
//             // console.log(error)
//             toast.error(error.response.data)
//         }
//     }


//   render() {
//     return (
//         <Layout>
//             <CssBaseline/>
//             <Sheet
//                 sx={{
//                               width: 300,
//                               mx: 'auto', // margin left & right
//                               my: 4, // margin top & bottom
//                               py: 3, // padding top & bottom
//                               px: 2, // padding left & right
//                               display: 'flex',
//                               flexDirection: 'column',
//                               gap: 2,
//                               borderRadius: 'sm',
//                               boxShadow: 'md',
//                             }}
//                             variant="outlined"
//                 />
//             <div>
//                     <Typography component="h1" level="h1">
//                     <b>Welcome!</b>
//                     </Typography>
//                     <Typography level="body-sm">Sign in to continue.</Typography>
//             </div>
//             <Box>
//                 <Typography level="h5" component="h3">
//                     <b>Login</b>
//                 </Typography>
//             </Box>   
//             <FormControl>
//                 <FormLabel>Email</FormLabel>
//                 <Input
//                 type="text"
//                 id='email'
//                 placeholder='Email'
//                 name='email'
//                 value={this.state.email}
//                 onChange={this.handleOnChange}
//                 />
//             </FormControl>
//             <FormControl>
//                 <FormLabel>Password</FormLabel>
//                 <Input
//                 type="password"
//                 id='password'
//                 placeholder='Password'
//                 name='password'
//                 value={this.state.password}
//                 onChange={this.handleOnChange}
//                 />
//             </FormControl>
        
//                 <form>
                
//                 <div className="button-container">
//                     <button type="submit" onClick={this.handleOnSubmit}>Submit</button>
//                 </div>
//                 <div className='login-direct'>
//                     <p>Don't have an account? Sign-up <NavLink to="/sign-up">here</NavLink></p>
//                 </div>
//             </form>
//       </Layout>
//     )
// }
// }
  


// export default Login




/* 
//   return (
//    <>
//       <CssBaseline />
////       <Sheet */
//{/* //         sx={{ */}
//{/* //           width: 300,
//           mx: 'auto', // margin left & right
//           my: 4, // margin top & bottom
//           py: 3, // padding top & bottom
//           px: 2, // padding left & right
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//           borderRadius: 'sm',
//           boxShadow: 'md',
//         }}
//         variant="outlined"
//       >
//         <div>
//           <Typography level="h4" component="h1">
//             <b>Welcome!</b>
//           </Typography>
//           <Typography level="body-sm">Sign in to continue.</Typography>
//         </div>
//         <FormControl>
//           <FormLabel>Email</FormLabel>
//           <Input
//             // html input attribute
//             name="email"
//             type="email"
//             placeholder="johndoe@email.com"
//           />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Password</FormLabel>
//           <Input
//             // html input attribute
//             name="password"
//             type="password"
//             placeholder="password"
//           />
//         </FormControl>
        // <Button sx={{ mt: 1 /* margin top */ //}}>Log in</Button>
//         <Typography
//           endDecorator={<Link href="/sign-up">Sign up</Link>}
//           fontSize="sm"
//           sx={{ alignSelf: 'center' }}
//         >
//           Don&apos;t have an account?
//         </Typography>
//       </Sheet>
        
//       </>
//   );