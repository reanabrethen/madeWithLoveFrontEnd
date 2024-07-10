import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
   <AppBar position='fixed' style={{backgroundColor: "rgb(139, 0, 0)"}}>
        <Toolbar>
            <Link to="/home-page" style={{color: "white"}}><HomeIcon/></Link>
            <Typography variant='h6' component="div" sx={{flexGrow:1}} style={{textAlign:"center"}} >
               Made With Love
            </Typography>
            <Link to="/login"><Button style={{color:"white"}}>Login</Button></Link>
            <Link to="/sign-up"><Button style={{color:"white"}}>Sign-Up</Button></Link>
        </Toolbar>
   </AppBar>
  )
}

export default Header