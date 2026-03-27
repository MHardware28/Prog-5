import { useState } from 'react'
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function Login({ goTo, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)

      const userEmail = res.user.email
      if (userEmail === 'emma@test.com') onLogin('emma')
      else if (userEmail === 'olivia@test.com') onLogin('olivia')

    } catch (err) {
      setError('Login failed: ' + err.message)
    }
  }

  return (
    <div className="screen s-login">
      <div className="login-hero">
        <div className="login-fire">❤️‍🔥</div>
        <div className="login-welcome">WELCOME TO</div>
      </div>

      <div className="login-card">
        <div className="login-logo"><span>Life Support</span></div>
        <div className="login-tag">Staying connected, one day at a time 🌸</div>

        <label className="f-label">Email</label>
        <input
          className="f-input"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />

        <label className="f-label">Password</label>
        <input
          className="f-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />

        {error && <div style={{ color: '#FF7675', fontSize: '.82rem', fontWeight: 700, marginBottom: 12, marginTop: -8 }}>{error}</div>}

        <button className="login-btn" onClick={handleLogin}>Sign In 🌈</button>
        <span className="forgot-link" onClick={() => goTo('forgot')}>Forgot password?</span>
      </div>

      <div className="login-footer">🔒 Private & secure *No ads *No data sold</div>
    </div>
  )
}
 
 
 
