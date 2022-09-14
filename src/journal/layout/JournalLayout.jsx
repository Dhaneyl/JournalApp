import { Box } from '@mui/system'
import React from 'react'
import { NavBar, SideBar } from '../components';

const drawerWidth = 280;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display:'flex'}}>

        {/* NavBar drawerWidth*/}
        <NavBar drawerWidth={drawerWidth}/>

      

        {/*  Sidebar drawerWidth*/}
        <SideBar drawerWidth={drawerWidth}/>

        <Box
        component='main'
        sx={{ flexGrow:1, p:3, mt: 8}}
        >
        
        {/*  Toolbar */}

        {children}

        </Box>
    </Box>
  )
}
