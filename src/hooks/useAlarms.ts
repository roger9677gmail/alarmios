import { useState, useEffect } from 'react';
import type { Alarm } from '../types';

export function useAlarms() {
  const [alarms, setAlarms] = useState<Alarm[]>(() => {
    const saved = localStorage.getItem('ios-alarms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      { id: '1', time: '07:00', meridiem: 'AM', label: 'Alarm', isActive: true, repeat: ['Weekdays'] },
      { id: '2', time: '08:30', meridiem: 'AM', label: 'Alarm', isActive: false, repeat: ['Weekends'] }
    ];
  });

  useEffect(() => {
    localStorage.setItem('ios-alarms', JSON.stringify(alarms));
  }, [alarms]);

  const addAlarm = (alarm: Alarm) => {
    setAlarms(prev => [...prev, alarm]);
  };

  const updateAlarm = (updated: Alarm) => {
    setAlarms(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  return { alarms, addAlarm, updateAlarm, toggleAlarm, deleteAlarm };
}
