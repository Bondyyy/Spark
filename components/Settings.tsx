import React from 'react';
import { User, Bell, Camera, Save, Trash2, Edit2 } from 'lucide-react';
import { CAMERAS } from '../constants';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      
      {/* Profile Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
                <User className="text-blue-600 w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-800">User Profile</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" defaultValue="Admin User" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" defaultValue="admin@sentinel-ai.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
            </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors shadow-sm text-sm font-medium">
                <Save size={16} />
                Save Changes
            </button>
        </div>
      </section>

      {/* System Configuration */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="bg-orange-50 p-2 rounded-lg">
                <Bell className="text-orange-600 w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-800">Notification Settings</h3>
        </div>
        <div className="p-6 space-y-4">
            <p className="text-sm text-gray-500 mb-4">Configure your Telegram bot to receive real-time alerts.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Telegram Bot Token</label>
                    <input type="password" placeholder="123456789:ABCdef..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-mono text-sm" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Chat ID / Channel ID</label>
                    <input type="text" placeholder="@my_channel_id" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none font-mono text-sm" />
                </div>
            </div>
        </div>
      </section>

      {/* Camera Management */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-lg">
                    <Camera className="text-green-600 w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">Camera Setup</h3>
                    <p className="text-xs text-slate-500">Cameras: <span className="font-semibold text-slate-700">4 / 50</span> (Basic Plan Limit)</p>
                </div>
            </div>
            <button className="text-sm text-primary font-medium hover:underline">+ Add Camera</button>
        </div>
        <div className="divide-y divide-gray-100">
            {CAMERAS.map((cam) => (
                <div key={cam.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                        <img src={cam.thumbnailUrl} alt="" className="w-16 h-10 object-cover rounded bg-gray-200" />
                        <div>
                            <p className="font-medium text-gray-900">{cam.name}</p>
                            <p className="text-xs text-gray-500 font-mono">rtsp://192.168.1.10{cam.id.slice(-1)}/stream</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </section>

    </div>
  );
};

export default Settings;