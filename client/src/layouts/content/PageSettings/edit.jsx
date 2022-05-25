import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import axios from 'axios'


export default function Edit() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [page, setPage] = useState([])
  let params = useParams()
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4000/page-settings/' + params.id)
      .then(function (res) {
        setPage(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [params.id])

  //validate
  const validations = yup.object().shape({
    page_name: yup.string().required('Lütfen sayfa adını giriniz.'),
    page_description: yup.string().required('Lütfen açıklama giriniz.'),
    content: yup.string().required('Lütfen içerik giriniz.'),
    seo_title: yup.string().required('Lütfen seo başlığını giriniz.'),
    seo_description: yup.string().required('Lütfen seo açıklamasını giriniz.'),
  })
  //Auth
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    enableReinitialize: true,
    initialValues: {
      page_name: page.pageName,
      page_description: page.pageDescription,
      seo_title: page.seoTitle,
      seo_description: page.seoDescription,
      content: page.content,
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
        const res = await fetch('http://localhost:4000/page-settings/edit/' + params.id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          setSuccess('Sayfa başarıyla güncellendi.')
          navigate('/page-settings')
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
              Sayfayı Düzenle
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, m: 2 }}>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id='filled-error-helper-text'
              label='Sayfa Adı'
              name='page_name'
              onChange={handleChange}
              value={values.page_name}
              error={errors.page_name}
              helperText={errors.page_name}
              defaultValue=' '
              variant='filled'
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id='filled-error-helper-text'
              label='Sayfa Açıklaması'
              name='page_description'
              onChange={handleChange}
              value={values.page_description}
              error={errors.page_description}
              helperText={errors.page_description}
              defaultValue=' '
              variant='filled'
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, m: 2 }}>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id='filled-error-helper-text'
              label='SEO Başlığı'
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
          </Box>
        </Box>
        <Box sx={{ m: 2 }}>
          <CKEditor
            editor={ClassicEditor}
            data={page.content}
            onChange={(event, editor) => {
              const data = editor.getData()
              values.content = data
            }}
          />
          <Button type='submit' sx={{ mt: 2 }} variant='contained' fullWidth>
            Güncelle
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
