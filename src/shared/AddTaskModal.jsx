import { useState } from 'react'
 
const COLORS = ['#FF6B9D', '#FFB347', '#4ECDC4', '#A29BFE', '#55EFC4', '#FDCB6E']
 
export default function AddTaskModal({ show, onClose }) {
  const [color, setColor] = useState('#FF6B9D')
  if (!show) return null
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-title">✨ Add New Task</div>
        <label className="f-label">Task Name</label>
        <input className="modal-input" placeholder="e.g. Take morning medication" />
        <label className="f-label">Time</label>
        <input type="time" defaultValue="08:00" className="modal-input" />
        <label className="f-label">Pick a Color</label>
        <div className="color-row">
          {COLORS.map(c => (
            <div key={c} className={`color-dot${color === c ? ' sel' : ''}`} style={{ background: c }} onClick={() => setColor(c)} />
          ))}
        </div>
        <button className="save-btn" onClick={onClose}>Save Task 💾</button>
      </div>
    </div>
  )
}