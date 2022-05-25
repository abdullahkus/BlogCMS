import { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import AuthortyContext from '../../../context/AuthortyContext'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom'

export default function GeneralSettings() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [settings, setSettings] = useState([])
  const navigate = useNavigate()

  const Authorty = useContext(AuthortyContext)
  useEffect(() => {
    if (!Authorty) {
      navigate('/')
    }
  },[Authorty, navigate])

  useEffect(() => {
    axios
      .get('http://localhost:4000/general-settings/')
      .then(function (res) {
        setSettings(res.data[0])
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  //validate
  const validations = yup.object().shape({
    logo: yup.string().required('Lütfen Logo giriniz.'),
    favicon: yup.string().required('Lütfen favicon giriniz.'),
    title: yup
      .string()
      .min(25, 'En az 25 karakter girmelisiniz.')
      .required('Lütfen başlığı giriniz.'),
    description: yup
      .string()
      .min(100, 'En az 100 karakter girmelisiniz.')
      .max(160, 'En fazla 160 karakter girmelisiniz.')
      .required('Lütfen açıklamayı giriniz.'),
    seo_title: yup.string().required('Lütfen seo başlığını giriniz.'),
    seo_description: yup.string().required('Lütfen seo açıklamasını giriniz.'),
  })
  //Auth
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: settings.title,
      description: settings.description,
      seo_title: settings.seo_title,
      seo_description: settings.seo_description,
      favicon: '',
      logo: '',
    },
    onSubmit: async (event) => {
      try {
        const body = {
          title: values.title,
          description: values.description,
          seo_title: values.seo_title,
          seo_description: values.seo_description,
          logo: values.logo,
          favicon: values.favicon,
        }
        const res = await fetch('http://localhost:4000/general-settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          setSuccess('Bilgileriniz başarıyla güncellendi.')
        } else {
        }
      } catch (err) {
        setError(err.message)
        console.error(err.message)
      }
    },
    validationSchema: validations,
  })

  return (
    <>
      <Box
        component='form'
        enctype='multipart/form-data'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
        <Box style={{ width: '100%' }}>
          <Typography variant='h4' gutterBottom>
            Genel Ayarlar
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, m: 2 }}>
          <Button sx={{ pt: 2, pb: 2 }} variant='contained' component='label'>
            <AddBoxIcon /> {touched.logo ? errors.logo : 'Logo'}
            <input
              type='file'
              name='logo'
              hidden
              value={values.logo}
              onChange={handleChange}
              multiple
            />
          </Button>

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id='filled-error-helper-text'
            label='Başlık'
            name='title'
            onChange={handleChange}
            value={values.title}
            error={errors.title}
            helperText={errors.title}
            defaultValue=' '
            variant='filled'
          />

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id='filled-error-helper-text'
            label='Açıklama'
            name='description'
            onChange={handleChange}
            value={values.description}
            error={errors.description}
            helperText={errors.description}
            defaultValue=' '
            variant='filled'
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, m: 2 }}>
          <Button sx={{ pt: 2, pb: 2 }} variant='contained' component='label'>
            <AddBoxIcon /> {touched.favicon ? errors.favicon : 'Favicon'}
            <input
              type='file'
              name='favicon'
              hidden
              value={values.favicon}
              onChange={handleChange}
              multiple
            />
          </Button>

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id='filled-error-helper-text'
            label='SEO Başlık'
            name='seo_title'
            onChange={handleChange}
            value={values.seo_title}
            error={errors.seo_title}
            helperText={errors.seo_title}
            defaultValue=' '
            variant='filled'
          />

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id='filled-error-helper-text'
            label='SEO Açıklaması'
            name='seo_description'
            onChange={handleChange}
            value={values.seo_description}
            error={errors.seo_description}
            helperText={errors.seo_description}
            defaultValue=' '
            variant='filled'
          />
          <Button type='submit' sx={{ mt: 2 }} variant='contained' fullWidth>
            Güncelle
          </Button>
          {success ? (
            <Alert sx={{ mt: 2 }} spacing={2} severity='success'>
              {success}
            </Alert>
          ) : null}
        </Box>
      </Box>
      {error ? (
        <Alert sx={{ mt: 2 }} spacing={2} severity='error'>
          {error}
        </Alert>
      ) : null}
    </>
  )
}
