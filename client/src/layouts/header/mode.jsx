// React
import { useContext } from 'react'
// Component
import ThemeContext from '../../context/ThemeContext'
import { IconButton } from '@mui/material'
// MUI
import { useTheme } from '@mui/material/styles'
import { Brightness7, Brightness4 } from '@mui/icons-material'

export default function Mode() {
  const theme = useTheme()
  const themeMode = useContext(ThemeContext)
  return (
    <div>
      <IconButton onClick={themeMode.toggleThemeMode} color='inherit'>
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </div>
  )
}
