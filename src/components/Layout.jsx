import { CssBaseline, Box } from '@mui/material'
import React from 'react'
import Header from './Header'
import Footer from './Footer'




function Layout({children}) {
  return (
   <>
  
        <Box sx={{display:"flex", flexDirection:"column", minHeight:"100vh"}}>
            <Header/>
            <Box p={4} sx={{flexGrow:1, overflow:"hidden"}}>
                {children}
            </Box>
            <Footer/>
        </Box>
   </>
  )
}

export default Layout