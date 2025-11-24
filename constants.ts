import { AlertLog, Camera, ChartData, WeeklyData } from './types';

export const CAMERAS: Camera[] = [
  {
    id: 'CAM-01',
    name: 'Park Zone A - North',
    status: 'alert', // Simulating active alert
    location: 'Central Park',
    thumbnailUrl: 'https://placehold.co/640x360/333333/FFFFFF?text=CAM-01+Park+Zone+A',
  },
  {
    id: 'CAM-02',
    name: 'Industrial Dist. Gate 4',
    status: 'online',
    location: 'Sector 7',
    thumbnailUrl: 'https://placehold.co/640x360/222222/FFFFFF?text=CAM-02+Industrial+Gate',
  },
  {
    id: 'CAM-03',
    name: 'Residential Block C',
    status: 'online',
    location: 'Downtown',
    thumbnailUrl: 'https://placehold.co/640x360/444444/FFFFFF?text=CAM-03+Residential+Block',
  },
  {
    id: 'CAM-04',
    name: 'Waste Management Facility',
    status: 'offline',
    location: 'Outskirts',
    thumbnailUrl: 'https://placehold.co/640x360/111111/FFFFFF?text=CAM-04+Waste+Mgmt+(Offline)',
  },
];

export const RECENT_ALERTS: AlertLog[] = [
  { id: 'AL-1023', timestamp: '10:42 AM', location: 'Park Zone A', type: 'Smoke', severity: 'High', confidence: 98, status: 'Sent', imageUrl: 'https://placehold.co/800x600/EF4444/FFFFFF?text=High+Severity+Smoke+Detection' },
  { id: 'AL-1022', timestamp: '09:15 AM', location: 'Industrial Dist.', type: 'Fire', severity: 'High', confidence: 92, status: 'Sent', imageUrl: 'https://placehold.co/800x600/F59E0B/FFFFFF?text=Fire+Detection+Evidence' },
  { id: 'AL-1021', timestamp: 'Yesterday', location: 'Residential Block C', type: 'Smoke', severity: 'Medium', confidence: 88, status: 'Sent' },
  { id: 'AL-1020', timestamp: 'Yesterday', location: 'Park Zone A', type: 'Smoke', severity: 'Low', confidence: 75, status: 'Pending' },
  { id: 'AL-1019', timestamp: '2 days ago', location: 'Riverside Walk', type: 'Fire', severity: 'Medium', confidence: 82, status: 'Failed' },
];

export const WEEKLY_ALERTS_DATA: WeeklyData[] = [
  { day: 'Mon', alerts: 4 },
  { day: 'Tue', alerts: 7 },
  { day: 'Wed', alerts: 3 },
  { day: 'Thu', alerts: 8 },
  { day: 'Fri', alerts: 5 },
  { day: 'Sat', alerts: 12 },
  { day: 'Sun', alerts: 9 },
];

export const POLLUTION_BY_DISTRICT_DATA: ChartData[] = [
  { name: 'Industrial', value: 45, fill: '#EF4444' }, // Red
  { name: 'Residential', value: 25, fill: '#F59E0B' }, // Orange
  { name: 'Parks', value: 15, fill: '#10B981' }, // Green
  { name: 'Outskirts', value: 15, fill: '#3B82F6' }, // Blue
];