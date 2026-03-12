import Topbar from '../shared/Topbar'
import BottomNav from '../shared/BottomNav'
 
const LINKS = [
  { name: 'New York Times',    url: 'https://nytimes.com',   icon: '📰', bg: 'linear-gradient(135deg,#2D3436,#636E72)' },
  { name: "Women's Wear Daily",url: 'https://wwd.com',       icon: '👗', bg: 'linear-gradient(135deg,#E17055,#D63031)' },
  { name: 'Weather.com',       url: 'https://weather.com',   icon: '⛅', bg: 'linear-gradient(135deg,#0984E3,#74B9FF)' },
  { name: 'Block Blast',       url: 'https://blockblast.io', icon: '🎮', bg: 'linear-gradient(135deg,#6C5CE7,#A29BFE)' },
  { name: 'YouTube',           url: 'https://youtube.com',   icon: '📺', bg: 'linear-gradient(135deg,#00B894,#55EFC4)' },
  { name: 'Add a Link',        url: null,                    icon: '➕', bg: 'linear-gradient(135deg,#FDCB6E,#FFB347)', dashed: true },
]
 
export default function Links({ goTo }) {
  return (
    <div className="screen">
      <Topbar />
      <div className="body">
        <div className="links-title">🔗 My Favorites</div>
        <div className="links-sub">Tap any tile to visit your favorite sites!</div>
        <div className="links-grid">
          {LINKS.map(link => (
            <div key={link.name} className={`link-card${link.dashed ? ' dashed' : ''}`} style={{ background: link.bg }}
              onClick={() => link.url && window.open(link.url, '_blank')}>
              <div className="link-icon">{link.icon}</div>
              <div className="link-name">{link.name}</div>
              <div className="link-url">{link.url ? link.url.replace('https://', '') : 'tap to add new'}</div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav current="links" goTo={goTo} />
    </div>
  )
}