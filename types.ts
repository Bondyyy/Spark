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
  confidence: number;
  status: 'Sent' | 'Pending' | 'Failed';
}

export interface ChartData {
  time: string;
  value: number;
}