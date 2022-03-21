import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'

export default function GeneralSettings() {
  return (
    <>
      <Box
        component='form'
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
            <AddBoxIcon /> Logo Yükle
            <input type='file' hidden />
          </Button>
          <TextField fullWidth id='filled-basic' label='Filled' variant='filled' />
          <TextField fullWidth id='filled-basic' label='Filled' variant='filled' />
          <TextField fullWidth id='filled-basic' label='Filled' variant='filled' />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, m: 2 }}>
          <Button variant='contained' component='label'>
            <AddBoxIcon /> Logo Yükle
            <input type='file' hidden />
          </Button>
          <TextField fullWidth id='filled-basic' label='Filled' variant='filled' />
        </Box>
      </Box>
    </>
  )
}
