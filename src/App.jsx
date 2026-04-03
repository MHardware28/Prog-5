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

const today = new Date().toISOString().split('T')[0]

const INIT_TASKS = [
  { id: 1, text: 'Take morning medications 💊',        time: '08:00', date: today, color: '#FF6B9D', done: true },
  { id: 2, text: 'Doctor appointment - Dr. Reeves 🏥', time: '10:30', date: today, color: '#FFB347', done: false },
  { id: 3, text: 'Weekly community group session 👥',  time: '14:00', date: today, color: '#A29BFE', done: true },
  { id: 4, text: 'Evening walk in the garden 🌿',      time: '17:30', date: today, color: '#55EFC4', done: false },
  { id: 5, text: 'Take evening medications 💊',        time: '20:00', date: today, color: '#FF6B9D', done: false },
]

export default function App() {
  const [screen, setScreen] = useState('login')
  const [showPopup, setShowPopup] = useState(false)
  const [user, setUser] = useState(null) // 'olivia' or 'emma'
  const [tasks, setTasks] = useState(INIT_TASKS)

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
      {screen === 'dashboard' && <Dashboard goTo={goTo} onCheer={() => setShowPopup(true)} user={user} onLogout={logout} tasks={tasks} setTasks={setTasks} />}
      {screen === 'messages'  && <Messages goTo={goTo} user={user} onLogout={logout} />}
      {screen === 'tasks'     && <Tasks goTo={goTo} user={user} onLogout={logout} tasks={tasks} setTasks={setTasks} />}
      {screen === 'links'     && <Links goTo={goTo} user={user} onLogout={logout} />}
      {screen === 'forgot'    && <ForgotPassword goTo={goTo} />}
    </div>
  )
}