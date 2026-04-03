import { useState, useRef, useEffect } from 'react'
import Topbar from '../shared/Topbar'
import BottomNav from '../shared/BottomNav'

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  setDoc
} from "firebase/firestore"

import { db } from "../firebase"

export default function Messages({ goTo, user, onLogout }) {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typingUser, setTypingUser] = useState(null)
  const bodyRef = useRef(null)

  const chatId = "chat1"

  // 🔄 Listen for messages
  useEffect(() => {
    const q = query(
      collection(db, "conversations", chatId, "messages"),
      orderBy("createdAt")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setMsgs(messages)
    })

    return () => unsubscribe()
  }, [])

  // 🔄 Listen for typing
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "conversations", chatId), (docSnap) => {
      if (docSnap.exists()) {
        setTypingUser(docSnap.data().typing)
      }
    })

    return () => unsub()
  }, [])

  // Scroll
  useEffect(() => {
    bodyRef.current && (bodyRef.current.scrollTop = bodyRef.current.scrollHeight)
  }, [msgs, typingUser])

  // ✏️ Typing handler
  const handleTyping = async (val) => {
    setInput(val)

    await setDoc(doc(db, "conversations", chatId), {
      typing: val ? user : null
    }, { merge: true })
  }

  // 📤 Send
  const send = async () => {
    const text = input.trim()
    if (!text) return

    const t = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

    await addDoc(collection(db, "conversations", chatId, "messages"), {
      from: user,
      text,
      time: t,
      createdAt: new Date()
    })

    // stop typing
    await setDoc(doc(db, "conversations", chatId), {
      typing: null
    }, { merge: true })

    setInput('')
  }

  return (
    <div className="screen">
      <Topbar user={user} onLogout={onLogout} />

      <div className="chat-header">
        <div className="ch-av">{user === 'emma' ? '👵' : '🌻'}</div>
        <div className="ch-info">
          <div className="ch-name">
            {user === 'emma' ? 'Olivia 👵' : 'Emma 🌻'}
          </div>
          <div className="ch-status">
            {typingUser && typingUser !== user
              ? `${typingUser} is typing...`
              : '● Online'}
          </div>
        </div>
      </div>

      <div className="chat-body" ref={bodyRef}>
        {msgs.map(m => (
          <div key={m.id} className={`bw${m.from === user ? ' me' : ''}`}>
            <div className={`bubble ${m.from === user ? 'me' : 'them'}`}>
              {m.text}
            </div>
            <div className="b-time">{m.time}</div>
          </div>
        ))}
      </div>

      <div className="chat-bar">
        <input
          className="chat-input"
          placeholder="Type a message…"
          value={input}
          onChange={e => handleTyping(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button className="send-btn" onClick={send}>➤</button>
      </div>

      <BottomNav current="messages" goTo={goTo} />
    </div>
  )
}