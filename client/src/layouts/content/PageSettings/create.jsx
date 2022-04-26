import { useState } from 'react'
import Box from '@mui/material/Box'
import { useFormik } from 'formik'
import * as yup from 'yup'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
//Ck Editör
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default function Create() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  //validate
  const validations = yup.object().shape({
    page_name: yup.string().required('Lütfen sayfa adını giriniz.'),
    page_description: yup.string().required('Lütfen açıklama giriniz.'),
    content: yup.string().required('Lütfen içerik giriniz.'),
    seo_title: yup.string().required('Lütfen seo başlığını giriniz.'),
    seo_description: yup.string().required('Lütfen seo açıklamasını giriniz.'),
  })
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      page_name: '',
      page_description: '',
      seo_title: '',
      seo_description: '',
      content: '',
    },
    onSubmit: async (event) => {
      try {
        const body = {
          pageName: values.page_name,
          pageDescription: values.page_description,
          seoTitle: values.seo_title,
          seoDescription: values.seo_description,
          content: values.content,
        }
        const res = await fetch('http://localhost:4000/page-settings/create', {
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
              Yeni Sayfa Oluştur
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, m: 2 }}>
            <TextField
              fullWidth
              id='filled-basic'
              name='page_name'
              variant='filled'
              values={values.page_name}
              onChange={handleChange}
              label={touched.page_name ? errors.page_name : 'Sayfa Adı'}
              error={touched.page_name && errors.page_name ? true : false}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id='filled-basic'
              name='page_description'
              variant='filled'
              values={values.page_description}
              onChange={handleChange}
              label={touched.page_description ? errors.page_description : 'Sayfa Açıklaması'}
              error={touched.page_description && errors.page_description ? true : false}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, m: 2 }}>
            <TextField
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
