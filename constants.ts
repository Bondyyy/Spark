import { AlertLog, Camera, ChartData, WeeklyData } from './types';

export const CAMERAS: Camera[] = [
  {
    id: 'CAM-01',
    name: 'Park Zone A - North',
    status: 'alert', // Simulating active alert
    location: 'Central Park',
    thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'CAM-02',
    name: 'Industrial Dist. Gate 4',
    status: 'online',
    location: 'Sector 7',
    thumbnailUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'CAM-03',
    name: 'Residential Block C',
    status: 'online',
    location: 'Downtown',
    thumbnailUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'CAM-04',
    name: 'Waste Management Facility',
    status: 'offline',
    location: 'Outskirts',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop',
  },
];

export const RECENT_ALERTS: AlertLog[] = [
  { id: 'AL-1023', timestamp: '10:42 AM', location: 'Park Zone A', type: 'Smoke', severity: 'High', confidence: 98, status: 'Sent', imageUrl: 'https://images.unsplash.com/photo-1626573860472-a0a3826019a3?q=80&w=800&auto=format&fit=crop' },
  { id: 'AL-1022', timestamp: '09:15 AM', location: 'Industrial Dist.', type: 'Fire', severity: 'High', confidence: 92, status: 'Sent', imageUrl: 'https://images.unsplash.com/photo-1542461927-9481923cb411?q=80&w=800&auto=format&fit=crop' },
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