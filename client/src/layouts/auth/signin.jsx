import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
export default function SignIn({ setIsSignUp, setAuth }) {
  //validate
  const validations = yup.object().shape({
    email: yup
      .string()
      .email('Lütfen email giriniz.')
      .required('Lütfen email adresinizi giriniz.'),
    password: yup
      .string()
      .required('Lütfen şifrenizi giriniz.'),
  })
  //Auth
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (event) => {
      try {
        const body = {
          email: values.email,
          password: values.password,
        }
        const res = await fetch('http://localhost:4000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          const parseRes = await res.json()
          localStorage.setItem('token', parseRes.token)
          setAuth(true)
        }
      } catch (err) {
        console.error(err.message)
      }
    },
    validationSchema: validations,
  })

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Box component='form' sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin='normal'
              fullWidth
              id='email'
              name='email'
              values={values.email}
              onChange={handleChange}
              label={touched.email ? errors.email : 'Email'}
              error={touched.email && errors.email ? true : false}
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              fullWidth
              name='password'
              values={values.password}
              onChange={handleChange}
              label={touched.password ? errors.password : 'Password'}
              error={touched.password && errors.password ? true : false}
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  style={{ cursor: 'alias' }}
                  variant='body2'
                  onClick={() => setIsSignUp(true)}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}
