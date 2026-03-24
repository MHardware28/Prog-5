import { useState } from 'react'

const COLORS = ['#FF6B9D', '#FFB347', '#4ECDC4', '#A29BFE', '#55EFC4', '#FDCB6E']
const today = new Date().toISOString().split('T')[0]

export default function AddTaskModal({ show, onClose, onSave }) {
  const [text, setText]   = useState('')
  const [time, setTime]   = useState('08:00')
  const [date, setDate]   = useState(today)
  const [color, setColor] = useState('#FF6B9D')

  if (!show) return null

  const handleSave = () => {
    if (!text.trim()) return
    onSave({ text, time, date, color })
    setText('')
    setTime('08:00')
    setDate(today)
    setColor('#FF6B9D')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-title">✨ Add New Task</div>

        <label className="f-label">Task Name</label>
        <input
          className="modal-input"
          placeholder="e.g. Take morning medication"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <label className="f-label">Time</label>
        <input
          type="time"
          className="modal-input"
          value={time}
          onChange={e => setTime(e.target.value)}
        />

        <label className="f-label">Date</label>
        <input
          type="date"
          className="modal-input"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <label className="f-label">Pick a Color</label>
        <div className="color-row">
          {COLORS.map(c => (
            <div key={c} className={`color-dot${color === c ? ' sel' : ''}`} style={{ background: c }} onClick={() => setColor(c)} />
          ))}
        </div>

        <button className="save-btn" onClick={handleSave}>Save Task 💾</button>
      </div>
    </div>
  )
}