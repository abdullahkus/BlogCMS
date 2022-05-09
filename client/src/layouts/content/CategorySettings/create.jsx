import { useState } from 'react'
import Box from '@mui/material/Box'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Alert from '@mui/material/Alert'
//Ck Editör
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default function Create() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  //validate
  const validations = yup.object().shape({
    image: yup.string().required('Lütfen Resim giriniz.'),
    keywords: yup.string().required('Lütfen Anahtar Kelime giriniz.'),
    name: yup
      .string()
      .min(25, 'En az 25 karakter girmelisiniz.')
      .required('Lütfen başlığı giriniz.'),
    content: yup.string().required('Lütfen içerik giriniz.'),
    seo_title: yup.string().required('Lütfen seo başlığını giriniz.'),
    seo_description: yup.string().required('Lütfen seo açıklamasını giriniz.'),
  })
  //Auth
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: '',
      content: '',
      seo_title: '',
      seo_description: '',
      keywords: '',
      image: '',
    },
    onSubmit: async (event) => {
      try {
        const body = {
          name: values.name,
          content: values.content,
          seo_title: values.seo_title,
          seo_description: values.seo_description,
          image: values.image,
          keywords: values.keywords,
        }
        const res = await fetch('http://localhost:4000/blog-settings/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          const parseRes = await res.json()
          setSuccess('Blog yazısı başarıyla eklendi.')
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
      <Box component='form' enctype='multipart/form-data' onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          <Box style={{ width: '100%' }}>
            <Typography variant='h4' gutterBottom>
              Yeni Blog Yazısı Oluştur
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, m: 2 }}>
            <Button sx={{ pt: 2, pb: 2 }} variant='contained' component='label'>
              <AddBoxIcon /> {touched.image ? errors.image : 'Resim'}
              <input
                type='file'
                name='image'
                hidden
                values={values.image}
                onChange={handleChange}
                multiple
              />
            </Button>

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id='filled-error-helper-text'
              label='Başlık'
              name='name'
              onChange={handleChange}
              value={values.name}
              error={errors.name}
              helperText={errors.name}
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

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id='filled-error-helper-text'
              label='SEO Başlık'
              name='keywords'
              onChange={handleChange}
              value={values.keywords}
              error={errors.keywords}
              helperText={errors.keywords}
              defaultValue=' '
              variant='filled'
            />
          </Box>
        </Box>
        <Box sx={{ m: 2 }}>
          <CKEditor
            editor={ClassicEditor}
            data='<p>Merhaba, Dünya.</p>'
            onChange={(event, editor) => {
              const data = editor.getData()
              values.content = data
            }}
          />
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
