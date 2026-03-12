import { useState, useRef, useEffect } from 'react'
import Topbar from '../shared/Topbar'
import BottomNav from '../shared/BottomNav'
 
const INIT = [
  { id: 1, from: 'them', text: "Good morning Grandma! 🌸 Don't forget your 10:30 AM appointment today!", time: '7:45 AM' },
  { id: 2, from: 'me',   text: 'Good morning sweetheart! 💕 I remembered! How is your new school?',       time: '8:02 AM' },
  { id: 3, from: 'them', text: "It's wonderful! I miss you so much. I'm building you a special app! 🌟",  time: '8:15 AM' },
  { id: 4, from: 'me',   text: 'Oh how exciting! You are such a clever girl! I am so proud of you 🌻',    time: '8:30 AM' },
  { id: 5, from: 'them', text: 'Here it is Grandma! I hope you love it 💖 Let me know what you think!',   time: 'Just now' },
]
 
const REPLIES = ['That sounds wonderful! 💕', 'I love you so much! 🌸', 'You are the best! 🌟', 'Take care of yourself! 😊', 'Miss you so much! 🌺']
 
export default function Messages({ goTo }) {
  const [msgs, setMsgs] = useState(INIT)
  const [input, setInput] = useState('')
  const bodyRef = useRef(null)
 
  useEffect(() => { bodyRef.current && (bodyRef.current.scrollTop = bodyRef.current.scrollHeight) }, [msgs])
 
  const send = () => {
    const text = input.trim()
    if (!text) return
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMsgs(prev => [...prev, { id: Date.now(), from: 'me', text, time: t }])
    setInput('')
    setTimeout(() => {
      const reply = REPLIES[Math.floor(Math.random() * REPLIES.length)]
      setMsgs(prev => [...prev, { id: Date.now() + 1, from: 'them', text: reply, time: 'Just now' }])
    }, 1200)
  }
 
  return (
    <div className="screen">
      <Topbar />
      <div className="chat-header">
        <div className="ch-av">🌻</div>
        <div className="ch-info">
          <div className="ch-name">Emma</div>
          <div className="ch-status">● Online now</div>
        </div>
        <div style={{ fontSize: '1.3rem', cursor: 'pointer' }}>📞</div>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {msgs.map(m => (
          <div key={m.id} className={`bw${m.from === 'me' ? ' me' : ''}`}>
            <div className={`bubble ${m.from}`}>{m.text}</div>
            <div className="b-time">{m.time}</div>
          </div>
        ))}
        <div className="chat-date">Today · March 6, 2026</div>
      </div>
      <div className="chat-bar">
        <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>😊</span>
        <input className="chat-input" placeholder="Type a message…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
        <button className="send-btn" onClick={send}>➤</button>
      </div>
      <BottomNav current="messages" goTo={goTo} />
    </div>
  )
}