import { useState, useEffect } from 'react'
import Topbar from '../shared/Topbar'
import BottomNav from "../shared/BottomNav"
import { db } from "../firebase"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"

const LOCATIONS = [
  { city: 'Sarasota, FL',      lat: 27.3364,  lon: -82.5307, bg: 'linear-gradient(135deg,#74B9FF,#0984E3)' },
  { city: 'Thousand Oaks, CA', lat: 34.1706,  lon: -118.8376, bg: 'linear-gradient(135deg,#FDCB6E,#E17055)' },
]

const getWeatherIcon = (code) => {
  if (code === 0) return '☀️'
  if (code <= 2) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  return '⛈️'
}

const getWeatherDesc = (code) => {
  if (code === 0) return 'Clear Sky'
  if (code <= 2) return 'Partly Cloudy'
  if (code <= 3) return 'Overcast'
  if (code <= 48) return 'Foggy'
  if (code <= 55) return 'Drizzle'
  if (code <= 67) return 'Rainy'
  if (code <= 77) return 'Snowy'
  if (code <= 82) return 'Rain Showers'
  return 'Thunderstorm'
}

const USER_INFO = {
  olivia: { name: 'Olivia', emoji: '🌸' },
  emma:   { name: 'Emma',   emoji: '🌻' },
}

const TASKS = [
  { text: 'Take morning medications',        time: '8:00 AM',  color: '#FF6B9D', done: true },
  { text: 'Doctor appointment - Dr. Reeves', time: '10:30 AM', color: '#FFB347', done: false },
  { text: 'Community group session',         time: '2:00 PM',  color: '#A29BFE', done: true },
  { text: 'Take evening medications',        time: '8:00 PM',  color: '#FF6B9D', done: false },
]

export default function Dashboard({ goTo, onCheer, user, onLogout }) {
  const { name, emoji } = USER_INFO[user] || USER_INFO.olivia
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const [weather, setWeather] = useState([])
  const [loadingWeather, setLoadingWeather] = useState(true)

  const [messages, setMessages] = useState([])
  const [loadingMessages, setLoadingMessages] = useState(true)

  // Fetch weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const results = await Promise.all(
          LOCATIONS.map(async (loc) => {
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&hourly=relative_humidity_2m,windspeed_10m&temperature_unit=fahrenheit&windspeed_unit=mph`
            )
            const data = await res.json()
            const code = data.current_weather.weathercode
            const wind = Math.round(data.current_weather.windspeed)
            const humidity = data.hourly.relative_humidity_2m[0]
            return {
              city: loc.city,
              bg: loc.bg,
              temp: Math.round(data.current_weather.temperature) + '°',
              icon: getWeatherIcon(code),
              desc: getWeatherDesc(code),
              sub: `💧 ${humidity}% · 💨 ${wind}mph`,
            }
          })
        )
        setWeather(results)
      } catch (err) {
        console.error('Weather fetch failed:', err)
      } finally {
        setLoadingWeather(false)
      }
    }
    fetchWeather()
  }, [])

  // Fetch last 5 messages for the user
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const col = collection(db, `messages_${user}`)
        const q = query(col, orderBy("time", "desc"), limit(5))
        const snapshot = await getDocs(q)
        const msgs = snapshot.docs.map(doc => doc.data())
        setMessages(msgs.reverse()) // oldest first
      } catch (err) {
        console.error("Failed to fetch messages:", err)
      } finally {
        setLoadingMessages(false)
      }
    }
    if (user) fetchMessages()
  }, [user])

  return (
    <div className="screen s-dashboard">
      <Topbar user={user} onLogout={onLogout} />
      <div className="body">

        {/* Greeting */}
        <div className="greet-card">
          <div className="greet-emoji">{emoji}</div>
          <div className="greet-hi">Good morning,</div>
          <div className="greet-name">{name}! 👋</div>
          <div className="greet-sub">{today}</div>
        </div>

        {/* Weather */}
        <div className="weather-grid">
          {loadingWeather
            ? LOCATIONS.map(loc => (
                <div key={loc.city} className="wc" style={{ background: loc.bg }}>
                  <div className="wc-city">{loc.city}</div>
                  <div className="wc-temp" style={{ fontSize: '1rem', opacity: .8 }}>Loading...</div>
                </div>
              ))
            : weather.map(w => (
                <div key={w.city} className="wc" style={{ background: w.bg }}>
                  <div className="wc-city">{w.city}</div>
                  <div className="wc-icon">{w.icon}</div>
                  <div className="wc-temp">{w.temp}</div>
                  <div className="wc-desc">{w.desc}</div>
                  <div className="wc-sub">{w.sub}</div>
                </div>
              ))
          }
        </div>

        {/* Tasks */}
        <div className="sec-card">
          <div className="sc-head">
            <div className="sc-title">📋 Today's Tasks</div>
            <div className="sc-more" onClick={() => goTo('tasks')}>See all →</div>
          </div>
          {TASKS.map((t, i) => (
            <div key={i} className="task-row">
              <div className="t-dot" style={{ background: t.color }} />
              <span className={`t-text${t.done ? ' done' : ''}`}>{t.text}</span>
              <span className="t-time">{t.time}</span>
              <div className={`t-chk${t.done ? ' done' : ''}`}>{t.done ? '✓' : ''}</div>
            </div>
          ))}
        </div>

        {/* Messages */}
        <div className="sec-card">
          <div className="sc-head">
            <div className="sc-title">💬 Messages</div>
            <div className="sc-more" onClick={() => goTo('messages')}>See all →</div>
          </div>
          {loadingMessages
            ? <div style={{ padding: 16, opacity: 0.6 }}>Loading messages…</div>
            : messages.map((m, i) => (
                <div key={i} className="msg-row">
                  <div className="m-av" style={{ background: '#FFF0F6' }}>
                    {m.from === 'emma' ? '🌻' : '🌸'}
                  </div>
                  <div className="m-body">
                    <div className="m-from">{m.from === 'emma' ? 'Emma 🌻' : 'Olivia 🌸'}</div>
                    <div className="m-snip">{m.text}</div>
                  </div>
                  <div className="m-right">
                    <div className="m-time">{m.time}</div>
                    {m.unread && <div className="m-unread" />}
                  </div>
                </div>
              ))
          }
        </div>

        {/* Cheer button */}
        <button className="cheer-btn" onClick={onCheer}>✨ Cheer me up!</button>

      </div>
      <BottomNav current="dashboard" goTo={goTo} />
    </div>
  )
}