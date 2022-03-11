import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Header from '../header'
import Sidebar from '../sidebar'
import Content from '../content'

export default function Home({ setAuth }) {
  const [open, setOpen] = useState(false)
  //auth
  const [name, setName] = useState('')
  async function getName() {
    try {
      const res = await fetch('http://localhost:4000/home/', {
        method: 'GET',
        headers: { token: localStorage.getItem('token') },
      })
      const parseRes = await res.json()
      setName(parseRes.name)
      // console.log(parseRes)
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    getName()
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header setOpen={setOpen} open={open} setAuth={setAuth} />
      <Sidebar setOpen={setOpen} open={open} />
      <Content />
    </Box>
  )
}
