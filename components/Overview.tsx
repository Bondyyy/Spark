import React from 'react';
import { Video, AlertTriangle, Activity, CheckCircle, MapPin } from 'lucide-react';
import { RECENT_ALERTS } from '../constants';

const Overview: React.FC = () => {
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

        {/* Mini Map Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            Monitored Zones
          </h3>
          <div className="flex-1 bg-slate-100 rounded-lg relative overflow-hidden group min-h-[200px]">
            {/* Abstract Map Graphic */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)',
                backgroundSize: '20px 20px'
            }}></div>
            
            {/* Map Points */}
            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg ring-4 ring-primary/20">
              <div className="absolute -top-8 -left-8 bg-white px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Zone A</div>
            </div>
            <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping shadow-lg"></div>
            <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-red-500 rounded-full shadow-lg ring-4 ring-red-500/20">
               <div className="absolute -top-8 -right-8 bg-white px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap text-red-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Alert!</div>
            </div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary rounded-full shadow-lg"></div>

            <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 text-[10px] rounded shadow text-gray-500">
              Hanoi, VN
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