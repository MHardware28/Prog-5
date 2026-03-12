import { useState } from 'react'
 
export default function ForgotPassword({ goTo }) {
  const [who, setWho] = useState('olivia')
  return (
    <div className="screen s-forgot">
      <div className="forgot-card">
        <div className="fc-icon">🔐</div>
        <div className="fc-title">Reset Password</div>
        <div className="fc-sub">No worries! Answer your security question and we'll get you back in safely.</div>
        <label className="f-label">Who are you?</label>
        <div className="who-row" style={{ marginBottom: 14 }}>
          <button className={`who-btn${who === 'olivia' ? ' sel-teal' : ''}`} onClick={() => setWho('olivia')}>🌸 Olivia</button>
          <button className={`who-btn${who === 'emma' ? ' sel-teal' : ''}`}   onClick={() => setWho('emma')}>🌻 Emma</button>
        </div>
        <label className="f-label">Security Question</label>
        <div className="security-q">What is your pet's name?</div>
        <label className="f-label">Your Answer</label>
        <input className="f-input" placeholder="Type your answer…" />
        <label className="f-label">New Password</label>
        <input className="f-input" type="password" placeholder="Create a new password" />
        <button className="reset-btn">Reset My Password 🔓</button>
        <span className="back-link" onClick={() => goTo('login')}>← Back to Sign In</span>
      </div>
    </div>
  )
}