import { useState } from 'react'

import CheerPopup    from './shared/CheerPopup'
import AddTaskModal  from './shared/AddTaskModal'

import Login          from './screens/Login'
import Dashboard      from './screens/Dashboard'
import Messages       from './screens/Messages'
import Tasks          from './screens/Tasks'
import Links          from './screens/Links'
import ForgotPassword from './screens/ForgotPassword'

const SCREENS = [
  { id: 'login',     label: '1 · Login' },
  { id: 'dashboard', label: '2 · Dashboard' },
  { id: 'messages',  label: '3 · Messages' },
  { id: 'tasks',     label: '4 · Tasks' },
  { id: 'links',     label: '5 · Fav Links' },
  { id: 'forgot',    label: '6 · Forgot PW' },
]

export default function App() {
  const [screen, setScreen]       = useState('login')
  const [showPopup, setShowPopup] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const goTo = name => {
    setScreen(name)
    if (name === 'dashboard') setTimeout(() => setShowPopup(true), 600)
  }

  return (
    <>
      {/* Prototype switcher bar — remove before final delivery */}
      <div className="switcher">
        <span className="switcher-label">📱 Screens:</span>
        {SCREENS.map(s => (
          <button key={s.id} className={`sw-btn${screen === s.id ? ' on' : ''}`} onClick={() => goTo(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="stage">
        <div className="phone">

          {showPopup && <CheerPopup show={showPopup} onClose={() => setShowPopup(false)} />}
          {showModal && <AddTaskModal show={showModal} onClose={() => setShowModal(false)} />}

          {screen === 'login'     && <Login goTo={goTo} />}
          {screen === 'dashboard' && <Dashboard goTo={goTo} onCheer={() => setShowPopup(true)} />}
          {screen === 'messages'  && <Messages  goTo={goTo} />}
          {screen === 'tasks'     && <Tasks     goTo={goTo} onAddTask={() => setShowModal(true)} />}
          {screen === 'links'     && <Links     goTo={goTo} />}
          {screen === 'forgot'    && <ForgotPassword goTo={goTo} />}

        </div>
      </div>
    </>
  )
}