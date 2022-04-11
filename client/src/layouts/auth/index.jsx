import { useState } from 'react'
import SignUp from './signup'
import SignIn from './signin'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
export default function Auth({ setAuth }) {
  const [isSignUp, setIsSignUp] = useState(false)
  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {isSignUp ? '' : ''}
          </Typography>
          {isSignUp ? (
            <SignUp setIsSignUp={setIsSignUp} setAuth={setAuth} />
          ) : (
            <SignIn setIsSignUp={setIsSignUp} setAuth={setAuth} />
          )}
        </Box>
      </Container>
    </>
  )
}
