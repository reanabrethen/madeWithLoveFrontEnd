import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import {Sheet} from '@mui/joy';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Layout from '../../components/Layout';

import { useEffect, useState } from 'react';
import axios  from 'axios'
import {jwtDecode} from 'jwt-decode'




// function ModeToggle() {
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = React.useState(false);

//   // necessary for server-side rendering
//   // because mode is undefined on the server
//   React.useEffect(() => {
//     setMounted(true);
//   }, []);
//   if (!mounted) {
//     return <Button variant="soft">Change mode</Button>;
//   }

//   return (
//     <Button
//       variant="soft"
//       onClick={() => {
//         setMode(mode === 'light' ? 'dark' : 'light');
//       }}
//     >
//       {mode === 'light' ? 'Turn dark' : 'Turn light'}
//     </Button>
//   );
// }

export default function LoginPage(props) {

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
    
  
  
  async function handleOnSubmit(event){
      event.preventDefault()
      try {
        const response = await axios.post("http://localhost:3000/user/login", {email, password})
        const decodedObj = jwtDecode(response.data.payload)
        window.localStorage.setItem('jwt', response.data.payload)
        props.handleUserLogin(decodedObj)
      } catch (error) {
        console.log(error)
      }
      setEmail("")
      setPassword("")
  }
  

  return (
    <Layout>
    <main>
      {/* <ModeToggle /> */}
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          // mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            // html input attribute
            name="password"
            type="password"
            placeholder="password"
            id='password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </FormControl>
        <Button 
            sx={{ mt: 1 /* margin top */ }}
            onClick={handleOnSubmit}
            >
              Log in
        </Button>
        <Typography
          endDecorator={<Link href="/sign-up">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </main>
   </Layout>
  );
}
