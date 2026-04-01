import { useState } from 'react';
import { useAlarms } from '../hooks/useAlarms';
import { Switch } from '../components/Switch';
import { AddAlarmModal } from '../components/AddAlarmModal';
import { ChevronRight, Plus } from 'lucide-react';
import './AlarmList.css';

export function AlarmList({ alarmState }: { alarmState: ReturnType<typeof useAlarms> }) {
  const { alarms, addAlarm, toggleAlarm, deleteAlarm } = alarmState;
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSaveAlarm = (timeString: string, label: string) => {
    // timeString is typically "HH:mm" from input type time
    const [hours, mins] = timeString.split(':');
    let h = parseInt(hours, 10);
    const meridiem = h >= 12 ? 'PM' : 'AM';
    if (h > 12) h -= 12;
    if (h === 0) h = 12;

    addAlarm({
      id: Date.now().toString(),
      time: `${h}:${mins}`,
      meridiem,
      label,
      isActive: true,
      repeat: []
    });
    setShowAddModal(false);
  };

  return (
    <div className="alarm-page">
      <header className="header-nav">
        <button 
          className="header-btn" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Done' : 'Edit'}
        </button>
        <button className="header-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={24} />
        </button>
      </header>

      <div className="title-container">
        <h1 className="ios-title">Alarm</h1>
      </div>

      <div className="alarm-list">
        {alarms.map(alarm => (
          <div key={alarm.id} className={`alarm-item ${!alarm.isActive ? 'inactive' : ''}`}>
            {isEditing && (
              <div className="edit-control">
                <button 
                  className="delete-btn"
                  onClick={() => deleteAlarm(alarm.id)}
                >
                  -
                </button>
              </div>
            )}
            
            <div className="alarm-item-body" style={{ transform: isEditing ? 'translateX(0)' : 'none' }}>
              <div className="alarm-time-container">
                <div className="alarm-time">
                  {alarm.time} <span className="alarm-meridiem">{alarm.meridiem}</span>
                </div>
                <div className="alarm-label">
                  {alarm.label}{alarm.repeat.length > 0 ? `, ${alarm.repeat.join(' ')}` : ''}
                </div>
              </div>
              
              {isEditing ? (
                <div className="arrow-right">
                  <ChevronRight size={20} />
                </div>
              ) : (
                <Switch 
                  checked={alarm.isActive} 
                  onChange={() => toggleAlarm(alarm.id)} 
                />
              )}
            </div>
          </div>
        ))}
        {alarms.length === 0 && (
          <div style={{ padding: '20px 0', color: 'var(--ios-gray)', textAlign: 'center' }}>
            No Alarms.
          </div>
        )}
      </div>

      {showAddModal && (
        <AddAlarmModal onCancel={() => setShowAddModal(false)} onSave={handleSaveAlarm} />
      )}
    </div>
  );
}
