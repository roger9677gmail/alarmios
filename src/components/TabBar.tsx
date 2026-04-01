import { Globe, Clock, Timer, Hourglass } from 'lucide-react';
import './TabBar.css';

export type TabId = 'world-clock' | 'alarm' | 'stopwatch' | 'timer';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  const tabs = [
    { id: 'world-clock', label: 'World Clock', icon: Globe },
    { id: 'alarm', label: 'Alarm', icon: Clock },
    { id: 'stopwatch', label: 'Stopwatch', icon: Timer },
    { id: 'timer', label: 'Timer', icon: Hourglass },
  ] as const;

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <div 
            key={tab.id}
            className={`tab-item ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span>{tab.label}</span>
          </div>
        );
      })}
    </nav>
  );
}
