import Topbar from '../shared/Topbar'
import BottomNav from "../shared/BottomNav"
 
const TASKS = [
  { text: 'Take morning medications',        time: '8:00 AM',  color: '#FF6B9D', done: true },
  { text: 'Doctor appointment - Dr. Reeves', time: '10:30 AM', color: '#FFB347', done: false },
  { text: 'Community group session',         time: '2:00 PM',  color: '#A29BFE', done: true },
  { text: 'Take evening medications',        time: '8:00 PM',  color: '#FF6B9D', done: false },
]
 
const WEATHER = [
  { city: 'Sarasota, FL',      temp: '78°', icon: '⛅', desc: 'Partly Cloudy', sub: '💧 72% · 💨 12mph', bg: 'linear-gradient(135deg,#74B9FF,#0984E3)' },
  { city: 'Thousand Oaks, CA', temp: '65°', icon: '☀️', desc: 'Sunny',         sub: '💧 45% · 💨 8mph',  bg: 'linear-gradient(135deg,#FDCB6E,#E17055)' },
]
 
export default function Dashboard({ goTo, onCheer }) {
  return (
    <div className="screen s-dashboard">
      <Topbar />
      <div className="body">
        <div className="greet-card">
          <div className="greet-emoji">🌸</div>
          <div className="greet-hi">Good morning,</div>
          <div className="greet-name">Olivia! 👋</div>
          <div className="greet-sub">Thursday, March 6 · 4 tasks today</div>
        </div>
 
        <div className="weather-grid">
          {WEATHER.map(w => (
            <div key={w.city} className="wc" style={{ background: w.bg }}>
              <div className="wc-city">{w.city}</div>
              <div className="wc-icon">{w.icon}</div>
              <div className="wc-temp">{w.temp}</div>
              <div className="wc-desc">{w.desc}</div>
              <div className="wc-sub">{w.sub}</div>
            </div>
          ))}
        </div>
 
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
 
        <div className="sec-card">
          <div className="sc-head">
            <div className="sc-title">💬 Messages</div>
            <div className="sc-more" onClick={() => goTo('messages')}>See all →</div>
          </div>
          <div className="msg-row">
            <div className="m-av" style={{ background: '#FFF0F6' }}>🌻</div>
            <div className="m-body">
              <div className="m-from">Emma 🌻</div>
              <div className="m-snip">Good morning Grandma! Don't forget your 10:30 AM appointment!</div>
            </div>
            <div className="m-right">
              <div className="m-time">7:45 AM</div>
              <div className="m-unread" />
            </div>
          </div>
        </div>
 
        <button className="cheer-btn" onClick={onCheer}>✨ Cheer me up!</button>
      </div>
      <BottomNav current="dashboard" goTo={goTo} />
    </div>
  )
}