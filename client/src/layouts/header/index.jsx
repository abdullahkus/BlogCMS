import { useContext } from 'react'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import MenuIcon from '@mui/icons-material/Menu'
import SetAuthortyContext from '../../context/SetAuthortyContext'

import Mode from './mode'
const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default function Header({ open, setOpen, setAuth }) {
  const Authorty = useContext(SetAuthortyContext)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  //auth
  const logout = () => {
    localStorage.removeItem('token')
    setAuth(false)
    Authorty(false)
  }

  return (
    <AppBar position='fixed' open={open}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{
            flexGrow: 1,
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}>
          <MenuIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 60 }} variant='h6' noWrap component='div'>
          BlogCMS
        </Typography>
        <Mode />

        <Button variant='contained' href='#contained-buttons' onClick={() => logout()}>
          Çıkış
        </Button>
      </Toolbar>
    </AppBar>
  )
}
