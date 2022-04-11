// React
import { useState, useMemo, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Routes, Route, Navigate } from 'react-router-dom'
//themeContext
import ThemeContext from '../context/ThemeContext'
import { light } from '../themes/light'
import { dark } from '../themes/dark'
// Component
import Auth from '../layouts/auth'
import Home from '../layouts/home'
import GeneralSettings from '../layouts/content/GeneralSettings'
import BlogSettings from '../layouts/content/BlogSettings'
import BlogSettingsCreate from '../layouts/content/BlogSettings/create'
import BlogSettingsEdit from '../layouts/content/BlogSettings/edit'
import PageSettings from '../layouts/content/PageSettings'
import PageSettingsCreate from '../layouts/content/PageSettings/create'
import PageSettingsEdit from '../layouts/content/PageSettings/edit'
function App() {
  //Auth
  const [isAuth, setIsAuth] = useState(true)
  const setAuth = (boolean) => {
    setIsAuth(boolean)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      isAuthVerify()
    } else {
      setAuth(false)
    }
  })
  async function isAuthVerify() {
    try {
      const res = await fetch('http://localhost:4000/auth/is-verify/', {
        METHOD: 'GET',
        headers: { token: localStorage.getItem('token') },
      })
      const parseRes = await res.json()
      parseRes === true ? setAuth(true) : setAuth(false)
    } catch (err) {
      console.error(err.message)
    }
  }

  //Theme Mode
  const [theme, setTheme] = useState(light)
  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      setTheme(localTheme === 'dark' ? dark : light)
    } else {
      localStorage.setItem('theme', 'light')
    }
  }, [])
  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        if (theme === light) {
          setTheme(dark)
          localStorage.setItem('theme', 'dark')
        } else {
          setTheme(light)
          localStorage.setItem('theme', 'light')
        }
      },
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path='/'
            exact
            element={isAuth ? <Home setAuth={setAuth} /> : <Navigate to='/auth' />}>
            <Route path='/general-settings' element={<GeneralSettings />} />
            <Route path='/blog-settings' element={<BlogSettings />} />
            <Route path='/blog-settings/create' element={<BlogSettingsCreate />} />
            <Route path='/blog-settings/edit/:id' element={<BlogSettingsEdit />} />
            <Route path='/page-settings' element={<PageSettings />} />
            <Route path='/page-settings/create' element={<PageSettingsCreate />} />
            <Route path='/page-settings/edit/:id' element={<PageSettingsEdit />} />

          </Route>
          <Route
            exact
            path='auth'
            element={!isAuth ? <Auth setAuth={setAuth} /> : <Navigate to='/' />}
          />
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
export default App
