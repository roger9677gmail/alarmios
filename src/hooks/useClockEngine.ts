import { useEffect } from 'react';
import type { Alarm } from '../types';
import { LocalNotifications } from '@capacitor/local-notifications';

export function useClockEngine(alarms: Alarm[], onRing: (alarm: Alarm) => void) {
  
  // Schedule background notifications whenever alarms change
  useEffect(() => {
    const syncNotifications = async () => {
      // Check permissions
      let permStatus = await LocalNotifications.checkPermissions();
      if (permStatus.display !== 'granted') {
        permStatus = await LocalNotifications.requestPermissions();
      }
      
      if (permStatus.display !== 'granted') return;

      // Cancel all existing notifications
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel({ notifications: pending.notifications });
      }

      // Schedule active alarms
      const activeAlarms = alarms.filter(a => a.isActive);
      for (const alarm of activeAlarms) {
        const [hourStr, minStr] = alarm.time.split(':');
        let hours = parseInt(hourStr, 10);
        const mins = parseInt(minStr, 10);
        
        if (alarm.meridiem === 'PM' && hours < 12) hours += 12;
        if (alarm.meridiem === 'AM' && hours === 12) hours = 0;

        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Alarm',
              body: alarm.label,
              id: parseInt(alarm.id),
              schedule: {
                on: {
                  hour: hours,
                  minute: mins,
                },
                allowWhileIdle: true,
              },
              sound: 'beep.wav', // default sound or custom if added to native project
            }
          ]
        });
      }
    };

    syncNotifications();
  }, [alarms]);

  // Foreground checker loop (1x a second)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      
      const isPM = h >= 12;
      const meridiem = isPM ? 'PM' : 'AM';
      if (h > 12) h -= 12;
      if (h === 0) h = 12;

      // Only trigger at exact second 00
      if (s === 0) {
        const activeAlarms = alarms.filter(a => a.isActive);
        const triggered = activeAlarms.find(a => {
          // parse alarm time to hour and minute exactly
          const [alarmH, alarmM] = a.time.split(':').map(Number);
          return alarmH === h && alarmM === m && a.meridiem === meridiem;
        });

        if (triggered) {
          onRing(triggered);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms, onRing]);
}
