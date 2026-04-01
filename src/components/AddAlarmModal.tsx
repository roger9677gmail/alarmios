import { useState } from 'react';
import { Switch } from './Switch';
import { ChevronRight } from 'lucide-react';
import './AddAlarmModal.css';

interface AddAlarmModalProps {
  onCancel: () => void;
  onSave: (time: string, label: string) => void;
}

export function AddAlarmModal({ onCancel, onSave }: AddAlarmModalProps) {
  const [time, setTime] = useState('07:00');
  const [label, setLabel] = useState('Alarm');
  const [snooze, setSnooze] = useState(true);

  const handleSave = () => {
    onSave(time, label);
  };

  return (
    <div className="add-modal-overlay">
      <div className="modal-header">
        <button className="modal-btn cancel" onClick={onCancel}>Cancel</button>
        <h2>Add Alarm</h2>
        <button className="modal-btn save" onClick={handleSave}>Save</button>
      </div>

      <div className="time-picker-container">
        {/* On iOS, this triggers the native time wheel picker. On desktop it shows a generic input */}
        <input 
          type="time" 
          className="native-time-input" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="options-list">
        <div className="option-row">
          <span>Repeat</span>
          <div className="option-val">Never <ChevronRight size={20} /></div>
        </div>
        <div className="option-row">
          <span>Label</span>
          <div className="option-val">
            <input 
              className="option-input" 
              value={label} 
              onChange={e => setLabel(e.target.value)} 
            />
          </div>
        </div>
        <div className="option-row">
          <span>Sound</span>
          <div className="option-val">Radar <ChevronRight size={20} /></div>
        </div>
        <div className="option-row" style={{ paddingRight: '16px' }}>
          <span>Snooze</span>
          <Switch checked={snooze} onChange={setSnooze} />
        </div>
      </div>
    </div>
  );
}
