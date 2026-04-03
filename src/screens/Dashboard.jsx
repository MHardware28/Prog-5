import { useState, useEffect } from 'react'
import Topbar from '../shared/Topbar'
import BottomNav from "../shared/BottomNav"
import { db } from "../firebase"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"

const DEFAULT_LOCATIONS = [
  { city: 'Sarasota, FL',      lat: 27.3364,  lon: -82.5307, bg: 'linear-gradient(135deg,#74B9FF,#0984E3)' },
  { city: 'Thousand Oaks, CA', lat: 34.1706,  lon: -118.8376, bg: 'linear-gradient(135deg,#FDCB6E,#E17055)' },
]

const GRADIENTS = [
  'linear-gradient(135deg,#74B9FF,#0984E3)',
  'linear-gradient(135deg,#FDCB6E,#E17055)',
  'linear-gradient(135deg,#FF6B9D,#FFB347)',
  'linear-gradient(135deg,#4ECDC4,#A29BFE)',
  'linear-gradient(135deg,#55EFC4,#74B9FF)',
  'linear-gradient(135deg,#A29BFE,#FF6B9D)',
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

const formatTime = (time) => {
  const [h, m] = time.split(':')
  const hour = parseInt(h)
  return `${hour % 12 || 12}:${m} ${hour < 12 ? 'AM' : 'PM'}`
}

export default function Dashboard({ goTo, onCheer, user, onLogout, tasks, setTasks }) {
  const { name, emoji } = USER_INFO[user] || USER_INFO.olivia
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const todayStr = new Date().toISOString().split('T')[0]

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const [weather, setWeather] = useState([])
  const [loadingWeather, setLoadingWeather] = useState(true)

  const [messages, setMessages] = useState([])
  const [loadingMessages, setLoadingMessages] = useState(true)

  const [locations, setLocations] = useState(() => {
    const saved = localStorage.getItem('weatherLocations')
    return saved ? JSON.parse(saved) : DEFAULT_LOCATIONS
  })
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState(null)

  // Save locations to localStorage
  useEffect(() => {
    localStorage.setItem('weatherLocations', JSON.stringify(locations))
  }, [locations])

  // Fetch weather
  useEffect(() => {
    const fetchWeather = async () => {
      if (locations.length === 0) {
        setWeather([])
        setLoadingWeather(false)
        return
      }

      try {
        const results = await Promise.all(
          locations.map(async (loc) => {
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
  }, [locations])

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
        <div className="sec-card">
          <div className="sc-head">
            <div className="sc-title">🌤️ Weather</div>
            <div className="sc-more" onClick={() => setShowLocationModal(true)}>⚙️ Manage</div>
          </div>
          {locations.length === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', opacity: 0.7 }}>
              No weather locations set. <button 
                onClick={() => setShowLocationModal(true)}
                style={{ color: '#FF6B9D', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
              >Add some locations</button>
            </div>
          ) : (
            <div className="weather-grid">
              {loadingWeather
                ? locations.map(loc => (
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
          )}
        </div>

        {/* Tasks */}
        <div className="sec-card">
          <div className="sc-head">
            <div className="sc-title">📋 Today's Tasks</div>
            <div className="sc-more" onClick={() => goTo('tasks')}>See all →</div>
          </div>
          {tasks.filter(t => t.date === todayStr).map((t) => (
            <div key={t.id} className="task-row" onClick={() => toggleTask(t.id)}>
              <div className="t-dot" style={{ background: t.color }} />
              <span className={`t-text${t.done ? ' done' : ''}`}>{t.text}</span>
              <span className="t-time">{formatTime(t.time)}</span>
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

      {/* Location Management Modal */}
      {showLocationModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowLocationModal(false)}>
          <div className="modal-sheet">
            <div className="modal-handle" />
            <div className="modal-title">🌤️ Manage Weather Locations</div>

            {locations.map((loc, index) => (
              <div key={index} className="location-row">
                <div className="loc-info">
                  <div className="loc-city">{loc.city}</div>
                  <div className="loc-coords">{loc.lat.toFixed(4)}, {loc.lon.toFixed(4)}</div>
                </div>
                <div className="loc-actions">
                  <button className="loc-btn" onClick={() => setEditingLocation({ ...loc, index })}>✏️</button>
                  <button className="loc-btn" onClick={() => setLocations(prev => prev.filter((_, i) => i !== index))}>🗑️</button>
                </div>
              </div>
            ))}

            <button 
              className="save-btn" 
              style={{ marginTop: 20 }}
              onClick={() => setEditingLocation({ city: '', lat: '', lon: '', bg: GRADIENTS[0] })}
            >
              ➕ Add Location
            </button>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button
                className="save-btn"
                style={{ background: '#eee', color: '#555', boxShadow: 'none' }}
                onClick={() => setShowLocationModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Location Modal */}
      {editingLocation && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setEditingLocation(null)}>
          <div className="modal-sheet">
            <div className="modal-handle" />
            <div className="modal-title">{editingLocation.index !== undefined ? '✏️ Edit Location' : '➕ Add Location'}</div>

            <label className="f-label">City Name</label>
            <input
              className="modal-input"
              value={editingLocation.city}
              onChange={e => setEditingLocation(prev => ({ ...prev, city: e.target.value }))}
              placeholder="e.g. New York, NY"
            />

            <label className="f-label">Latitude</label>
            <input
              type="number"
              step="0.0001"
              className="modal-input"
              value={editingLocation.lat}
              onChange={e => setEditingLocation(prev => ({ ...prev, lat: parseFloat(e.target.value) || 0 }))}
              placeholder="e.g. 40.7128"
            />

            <label className="f-label">Longitude</label>
            <input
              type="number"
              step="0.0001"
              className="modal-input"
              value={editingLocation.lon}
              onChange={e => setEditingLocation(prev => ({ ...prev, lon: parseFloat(e.target.value) || 0 }))}
              placeholder="e.g. -74.0060"
            />

            <label className="f-label">Background Gradient</label>
            <div className="color-row">
              {GRADIENTS.map(g => (
                <div
                  key={g}
                  className={`color-dot${editingLocation.bg === g ? ' sel' : ''}`}
                  style={{ background: g }}
                  onClick={() => setEditingLocation(prev => ({ ...prev, bg: g }))}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="save-btn"
                style={{ background: '#eee', color: '#555', boxShadow: 'none' }}
                onClick={() => setEditingLocation(null)}
              >
                Cancel
              </button>
              <button 
                className="save-btn" 
                onClick={() => {
                  if (editingLocation.index !== undefined) {
                    // Edit existing
                    setLocations(prev => prev.map((loc, i) => 
                      i === editingLocation.index ? { 
                        city: editingLocation.city, 
                        lat: editingLocation.lat, 
                        lon: editingLocation.lon, 
                        bg: editingLocation.bg 
                      } : loc
                    ))
                  } else {
                    // Add new
                    setLocations(prev => [...prev, { 
                      city: editingLocation.city, 
                      lat: editingLocation.lat, 
                      lon: editingLocation.lon, 
                      bg: editingLocation.bg 
                    }])
                  }
                  setEditingLocation(null)
                }}
                disabled={!editingLocation.city || !editingLocation.lat || !editingLocation.lon}
              >
                {editingLocation.index !== undefined ? 'Save Changes' : 'Add Location'} 💾
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}