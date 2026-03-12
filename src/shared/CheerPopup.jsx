const CHEERS = [
  { e: '🌟', t: 'You are amazing, Olivia!',  m: 'Every single day you bring so much light and love into the world. You are truly extraordinary! 💖' },
  { e: '🦋', t: 'Today is YOUR day!',         m: 'You are stronger than you know and more loved than you can imagine. Go get it, superstar! 🌈' },
  { e: '🌺', t: 'A little note from Emma…',   m: 'Grandma, I think about you every single day and miss you SO much. You are the best person I know! 💕' },
  { e: '🎉', t: 'You are wonderful!',          m: 'Life is full of beautiful moments — and YOU are one of them! Have a joyful, colorful day! ✨' },
  { e: '🌈', t: 'Sending you big hugs!',       m: 'From all of us who love you dearly — you make the world a kinder, warmer place just by being in it! 🤗' },
]

let idx = 0
 
export default function CheerPopup({ show, onClose }) {
  if (!show) return null
  const cheer = CHEERS[idx % CHEERS.length]
  idx++
  return (
    <div className="popup-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="popup-box">
        <div className="pop-emoji">{cheer.e}</div>
        <div className="pop-title">{cheer.t}</div>
        <div className="pop-msg">{cheer.m}</div>
        <button className="pop-btn" onClick={onClose}>Thank you! 🌸</button>
      </div>
    </div>
  )
}