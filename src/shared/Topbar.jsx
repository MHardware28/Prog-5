export default function Topbar({ name = 'Olivia', avatar = '🌸' }) {
  return (
    <div className="topbar">
      <div className="t-logo"><span>Life Support</span></div>
      <div className="t-user">
        <div className="t-avatar" style={{ background: 'linear-gradient(135deg,#FF6B9D,#FFB347)' }}>{avatar}</div>
        <span className="t-name">{name}</span>
      </div>
    </div>
  )
}