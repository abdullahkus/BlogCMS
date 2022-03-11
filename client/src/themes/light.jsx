import { createTheme } from '@mui/material/styles'

export const light = createTheme({
  palette: {
    type: 'light',
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
    text: {
      primary: '#1b1f23',
    },
    primary: {
      main: '#B71C1C',
      light: '#C54949',
      dark: '#801313',
    },
    secondary: {
      main: '#1b1f23',
      light: '#484B4F',
      dark: '#121518'
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
})
