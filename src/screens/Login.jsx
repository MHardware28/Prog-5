import { useState } from 'react'
 
export default function Login({ goTo }) {
  const [who, setWho] = useState('olivia')
  return (
    <div className="screen s-login">
      <div className="login-hero">
        <div className="login-fire">❤️‍🔥</div>
        <div className="login-welcome">WELCOME TO</div>
      </div>
      <div className="login-card">
        <div className="login-logo"><span>Life Support</span></div>
        <div className="login-tag">Staying connected, one day at a time 🌸</div>
        <label className="f-label">Who are you?</label>
        <div className="who-row">
          <button className={`who-btn${who === 'olivia' ? ' sel' : ''}`} onClick={() => setWho('olivia')}>🌸 Olivia</button>
          <button className={`who-btn${who === 'emma' ? ' sel' : ''}`}   onClick={() => setWho('emma')}>🌻 Emma</button>
        </div>
        <label className="f-label">Password</label>
        <input className="f-input" type="password" placeholder="Enter your password" defaultValue="••••••••" />
        <button className="login-btn" onClick={() => goTo('dashboard')}>Sign In 🌈</button>
        <span className="forgot-link" onClick={() => goTo('forgot')}>Forgot password?</span>
      </div>
      <div className="login-footer">🔒 Private &amp; secure · No ads · No data sold</div>
    </div>
  )
}
 