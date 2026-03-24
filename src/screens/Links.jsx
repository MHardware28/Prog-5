import { useState, useEffect } from 'react'
import Topbar from '../shared/Topbar'
import BottomNav from '../shared/BottomNav'

const DEFAULT_LINKS = [
  { name: 'New York Times',    url: 'https://nytimes.com',   icon: '📰', bg: 'linear-gradient(135deg,#2D3436,#636E72)' },
  { name: "Women's Wear Daily",url: 'https://wwd.com',       icon: '👗', bg: 'linear-gradient(135deg,#E17055,#D63031)' },
  { name: 'Weather.com',       url: 'https://weather.com',   icon: '⛅', bg: 'linear-gradient(135deg,#0984E3,#74B9FF)' },
  { name: 'Block Blast',       url: 'https://blockblast.io', icon: '🎮', bg: 'linear-gradient(135deg,#6C5CE7,#A29BFE)' },
  { name: 'YouTube',           url: 'https://youtube.com',   icon: '📺', bg: 'linear-gradient(135deg,#00B894,#55EFC4)' },
]

export default function Links({ goTo, user, onLogout }) {
  const [links, setLinks]       = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName]   = useState('')
  const [newUrl, setNewUrl]     = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('myLinks')
    setLinks(saved ? JSON.parse(saved) : DEFAULT_LINKS)
  }, [])

  useEffect(() => {
    if (links.length) localStorage.setItem('myLinks', JSON.stringify(links))
  }, [links])

  const handleAddLink = () => {
    if (!newName.trim() || !newUrl.trim()) return
    const formattedUrl = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`
    setLinks(prev => [...prev, { name: newName, url: formattedUrl, icon: '🔗', bg: 'linear-gradient(135deg,#00B894,#55EFC4)' }])
    setNewName('')
    setNewUrl('')
    setShowModal(false)
  }

  const handleDelete = (index) => {
    setLinks(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="screen">
      <Topbar user={user} onLogout={onLogout} />

      <div className="body">
        <div className="links-title">🔗 My Favorites</div>
        <div className="links-sub">Tap any tile to visit your favorite sites!</div>

        <div className="links-grid">
          {links.map((link, index) => (
            <div
              key={index}
              className="link-card"
              style={{ background: link.bg, position: 'relative' }}
              onClick={() => window.open(link.url, '_blank')}
            >
              <div
                onClick={e => { e.stopPropagation(); handleDelete(index) }}
                style={{ position: 'absolute', top: 6, right: 8, cursor: 'pointer', fontSize: 14 }}
              >
                ❌
              </div>
              <div className="link-icon">{link.icon}</div>
              <div className="link-name">{link.name}</div>
              <div className="link-url">{link.url.replace('https://', '')}</div>
            </div>
          ))}

          <div
            className="link-card dashed"
            style={{ background: 'linear-gradient(135deg,#FDCB6E,#FFB347)' }}
            onClick={() => setShowModal(true)}
          >
            <div className="link-icon">➕</div>
            <div className="link-name">Add a Link</div>
            <div className="link-url">tap to add new</div>
          </div>
        </div>
      </div>

      <BottomNav current="links" goTo={goTo} />

      {/* Add Link Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-sheet">
            <div className="modal-handle" />
            <div className="modal-title">🔗 Add New Link</div>

            <label className="f-label">Site Name</label>
            <input
              className="modal-input"
              placeholder="e.g. New York Times"
              value={newName}
              onChange={e => setNewName(e.target.value)}
            />

            <label className="f-label">URL</label>
            <input
              className="modal-input"
              placeholder="e.g. nytimes.com"
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddLink()}
            />

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="save-btn"
                style={{ background: '#eee', color: '#555', boxShadow: 'none' }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={handleAddLink}>Add Link 🔗</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}