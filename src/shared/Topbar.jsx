export default function Topbar({ user, onLogout }) {
  const users = {
    olivia: { name: 'Olivia', avatar: '🌸', color: 'linear-gradient(135deg,#FF6B9D,#FFB347)' },
    emma:   { name: 'Emma',   avatar: '🌻', color: 'linear-gradient(135deg,#4ECDC4,#A29BFE)' },
  }
  const current = users[user] || users.olivia

  return (
    <div className="topbar">
      <div className="t-logo"><span>Life Support</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="t-user">
          <div className="t-avatar" style={{ background: current.color }}>{current.avatar}</div>
          <span className="t-name">{current.name}</span>
        </div>
        {onLogout && (
          <button onClick={onLogout} style={{
            padding: '6px 14px', border: '2px solid #FF6B9D', borderRadius: 20,
            background: 'none', color: '#FF6B9D', fontWeight: 800,
            fontSize: '.78rem', cursor: 'pointer', fontFamily: 'Nunito, sans-serif'
          }}>
            Log out
          </button>
        )}
      </div>
    </div>
  )
}