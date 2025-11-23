import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Video, 
  AlertTriangle, 
  BarChart2, 
  Settings as SettingsIcon, 
  Bell, 
  User, 
  LogOut,
  Menu,
} from 'lucide-react';

// Import View Components
import Overview from './Overview';
import LiveMonitoring from './LiveMonitoring';
import AlertLogs from './AlertLogs';
import Analytics from './Analytics';
import Settings from './Settings';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'monitoring': return <LiveMonitoring />;
      case 'alerts': return <AlertLogs />;
      case 'analytics': return <Analytics />;
      case 'settings': return <Settings />;
      default: return <Overview />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Command Center Overview';
      case 'monitoring': return 'Live Surveillance';
      case 'alerts': return 'Incident Logs';
      case 'analytics': return 'Data Analytics';
      case 'settings': return 'System Configuration';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      
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
             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3 shadow-sm">
               <div className="w-4 h-4 border-2 border-white rounded-full"></div>
             </div>
             <span className="font-bold text-lg tracking-tight text-slate-800">SENTINEL<span className="text-primary">AI</span></span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }} />
            <SidebarItem icon={<Video size={20} />} label="Live Monitoring" active={activeTab === 'monitoring'} onClick={() => { setActiveTab('monitoring'); setSidebarOpen(false); }} />
            <SidebarItem icon={<AlertTriangle size={20} />} label="Alert Logs" active={activeTab === 'alerts'} onClick={() => { setActiveTab('alerts'); setSidebarOpen(false); }} badge="New" />
            <SidebarItem icon={<BarChart2 size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }} />
            <div className="pt-6 mt-6 border-t border-gray-100">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">System</p>
              <SidebarItem icon={<SettingsIcon size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }} />
            </div>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 text-slate-500 hover:text-danger w-full px-4 py-2 transition-colors rounded-lg hover:bg-red-50 group"
            >
              <LogOut size={20} className="group-hover:text-danger transition-colors" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 line-clamp-1">
              {getTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              System Online
            </div>
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-700">Admin User</p>
                    <p className="text-xs text-gray-400">Supervisor</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300 overflow-hidden">
                    <User size={18} className="text-slate-500" />
                </div>
            </div>
          </div>
        </header>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Sidebar Helper Component
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

export default Dashboard;