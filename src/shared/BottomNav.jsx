const NAV = [
  { id: 'dashboard', icon: '🏠', label: 'Home' },
  { id: 'messages',  icon: '💬', label: 'Messages', badge: true },
  { id: 'tasks',     icon: '📋', label: 'Tasks' },
  { id: 'links',     icon: '🔗', label: 'Links' },
]
 
export default function BottomNav({ current, goTo }) {
  return (
    <div className="bnav">
      {NAV.map(item => (
        <button key={item.id} className={`bn${current === item.id ? ' on' : ''}`} onClick={() => goTo(item.id)}>
          <div className="bn-icon">{item.icon}</div>
          {item.label}
          {item.badge && current !== item.id && <div className="bn-dot" />}
        </button>
      ))}
    </div>
  )
}