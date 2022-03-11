import { createTheme } from '@mui/material/styles'

export const dark = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1B1F23',
      paper: '#21262D',
    },
    text: {
      primary: '#C9D1D9',
    },
    primary: {
      main: '#B71C1C',
      light: '#C54949',
      dark: '#801313',
    },
    secondary: {
      main: '#1b1f23',
      light: '#484B4F',
      dark: '#121518',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  props: {
    MuiAppBar: {
      color: 'transparent',
    },
  },
})
