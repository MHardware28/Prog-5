import { useState } from 'react'
import Topbar from '../shared/Topbar'
import BottomNav from '../shared/BottomNav'
 
const INIT_TASKS = [
  { id: 1, text: 'Take morning medications 💊',        time: '8:00 AM',  date: 'Mar 6', color: '#FF6B9D', done: true },
  { id: 2, text: 'Doctor appointment - Dr. Reeves 🏥', time: '10:30 AM', date: 'Mar 6', color: '#FFB347', done: false },
  { id: 3, text: 'Weekly community group session 👥',  time: '2:00 PM',  date: 'Mar 7', color: '#A29BFE', done: true },
  { id: 4, text: 'Evening walk in the garden 🌿',      time: '5:30 PM',  date: 'Mar 6', color: '#55EFC4', done: false },
  { id: 5, text: 'Take evening medications 💊',        time: '8:00 PM',  date: 'Mar 6', color: '#FF6B9D', done: false },
]

const TABS = ['Today', 'This Week', "Emma's", 'Shared']
 
export default function Tasks({ goTo, onAddTask }) {
  const [tasks, setTasks] = useState(INIT_TASKS)
  const [tab, setTab] = useState('Today')
 
  const toggle = id => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const remove = id => setTasks(prev => prev.filter(t => t.id !== id))
 
  return (
    <div className="screen s-tasks">
      <Topbar />
      <div className="body">
        <div className="tasks-title">📋 My Tasks</div>
        <div className="tab-row">
          {TABS.map(t => <button key={t} className={`tab${tab === t ? ' on' : ''}`} onClick={() => setTab(t)}>{t}</button>)}
        </div>
        <div className="task-actions">
          <button className="action-btn">📥 Download</button>
          <button className="action-btn">📧 Email to Emma</button>
        </div>
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="tc-color" style={{ background: task.color }} />
            <div className="tc-body">
              <div className={`tc-title${task.done ? ' done' : ''}`}>{task.text}</div>
              <div className="tc-meta">
                <span className="tc-time">⏰ {task.time}</span>
                <span className="tc-date">{task.date}</span>
              </div>
            </div>
            <div className="tc-actions">
              <button className="tc-act">✏️</button>
              <button className="tc-act" onClick={() => remove(task.id)}>🗑️</button>
            </div>
            <div className={`tc-check${task.done ? ' done' : ''}`} onClick={() => toggle(task.id)}>
              {task.done ? '✓' : ''}
            </div>
          </div>
        ))}
        <div style={{ height: 80 }} />
      </div>
      <button className="add-fab" onClick={onAddTask}>＋</button>
      <BottomNav current="tasks" goTo={goTo} />
    </div>
  )
}