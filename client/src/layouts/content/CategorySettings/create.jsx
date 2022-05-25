import { useState } from 'react'
import Box from '@mui/material/Box'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom'
//Ck Editör
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default function Create() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  //validate
  const validations = yup.object().shape({
    name: yup
      .string()
      .required('Lütfen kategori adını giriniz.'),
    title: yup
      .string()
      .min(25, 'En az 25 karakter girmelisiniz.')
      .required('Lütfen başlığı giriniz.'),
    description:yup.string().required('Lütfen kategori açıklamasını giriniz.'),
    seo_title: yup.string().required('Lütfen seo başlığını giriniz.'),
    seo_description: yup.string().required('Lütfen seo açıklamasını giriniz.'),
  })
  //Auth
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: '',
      title: '',
      description: '',
      seo_title: '',
      seo_description: '',
    },
    onSubmit: async (event) => {
      try {
        const body = {
          name: values.name,
          title: values.title,
          description: values.description,
          seo_title: values.seo_title,
          seo_description: values.seo_description,
        }
        const res = await fetch('http://localhost:4000/category-settings/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          setSuccess('Kategori başarıyla eklendi.')
          navigate('/category-settings')
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
      <Box component='form' enctype='multipart/form-data' onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          <Box style={{ width: '100%' }}>
            <Typography variant='h4' gutterBottom>
              Yeni Kategori Oluştur
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, m: 2 }}>
            <TextField
              fullWidth
              id='filled-error-helper-text'
              label='Adı'
              name='name'
              onChange={handleChange}
              value={values.name}
              error={errors.name}
              helperText={errors.name}
              defaultValue=' '
              variant='filled'
            />
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
            <TextField
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
              label='SEO Açıklama'
              name='seo_description'
              onChange={handleChange}
              value={values.seo_description}
              error={errors.seo_description}
              helperText={errors.seo_description}
              defaultValue=' '
              variant='filled'
            />
          </Box>
        </Box>
        <Box sx={{ m: 2 }}>

          <Button type='submit' sx={{ mt: 2 }} variant='contained' fullWidth>
            Gönder
          </Button>
          {success ? (
            <Alert sx={{ mt: 2 }} spacing={2} severity='success'>
              {success}
            </Alert>
          ) : null}
          {error ? (
            <Alert sx={{ mt: 2 }} spacing={2} severity='error'>
              {error}
            </Alert>
          ) : null}
        </Box>
      </Box>
    </>
  )
}
