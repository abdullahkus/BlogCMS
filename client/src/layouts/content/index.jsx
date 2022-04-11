import * as React from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
//components
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export default function index() {
  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Outlet />
    </Box>
  )
}
