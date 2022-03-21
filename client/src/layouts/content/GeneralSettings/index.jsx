import { useState } from 'react'
import Box from '@mui/material/Box'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Alert from '@mui/material/Alert'

export default function GeneralSettings() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  //validate
  const validations = yup.object().shape({
    logo: yup.string().required('Lütfen logo giriniz.'),
    favicon: yup.string().required('Lütfen favicon giriniz.'),
    title: yup.string().min(25, "En az 25 karakter girmelisiniz.").required('Lütfen başlığı giriniz.'),
    description: yup.string().min(100, "En az 100 karakter girmelisiniz.").max(160, "En fazla 160 karakter girmelisiniz.").required('Lütfen açıklamayı giriniz.'),
    seo_title: yup.string().required('Lütfen seo başlığını giriniz.'),
    seo_description: yup.string().required('Lütfen seo açıklamasını giriniz.'),
  })
  //Auth
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      title: '',
      description: '',
      seo_title: '',
      seo_description: '',
      logo: '',
      favicon: '',
    },
    onSubmit: async (event) => {
      try {
        console.log(event)
        const body = {
          title: values.title,
          description: values.description,
          seo_title: values.seo_title,
          seo_description: values.seo_description,
          logo: values.logo,
          favicon: values.favicon,
        }
        const res = await fetch('http://localhost:4000/general-settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          const parseRes = await res.json()
          setSuccess('Bilgileriniz başarıyla güncellendi.')
        } else {
          const parseRes = await res.json()
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
        enctype="multipart/form-data"
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
          <Button variant='contained' component='label'>
            <AddBoxIcon /> {touched.logo ? errors.logo : 'Logo'}
            <input type='file' name='logo' hidden values={values.logo} onChange={handleChange} />
          </Button>
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id='filled-basic'
            name='title'
            variant='filled'
            values={values.title}
            onChange={handleChange}
            label={touched.title ? errors.title : 'Başlık'}
            error={touched.title && errors.title ? true : false}
          />
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id='filled-basic'
            name='description'
            variant='filled'
            values={values.description}
            onChange={handleChange}
            label={touched.description ? errors.description : 'Açıklama'}
            error={touched.description && errors.description ? true : false}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, m: 2 }}>
          <Button variant='contained' component='label'>
            <AddBoxIcon /> {touched.favicon ? errors.favicon : 'Favicon'}
            <input
              type='file'
              name='favicon'
              hidden
              values={values.favicon}
              onChange={handleChange}
            />
          </Button>
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id='filled-basic'
            name='seo_title'
            variant='filled'
            values={values.seo_title}
            onChange={handleChange}
            label={touched.seo_title ? errors.seo_title : 'SEO Başlık'}
            error={touched.seo_title && errors.seo_title ? true : false}
          />
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id='filled-basic'
            name='seo_description'
            variant='filled'
            values={values.seo_description}
            onChange={handleChange}
            label={touched.seo_description ? errors.seo_description : 'SEO Açıklaması'}
            error={touched.seo_description && errors.seo_description ? true : false}
          />
          <Button type='submit' sx={{ mt: 2 }} variant='contained' fullWidth>
            Gönder
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
