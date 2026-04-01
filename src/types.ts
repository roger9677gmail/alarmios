export interface Alarm {
  id: string;
  time: string; // HH:mm format
  meridiem: 'AM' | 'PM';
  label: string;
  isActive: boolean;
  repeat: string[]; // Days of week
}
