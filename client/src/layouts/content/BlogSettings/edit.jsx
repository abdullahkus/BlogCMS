import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import axios from 'axios'

export default function Edit() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [blog, setBlog] = useState([])
  let params = useParams()

  useEffect(() => {
    axios
      .get('http://localhost:4000/blog-settings/' + params.id)
      .then(function (res) {
        setBlog(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [params.id])

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
    enableReinitialize: true,
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
        const res = await fetch('http://localhost:4000/blog-settings/edit/' + params.id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (res.status === 200) {
          setSuccess('Blog yazısı başarıyla güncellendi.')
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
              id='filled-basic'
              name='name'
              variant='filled'
              values={values.name}
              onChange={handleChange}
              label={touched.name ? errors.name : 'Başlık'}
              error={touched.name && errors.name ? true : false}
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
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              id='filled-basic'
              name='keywords'
              variant='filled'
              values={values.keywords}
              onChange={handleChange}
              label={touched.keywords ? errors.keywords : 'SEO Anahtar Kelime'}
              error={touched.keywords && errors.keywords ? true : false}
            />
          </Box>
        </Box>
        <Box sx={{ m: 2 }}>
          <CKEditor
            editor={ClassicEditor}
            data={blog.content}
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
