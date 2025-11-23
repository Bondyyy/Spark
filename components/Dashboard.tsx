import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  AlertTriangle, 
  BarChart2, 
  Settings, 
  Bell, 
  User, 
  LogOut,
  Menu,
  X,
  Send
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { CAMERAS, RECENT_ALERTS, AIR_QUALITY_DATA } from '../constants';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState('monitoring');

  const triggerSimulation = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className="bg-white border-l-4 border-primary shadow-2xl rounded-lg p-4 flex items-center gap-4 min-w-[300px]">
            <div className="bg-primary/10 p-2 rounded-full">
               <Send className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Alert Sent!</h4>
              <p className="text-sm text-gray-500">Evidence sent to Telegram Channel.</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-100">
             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
               <div className="w-4 h-4 border-2 border-white rounded-full"></div>
             </div>
             <span className="font-bold text-lg tracking-tight">SENTINEL<span className="text-primary">AI</span></span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarItem icon={<Video size={20} />} label="Live Monitoring" active={activeTab === 'monitoring'} onClick={() => setActiveTab('monitoring')} />
            <SidebarItem icon={<AlertTriangle size={20} />} label="Alert Logs" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} badge="3" />
            <SidebarItem icon={<BarChart2 size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
            <div className="pt-6 mt-6 border-t border-gray-100">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">System</p>
              <SidebarItem icon={<Settings size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
            </div>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 text-slate-500 hover:text-danger w-full px-4 py-2 transition-colors rounded-lg hover:bg-red-50"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              {activeTab === 'monitoring' ? 'Command Center' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              System Online
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300">
              <User size={16} className="text-slate-500" />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title="Active Cameras" 
              value="24" 
              subtitle="All systems operational" 
              icon={<Video className="text-primary" />} 
            />
            <StatCard 
              title="Alerts Today" 
              value="3" 
              subtitle="+2 from yesterday" 
              icon={<AlertTriangle className="text-warning" />} 
              trend="up"
            />
             <StatCard 
              title="Avg PM2.5 Level" 
              value="42 µg/m³" 
              subtitle="Moderate Quality" 
              icon={<BarChart2 className="text-blue-500" />} 
            />
          </div>

          {/* Live Monitoring Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Live Surveillance Feeds</h2>
              <button 
                onClick={triggerSimulation}
                className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2"
              >
                <AlertTriangle size={16} />
                Simulate Detection
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {CAMERAS.map((cam) => (
                <CameraFeed key={cam.id} camera={cam} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Analytics Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800">Pollution Trends (24h)</h3>
                <select className="text-sm border-gray-300 rounded-md text-gray-500 bg-gray-50 px-2 py-1">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={AIR_QUALITY_DATA}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Alerts List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-0 overflow-hidden">
               <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Recent Alerts</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-6 py-3 font-medium">Time</th>
                      <th className="px-6 py-3 font-medium">Type</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {RECENT_ALERTS.map((alert) => (
                      <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-3 font-medium text-gray-900">{alert.timestamp}</td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            alert.type === 'Fire' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {alert.type}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <span className={`flex items-center gap-1.5 text-xs font-medium ${
                            alert.status === 'Sent' ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              alert.status === 'Sent' ? 'bg-green-600' : 'bg-gray-400'
                            }`}></span>
                            {alert.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// Sub-components for cleaner code

const SidebarItem = ({ icon, label, active, onClick, badge }: any) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center justify-between px-4 py-3 rounded-lg mb-1 transition-all duration-200
      ${active ? 'bg-primary/10 text-primary font-semibold' : 'text-slate-500 hover:bg-gray-50 hover:text-slate-900'}
    `}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {badge && (
      <span className="bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
    )}
  </button>
);

const StatCard = ({ title, value, subtitle, icon, trend }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className="p-2 bg-gray-50 rounded-lg">
        {icon}
      </div>
    </div>
    <p className="text-xs text-slate-400 flex items-center gap-1">
      {trend === 'up' && <span className="text-danger font-bold">↑</span>}
      {subtitle}
    </p>
  </div>
);

const CameraFeed = ({ camera }: { camera: any }) => (
  <div className="group relative bg-black rounded-xl overflow-hidden aspect-video shadow-lg ring-1 ring-black/5">
    {/* Video/Image Placeholder */}
    <img 
      src={camera.thumbnailUrl} 
      alt={camera.name} 
      className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity"
    />
    
    {/* UI Overlays */}
    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${camera.status === 'alert' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
      <span className="font-mono font-medium tracking-wide">{camera.id}</span>
    </div>
    
    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded font-medium">
      {new Date().toLocaleTimeString()}
    </div>

    {/* Simulated Detection Bounding Box (Only for Alert status) */}
    {camera.status === 'alert' && (
      <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 border-2 border-danger shadow-[0_0_15px_rgba(239,68,68,0.5)] rounded-sm flex flex-col justify-between p-1">
        <div className="self-start bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider shadow-sm">
          Smoke: 98%
        </div>
      </div>
    )}

    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <p className="text-white font-medium text-sm">{camera.name}</p>
      <p className="text-white/60 text-xs">{camera.location}</p>
    </div>
  </div>
);

export default Dashboard;