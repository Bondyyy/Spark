import { AlertLog, Camera, ChartData } from './types';

export const CAMERAS: Camera[] = [
  {
    id: 'CAM-01',
    name: 'Park Zone A - North',
    status: 'alert', // Simulating active alert
    location: 'Central Park',
    thumbnailUrl: 'https://picsum.photos/seed/park1/800/450',
  },
  {
    id: 'CAM-02',
    name: 'Industrial Dist. Gate 4',
    status: 'online',
    location: 'Sector 7',
    thumbnailUrl: 'https://picsum.photos/seed/factory1/800/450',
  },
  {
    id: 'CAM-03',
    name: 'Residential Block C',
    status: 'online',
    location: 'Downtown',
    thumbnailUrl: 'https://picsum.photos/seed/city1/800/450',
  },
  {
    id: 'CAM-04',
    name: 'Waste Management Facility',
    status: 'offline',
    location: 'Outskirts',
    thumbnailUrl: 'https://picsum.photos/seed/waste/800/450',
  },
];

export const RECENT_ALERTS: AlertLog[] = [
  { id: 'AL-1023', timestamp: '10:42 AM', location: 'Park Zone A', type: 'Smoke', confidence: 98, status: 'Sent' },
  { id: 'AL-1022', timestamp: '09:15 AM', location: 'Industrial Dist.', type: 'Fire', confidence: 92, status: 'Sent' },
  { id: 'AL-1021', timestamp: 'Yesterday', location: 'Residential Block C', type: 'Smoke', confidence: 88, status: 'Sent' },
  { id: 'AL-1020', timestamp: 'Yesterday', location: 'Park Zone A', type: 'Smoke', confidence: 75, status: 'Pending' },
];

export const AIR_QUALITY_DATA: ChartData[] = [
  { time: '06:00', value: 45 },
  { time: '08:00', value: 65 },
  { time: '10:00', value: 120 }, // Spike due to simulated burning
  { time: '12:00', value: 90 },
  { time: '14:00', value: 55 },
  { time: '16:00', value: 40 },
  { time: '18:00', value: 42 },
];