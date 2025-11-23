export interface Camera {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'alert';
  location: string;
  thumbnailUrl: string;
}

export interface AlertLog {
  id: string;
  timestamp: string;
  location: string;
  type: 'Smoke' | 'Fire';
  severity: 'High' | 'Medium' | 'Low';
  confidence: number;
  status: 'Sent' | 'Pending' | 'Failed';
  imageUrl?: string;
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export interface WeeklyData {
  day: string;
  alerts: number;
}