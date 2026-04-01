import { useState } from 'react';
import { TabBar } from './components/TabBar';
import type { TabId } from './components/TabBar';
import { WorldClock } from './pages/WorldClock';
import { AlarmList } from './pages/AlarmList';
import { Stopwatch } from './pages/Stopwatch';
import { Timer } from './pages/Timer';
import { useAlarms } from './hooks/useAlarms';
import { useClockEngine } from './hooks/useClockEngine';
import type { Alarm } from './types';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('alarm');
  const alarmState = useAlarms();
  const [ringingAlarm, setRingingAlarm] = useState<Alarm | null>(null);

  useClockEngine(alarmState.alarms, (triggeredAlarm) => {
    setRingingAlarm(triggeredAlarm);
  });

  const handleStopRing = () => {
    if (ringingAlarm) {
      // automatically turn off the alarm if it's one-time
      if (ringingAlarm.repeat.length === 0) {
        alarmState.toggleAlarm(ringingAlarm.id);
      }
      setRingingAlarm(null);
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'world-clock':
        return <WorldClock />;
      case 'alarm':
        return <AlarmList alarmState={alarmState} />;
      case 'stopwatch':
        return <Stopwatch />;
      case 'timer':
        return <Timer />;
      default:
        return <AlarmList alarmState={alarmState} />;
    }
  };

  return (
    <div className="app-container">
      <main className="page-container">
        {renderPage()}
      </main>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {ringingAlarm && (
        <div className="ringing-overlay">
          <h2>{ringingAlarm.time} {ringingAlarm.meridiem}</h2>
          <p>{ringingAlarm.label}</p>
          <button className="stop-ring-btn" onClick={handleStopRing}>Tap to Stop</button>
        </div>
      )}
    </div>
  );
}

export default App;
