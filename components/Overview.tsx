import React from 'react';
import { Video, AlertTriangle, Activity, MapPin, Signal, Wifi, WifiOff } from 'lucide-react';
import { RECENT_ALERTS } from '../constants';

const Overview: React.FC = () => {
  // Mock data for map markers
  const mapMarkers = [
    { 
      id: 'M1', 
      top: '30%', 
      left: '25%', 
      location: 'Park Zone A', 
      status: 'alert', 
      type: 'Smoke',
      cameraId: 'CAM-01', 
      time: '10:42 AM' 
    },
    { 
      id: 'M2', 
      top: '45%', 
      left: '60%', 
      location: 'Industrial Gate 4', 
      status: 'active', 
      type: 'Monitoring',
      cameraId: 'CAM-02', 
      time: 'Live' 
    },
    { 
      id: 'M3', 
      top: '75%', 
      left: '45%', 
      location: 'Residential Block C', 
      status: 'active', 
      type: 'Monitoring',
      cameraId: 'CAM-03', 
      time: 'Live' 
    },
    { 
      id: 'M4', 
      top: '20%', 
      left: '80%', 
      location: 'Waste Facility', 
      status: 'offline', 
      type: 'Offline',
      cameraId: 'CAM-04', 
      time: 'Offline' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Alerts" 
          value="1,284" 
          subtitle="Lifetime Detections" 
          icon={<AlertTriangle className="text-warning" />}
          trend="+12% this week"
          trendUp={true}
        />
        <StatCard 
          title="Active Cameras" 
          value="24/25" 
          subtitle="1 Offline" 
          icon={<Video className="text-primary" />}
        />
        <StatCard 
          title="System Health" 
          value="99.9%" 
          subtitle="Operational" 
          icon={<Activity className="text-blue-500" />}
          goodState={true}
        />
        <StatCard 
          title="Today's Violations" 
          value="3" 
          subtitle="Requires Action" 
          icon={<MapPin className="text-red-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-400" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {RECENT_ALERTS.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                <div className={`p-2 rounded-full mt-1 ${
                  alert.type === 'Fire' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">
                      {alert.type} Detected at {alert.location}
                    </h4>
                    <span className="text-xs text-gray-400">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    AI Confidence: <span className="font-medium">{alert.confidence}%</span> • Status: {alert.status}
                  </p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-sm text-center text-primary font-medium hover:bg-green-50 rounded-lg transition-colors mt-2">
              View All Activity
            </button>
          </div>
        </div>

        {/* Command Center Map / Monitored Zones */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            Command Center Map
          </h3>
          
          {/* Map Container - Reorganized for Overflow Handling */}
          <div className="flex-1 relative min-h-[350px]">
            
            {/* 1. Background Layer (Clipped for Border Radius) */}
            <div className="absolute inset-0 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 z-0">
                {/* Background Image with Opacity */}
                <img 
                  src="https://placehold.co/1470x800/0F172A/FFFFFF?text=Command+Center+Map+Visual"
                  alt="Command Center Map" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                />
                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
                
                {/* Live Indicator (Inside clipped area) */}
                <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1.5 shadow-lg pointer-events-none z-10">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    LIVE MAP
                </div>

                {/* Map Legend (Inside clipped area) */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 text-[10px] text-slate-300 flex flex-col gap-1.5 z-10 pointer-events-none">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary shadow shadow-primary/50"></span> Active Monitoring
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 shadow shadow-red-500/50"></span> Incident Alert
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-500"></span> Camera Offline
                    </div>
                </div>
            </div>

            {/* 2. Marker Layer (Unclipped/Visible Overflow) */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-visible">
                {/* Interactive Markers */}
                {mapMarkers.map((marker) => (
                  <div 
                    key={marker.id}
                    className="map-marker group pointer-events-auto"
                    style={{ top: marker.top, left: marker.left }}
                  >
                    {/* Pulse Animation for Alerts */}
                    {marker.status === 'alert' && (
                      <div className="absolute -inset-4 bg-red-500/30 rounded-full animate-ping pointer-events-none"></div>
                    )}

                    {/* The Dot Marker */}
                    <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.5)] transform transition-all duration-300 group-hover:scale-125 ${
                      marker.status === 'alert' ? 'bg-red-500 shadow-red-500/50' : 
                      marker.status === 'active' ? 'bg-primary shadow-primary/50' : 'bg-slate-500'
                    }`}></div>

                    {/* Tooltip Card - Always on top, can overflow */}
                    <div className="marker-tooltip bg-slate-900/95 backdrop-blur-md text-white rounded-lg shadow-2xl border border-slate-700 pointer-events-none">
                      
                      {/* Tooltip Header */}
                      <div className={`px-3 py-2 border-b border-white/10 flex justify-between items-center rounded-t-lg ${
                        marker.status === 'alert' ? 'bg-red-500/20' : ''
                      }`}>
                        <span className="font-bold text-sm truncate">{marker.location}</span>
                        {marker.status === 'alert' && <AlertTriangle size={14} className="text-red-500 animate-pulse" />}
                        {marker.status === 'active' && <Signal size={14} className="text-primary" />}
                        {marker.status === 'offline' && <WifiOff size={14} className="text-slate-400" />}
                      </div>

                      {/* Tooltip Body (Mini Table) */}
                      <div className="p-3">
                        <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-2 text-xs">
                            <span className="text-slate-400">Status:</span>
                            <span className={`font-bold ${
                              marker.status === 'alert' ? 'text-red-400' : 
                              marker.status === 'active' ? 'text-primary' : 'text-slate-400'
                            }`}>
                              {marker.status === 'alert' ? `${marker.type} Detected` : marker.type}
                            </span>

                            <span className="text-slate-400">Camera ID:</span>
                            <span className="text-slate-200 font-mono">{marker.cameraId}</span>

                            <span className="text-slate-400">Time:</span>
                            <span className="text-slate-200">{marker.time}</span>
                        </div>
                      </div>

                      {/* Tooltip Arrow */}
                      <div className="tooltip-arrow"></div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon, trend, trendUp, goodState }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${goodState ? 'bg-green-100' : 'bg-gray-50'}`}>
        {icon}
      </div>
    </div>
    <div className="flex items-center gap-2 text-xs">
      {trend && (
        <span className={`${trendUp ? 'text-green-600' : 'text-red-600'} font-bold`}>
          {trend}
        </span>
      )}
      <span className="text-slate-400">{subtitle}</span>
    </div>
  </div>
);

export default Overview;