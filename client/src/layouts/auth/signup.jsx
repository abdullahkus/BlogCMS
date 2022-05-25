import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

export default function SignUp({ setIsSignUp, setAuth }) {
    //State
  const [error, setError] = useState(null)
  //validate
  const validations = yup.object().shape({
    firstName: yup.string().matches(/^[A-Za-z ]*$/, 'Lütfen sadece karakter giriniz.').required('Lütfen adınızı giriniz.'),
    lastName: yup.string().matches(/^[A-Za-z ]*$/, 'Lütfen sadece karakter giriniz.').required('Lütfen soyadınızı giriniz.'),
    email: yup
      .string()
      .email('Lütfen email giriniz.')
      .required('Lütfen email adresinizi giriniz.'),
    password: yup
      .string()
      .min(8, 'en az 8 karakter giriniz')
      .required('Lütfen şifrenizi giriniz.'),
  })
  //Auth
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: async (event) => {
      try {
        const body = {
          firstName: values.firstName,
          lastName: values.lastName,
          authority: 0,
          email: values.email,
          password: values.password,
        }
        const res = await fetch('http://localhost:4000/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if(res.status === 200) {
        const parseRes = await res.json()
        localStorage.setItem('token', parseRes.token)
        setAuth(true)
        } else {
          const parseRes = await res.json()
          setError(parseRes)
        }
      } catch (err) {
        console.error(err.message)
      }
    },
    validationSchema: validations,
  })
  return (
    <>
      <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='given-name'
              name='firstName'
              fullWidth
              id='firstName'
              onChange={handleChange}
              label={touched.firstName ? errors.firstName : 'Adınız'}
              error={touched.firstName && errors.firstName ? true : false}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='lastName'
              onChange={handleChange}
              label={touched.lastName ? errors.lastName : 'Soyadınız'}
              error={touched.lastName && errors.lastName ? true : false}
              name='lastName'
              autoComplete='family-name'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='email'
              onChange={handleChange}
              values={values.email}
              label={touched.email ? errors.email : 'Email'}
              error={touched.email && errors.email ? true : false}
              name='email'
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name='password'
              values={values.password}
              onChange={handleChange}
              label={touched.password ? errors.password : 'Şifreniz'}
              error={touched.password && errors.password ? true : false}
              type='password'
              id='password'
              autoComplete='new-password'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}>
             KAYIT OL
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Link
              style={{ cursor: 'alias' }}
              variant='body2'
              onClick={() => setIsSignUp(false)}>
              {'Zaten hesabınız varmı?'}
            </Link>
          </Grid>
        </Grid>
        {error ? (
              <Alert sx={{ mt: 2 }} spacing={2} severity='error'>
                { error }
              </Alert>
            ) : null}
      </Box>
    </>
  )
}
