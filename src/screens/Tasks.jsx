import { useState } from 'react'
import Topbar from '../shared/Topbar'
import BottomNav from '../shared/BottomNav'
import AddTaskModal from '../shared/AddTaskModal'

const today = new Date().toISOString().split('T')[0]

const formatDate = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const formatTime = (time) => {
  const [h, m] = time.split(':')
  const hour = parseInt(h)
  return `${hour % 12 || 12}:${m} ${hour < 12 ? 'AM' : 'PM'}`
}

const INIT_TASKS = [
  { id: 1, text: 'Take morning medications 💊',        time: '08:00', date: today, color: '#FF6B9D', done: true },
  { id: 2, text: 'Doctor appointment - Dr. Reeves 🏥', time: '10:30', date: today, color: '#FFB347', done: false },
  { id: 3, text: 'Weekly community group session 👥',  time: '14:00', date: today, color: '#A29BFE', done: true },
  { id: 4, text: 'Evening walk in the garden 🌿',      time: '17:30', date: today, color: '#55EFC4', done: false },
  { id: 5, text: 'Take evening medications 💊',        time: '20:00', date: today, color: '#FF6B9D', done: false },
]

const TABS = ['Today', 'This Week', "Emma's", 'Shared']
const COLORS = ['#FF6B9D', '#FFB347', '#4ECDC4', '#A29BFE', '#55EFC4', '#FDCB6E']

export default function Tasks({ goTo, user, onLogout }) {
  const [tasks, setTasks]             = useState(INIT_TASKS)
  const [tab, setTab]                 = useState('Today')
  const [editingTask, setEditingTask] = useState(null)
  const [showModal, setShowModal]     = useState(false)

  const toggle    = id => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const remove    = id => setTasks(prev => prev.filter(t => t.id !== id))
  const startEdit = task => setEditingTask({ ...task })

  const saveEdit = () => {
    setTasks(prev => prev.map(t => t.id === editingTask.id ? editingTask : t))
    setEditingTask(null)
  }

  const download = () => {
    const lines = [
      'Life Support — My Task List',
      '============================',
      '',
      ...tasks.map(t => `[${t.done ? '✓' : ' '}] ${t.text} | ${formatTime(t.time)} | ${formatDate(t.date)}`),
      '',
      `Downloaded on ${new Date().toLocaleDateString()}`,
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'my-tasks.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="screen s-tasks">
      <Topbar user={user} onLogout={onLogout} />
      <div className="body">
        <div className="tasks-title">📋 My Tasks</div>

        <div className="tab-row">
          {TABS.map(t => (
            <button key={t} className={`tab${tab === t ? ' on' : ''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        <div className="task-actions">
          <button className="action-btn" onClick={download}>📥 Download</button>
          <button className="action-btn">📧 Email to Emma</button>
        </div>

        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="tc-color" style={{ background: task.color }} />
            <div className="tc-body">
              <div className={`tc-title${task.done ? ' done' : ''}`}>{task.text}</div>
              <div className="tc-meta">
                <span className="tc-time">⏰ {formatTime(task.time)}</span>
                <span className="tc-date">{formatDate(task.date)}</span>
              </div>
            </div>
            <div className="tc-actions">
              <button className="tc-act" onClick={() => startEdit(task)}>✏️</button>
              <button className="tc-act" onClick={() => remove(task.id)}>🗑️</button>
            </div>
            <div className={`tc-check${task.done ? ' done' : ''}`} onClick={() => toggle(task.id)}>
              {task.done ? '✓' : ''}
            </div>
          </div>
        ))}

        <div style={{ height: 80 }} />
      </div>

      <button className="add-fab" onClick={() => setShowModal(true)}>＋</button>
      <BottomNav current="tasks" goTo={goTo} />

      <AddTaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={(newTask) => setTasks(prev => [...prev, { ...newTask, id: Date.now(), done: false }])}
      />

      {editingTask && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setEditingTask(null)}>
          <div className="modal-sheet">
            <div className="modal-handle" />
            <div className="modal-title">✏️ Edit Task</div>

            <label className="f-label">Task Name</label>
            <input
              className="modal-input"
              value={editingTask.text}
              onChange={e => setEditingTask(prev => ({ ...prev, text: e.target.value }))}
            />

            <label className="f-label">Time</label>
            <input
              type="time"
              className="modal-input"
              value={editingTask.time}
              onChange={e => setEditingTask(prev => ({ ...prev, time: e.target.value }))}
            />

            <label className="f-label">Date</label>
            <input
              type="date"
              className="modal-input"
              value={editingTask.date}
              onChange={e => setEditingTask(prev => ({ ...prev, date: e.target.value }))}
            />

            <label className="f-label">Pick a Color</label>
            <div className="color-row">
              {COLORS.map(c => (
                <div
                  key={c}
                  className={`color-dot${editingTask.color === c ? ' sel' : ''}`}
                  style={{ background: c }}
                  onClick={() => setEditingTask(prev => ({ ...prev, color: c }))}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="save-btn"
                style={{ background: '#eee', color: '#555', boxShadow: 'none' }}
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={saveEdit}>Save Changes 💾</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}