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
function App() {
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
  //Auth
  const [isAuth, setIsAuth] = useState(false)
  const setAuth = (boolean) => {
    setIsAuth(boolean)
  }

  async function isAuthVerify() {
    try {
      const res = await fetch('http://localhost:4000/auth/is-verify/', {
        METHOD: 'GET',
        headers: { token: localStorage.getItem('token') },
      })
      const parseRes = await res.json()
      parseRes === true ? setIsAuth(true) : setIsAuth(false)
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    if(localStorage.getItem('token')){
      isAuthVerify()
    }
  })
  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            exact
            path='/'
            element={
              isAuth ? <Home setAuth={setAuth} /> : <Navigate to='/auth' />
            }
          />
          <Route
            exact
            path='/auth'
            element={!isAuth ? <Auth setAuth={setAuth} /> : <Navigate to='/' />}
          />
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
export default App
