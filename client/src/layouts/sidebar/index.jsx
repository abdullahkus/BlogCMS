import { useContext } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MUILink from '@mui/material/Link'
import { Link } from 'react-router-dom'
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings'
import HomeIcon from '@mui/icons-material/Home'
import BookIcon from '@mui/icons-material/Book'
import PagesIcon from '@mui/icons-material/Pages'
import CategoryIcon from '@mui/icons-material/Category'
import AuthortyContext from '../../context/AuthortyContext'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export default function Sidebar({ open, setOpen }) {
  const theme = useTheme()
  const Authorty = useContext(AuthortyContext)
  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <Drawer variant='permanent' open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <MUILink component={Link} underline='none' to='/'>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Anasayfa' sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </MUILink>
        {Authorty && (
          <MUILink component={Link} underline='none' to='/general-settings'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                <DisplaySettingsIcon />
              </ListItemIcon>
              <ListItemText primary='Site Genel Ayarları' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </MUILink>
        )}
        <MUILink component={Link} underline='none' to='/blog-settings'>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary='Blog Ayarları' sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </MUILink>
        <MUILink component={Link} underline='none' to='/category-settings'>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary='Kategori Ayarları' sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </MUILink>
        <MUILink component={Link} underline='none' to='/page-settings'>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}>
              <PagesIcon />
            </ListItemIcon>
            <ListItemText primary='Sayfa Ayarları' sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </MUILink>
      </List>
      <Divider />
    </Drawer>
  )
}
