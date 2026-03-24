import { auth } from "../firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"

const USER_EMAILS = {
  olivia: "olivia@test.com",
  emma: "emma@test.com",
}

export default function ForgotPassword({ goTo }) {
  const [who, setWho] = useState('olivia')
  const [modalMsg, setModalMsg] = useState('') // store modal message
  const [showModal, setShowModal] = useState(false)

  const handleReset = () => {
    sendPasswordResetEmail(auth, USER_EMAILS[who])
      .then(() => {
        setModalMsg(`✅ Reset email sent to ${USER_EMAILS[who]}`)
        setShowModal(true)
      })
      .catch(err => {
        setModalMsg(`❌ Failed: ${err.message}`)
        setShowModal(true)
      })
  }

  return (
    <div className="screen s-forgot">
      <div className="forgot-card">
        <div className="fc-icon">🔐</div>
        <div className="fc-title">Reset Password</div>
        <div className="fc-sub">We'll send a reset link to your email.</div>

        <label className="f-label">Who are you?</label>
        <div className="who-row" style={{ marginBottom: 14 }}>
          <button
            className={`who-btn${who === 'olivia' ? ' sel-teal' : ''}`}
            onClick={() => setWho('olivia')}
          >🌸 Olivia</button>
          <button
            className={`who-btn${who === 'emma' ? ' sel-teal' : ''}`}
            onClick={() => setWho('emma')}
          >🌻 Emma</button>
        </div>

        <button className="reset-btn" onClick={handleReset}>Reset My Password 🔓</button>
        <span className="back-link" onClick={() => goTo('login')}>← Back to Sign In</span>
      </div>

      {/* Modal overlay */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-msg">{modalMsg}</div>
            <button className="modal-close" onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  )
}