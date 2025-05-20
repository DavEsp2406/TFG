import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import MessagesPage from './pages/MessagesPage.jsx'


import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'

import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const theme = useThemeStore((state) => state.theme)
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({ authUser })

  if (isCheckingAuth && !authUser) return (
    <div className='flex justify-center items-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )


  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
        <Route path="/messages" element={authUser ? <MessagesPage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App