import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { WEEKLY_ALERTS_DATA, POLLUTION_BY_DISTRICT_DATA } from '../constants';
import { Download, Lock } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Performance Analytics</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 shadow-sm">
              <Download size={16} />
              Export Report
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Alerts Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 text-lg">Alerts (Last 7 Days)</h3>
            <p className="text-sm text-gray-500">Frequency of illegal burning detections</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_ALERTS_DATA} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}} 
                />
                <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar 
                    dataKey="alerts" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pollution Sources Pie Chart - LOCKED */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative overflow-hidden">
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 text-lg">Pollution by District</h3>
            <p className="text-sm text-gray-500">Distribution of detected incidents</p>
          </div>
          
          <div className="h-[300px] w-full relative opacity-40 blur-[2px] pointer-events-none select-none">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={POLLUTION_BY_DISTRICT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {POLLUTION_BY_DISTRICT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center -mt-4">
                <span className="text-3xl font-bold text-gray-800">100%</span>
             </div>
          </div>

          {/* Locked Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-[1px] z-10">
             <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 text-center max-w-xs transform hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-slate-700" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Advanced Analytics Locked</h4>
                <p className="text-sm text-slate-500 mb-4">Upgrade to <span className="font-bold text-primary">PRO</span> to view advanced GIS & Statistical Reports.</p>
                <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors w-full">
                    Upgrade Now
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;