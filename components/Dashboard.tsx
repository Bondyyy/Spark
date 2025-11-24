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
  CreditCard,
  ShieldCheck,
  MessageSquare,
  Star
} from 'lucide-react';

// Import View Components
import Overview from './Overview';
import LiveMonitoring from './LiveMonitoring';
import AlertLogs from './AlertLogs';
import Analytics from './Analytics';
import Settings from './Settings';
import Subscription from './Subscription';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Feedback State
  const [feedbackRating, setFeedbackRating] = useState<string | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [starRating, setStarRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleEmojiClick = (emoji: string) => {
    setFeedbackRating(emoji);
    if (emoji === '🤩') {
      setStarRating(5);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'monitoring': return <LiveMonitoring />;
      case 'alerts': return <AlertLogs />;
      case 'analytics': return <Analytics />;
      case 'subscription': return <Subscription />;
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
      case 'subscription': return 'Subscription Management';
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
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Logo - Updated for Consistency */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
             <div className="bg-primary text-white p-1.5 rounded-lg shadow-sm shadow-primary/30 mr-3">
               <ShieldCheck className="h-6 w-6" />
             </div>
             <span className="font-bold text-lg tracking-tight text-slate-800">
               CLEAN-AIR <span className="text-primary">SENTINEL</span>
             </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }} />
            <SidebarItem icon={<Video size={20} />} label="Live Monitoring" active={activeTab === 'monitoring'} onClick={() => { setActiveTab('monitoring'); setSidebarOpen(false); }} />
            <SidebarItem icon={<AlertTriangle size={20} />} label="Alert Logs" active={activeTab === 'alerts'} onClick={() => { setActiveTab('alerts'); setSidebarOpen(false); }} badge="New" />
            <SidebarItem icon={<BarChart2 size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }} />
            
            <div className="pt-6 mt-6 border-t border-gray-100">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">System</p>
              <SidebarItem icon={<CreditCard size={20} />} label="Subscription" active={activeTab === 'subscription'} onClick={() => { setActiveTab('subscription'); setSidebarOpen(false); }} />
              <SidebarItem icon={<SettingsIcon size={20} />} label="Settings" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }} />
            </div>

            {/* Advanced Feedback Widget (Sidebar Optimized) */}
            <div className="mt-8 px-2 pb-6">
                {!feedbackSubmitted ? (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <MessageSquare size={14} className="text-slate-400"/>
                            <h4 className="text-xs font-bold text-slate-700 uppercase">Help us improve</h4>
                        </div>
                        
                        <div className="flex justify-between mb-4 px-2">
                            {['😡', '😐', '🤩'].map((emoji, idx) => (
                            <button 
                                key={idx}
                                onClick={() => handleEmojiClick(emoji)}
                                className={`text-2xl hover:scale-110 transition-transform duration-200 ${feedbackRating === emoji ? 'scale-125 grayscale-0' : 'grayscale hover:grayscale-0 opacity-70 hover:opacity-100'}`}
                            >
                                {emoji}
                            </button>
                            ))}
                        </div>
                        
                        {/* Positive Flow */}
                        {feedbackRating === '🤩' && (
                            <div className="space-y-3 animate-fade-in-up">
                                {/* Stars */}
                                <div className="flex justify-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} onClick={() => setStarRating(star)}>
                                      <Star size={16} className={`${star <= starRating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                                    </button>
                                  ))}
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] font-medium text-slate-500 uppercase">What's best?</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Detection', 'Speed', 'Easy', 'UI'].map(tag => (
                                          <button 
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`text-[10px] px-2 py-1 rounded border transition-all ${
                                              selectedTags.includes(tag) 
                                                ? 'bg-primary text-white border-primary' 
                                                : 'bg-white text-slate-600 border-slate-200 hover:border-primary'
                                            }`}
                                          >
                                            {tag}
                                          </button>
                                        ))}
                                    </div>
                                </div>

                                <textarea 
                                    placeholder="Tell us more..." 
                                    className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none h-14 resize-none bg-white placeholder-slate-400"
                                ></textarea>
                                
                                <button 
                                    onClick={() => setFeedbackSubmitted(true)}
                                    className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primaryDark transition-colors shadow-sm"
                                >
                                    Send Love
                                </button>
                            </div>
                        )}

                        {/* Negative Flow */}
                        {(feedbackRating === '😡' || feedbackRating === '😐') && (
                            <div className="space-y-3 animate-fade-in-up">
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-slate-500">What's wrong?</p>
                                    <div className="grid grid-cols-1 gap-1.5">
                                        {[
                                            {id: 'slow', label: 'Slow Performance'},
                                            {id: 'data', label: 'Inaccurate Data'},
                                            {id: 'ui', label: 'UI/UX Issues'},
                                            {id: 'bug', label: 'Other Bugs'}
                                        ].map(reason => (
                                        <label key={reason.id} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:bg-white p-1 rounded transition-colors">
                                            <input type="checkbox" className="rounded text-primary focus:ring-primary border-gray-300" />
                                            {reason.label}
                                        </label>
                                        ))}
                                    </div>
                                </div>
                                
                                <textarea 
                                    placeholder="Describe your issue..." 
                                    className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none h-16 resize-none bg-white placeholder-slate-400"
                                ></textarea>
                                
                                <button 
                                    onClick={() => setFeedbackSubmitted(true)}
                                    className="w-full py-2 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-700 transition-colors shadow-sm"
                                >
                                    Send Feedback
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center animate-fade-in-up">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <ShieldCheck size={16} />
                        </div>
                        <p className="text-green-800 font-bold text-xs mb-1">Feedback Sent!</p>
                        <p className="text-green-600 text-[10px]">Thank you for helping us improve Clean-Air Sentinel.</p>
                        <button onClick={() => {setFeedbackSubmitted(false); setFeedbackRating(null); setStarRating(5); setSelectedTags([]); }} className="text-[10px] text-green-700 font-medium underline mt-2 hover:text-green-900">
                            Submit another
                        </button>
                    </div>
                )}
            </div>
        </nav>

        <div className="p-4 border-t border-gray-100 shrink-0 bg-white">
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 text-slate-500 hover:text-danger w-full px-4 py-2 transition-colors rounded-lg hover:bg-red-50 group"
            >
              <LogOut size={20} className="group-hover:text-danger transition-colors" />
              <span className="font-medium">Sign Out</span>
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden h-screen min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 z-10 relative">
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
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