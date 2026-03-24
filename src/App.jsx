import { useState, useEffect } from 'react'
import CheerPopup from './shared/CheerPopup'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Messages from './screens/Messages'
import Tasks from './screens/Tasks'
import Links from './screens/Links'
import ForgotPassword from './screens/ForgotPassword'
import { auth } from "./firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"

export default function App() {
  const [screen, setScreen] = useState('login')
  const [showPopup, setShowPopup] = useState(false)
  const [user, setUser] = useState(null) // 'olivia' or 'emma'

  // ✅ Persist login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        if (firebaseUser.email === 'emma@test.com') setUser('emma')
        if (firebaseUser.email === 'olivia@test.com') setUser('olivia')
        setScreen('dashboard')
      } else {
        setUser(null)
        setScreen('login')
      }
    })
    return () => unsub()
  }, [])

  const goTo = name => {
    setScreen(name)
    if (name === 'dashboard') setTimeout(() => setShowPopup(true), 600)
  }

  const login = (who) => {
    setUser(who)
    goTo('dashboard')
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
    setScreen('login')
    setShowPopup(false)
  }

  return (
    <div className="app">
      {showPopup && <CheerPopup show={showPopup} onClose={() => setShowPopup(false)} />}

      {screen === 'login'     && <Login goTo={goTo} onLogin={login} />}
      {screen === 'dashboard' && <Dashboard goTo={goTo} onCheer={() => setShowPopup(true)} user={user} onLogout={logout} />}
      {screen === 'messages'  && <Messages goTo={goTo} user={user} onLogout={logout} />}
      {screen === 'tasks'     && <Tasks goTo={goTo} user={user} onLogout={logout} />}
      {screen === 'links'     && <Links goTo={goTo} user={user} onLogout={logout} />}
      {screen === 'forgot'    && <ForgotPassword goTo={goTo} />}
    </div>
  )
}