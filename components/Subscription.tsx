import React from 'react';
import { CheckCircle, Globe, Users, Database } from 'lucide-react';

const Subscription: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Subscription & Billing</h2>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Current Plan</span>
                <h3 className="text-2xl font-bold text-slate-800">Basic Plan</h3>
            </div>
            <p className="text-slate-500 text-sm mb-4">Valid until Dec 31, 2024 • Auto-renewal on</p>
            
            <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-700">Camera Usage</span>
                    <span className="text-slate-500">4 / 50 Cameras</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '8%' }}></div>
                </div>
            </div>
        </div>
        <div className="flex gap-3">
             <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-slate-700 font-medium hover:bg-gray-50 transition-colors">
                Manage Billing
             </button>
             <button className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primaryDark transition-colors shadow-sm shadow-primary/30">
                Contact Support
             </button>
        </div>
      </div>

      {/* Plans Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Plan Card */}
        <div className="bg-white rounded-xl shadow-md border-2 border-primary ring-4 ring-primary/5 p-6 relative">
             <div className="absolute top-4 right-4 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">ACTIVE</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Basic Plan</h3>
            <p className="text-slate-500 text-sm mb-6">SMEs, Single Factories, Residential Areas</p>
            
            <div className="mb-6">
                <span className="text-2xl font-bold text-slate-900">Affordable</span>
                <p className="text-xs text-slate-400">Easy to Deploy</p>
            </div>

            <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span><strong>&lt; 50 Cameras</strong></span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>Fire/Smoke & Illegal Waste Burning Detection</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>Real-time Telegram Alerts</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>Event Logging & Standard Video Proof Storage</span>
                </li>
            </ul>

            <button className="w-full py-2.5 bg-primary/10 text-primary font-bold rounded-lg cursor-not-allowed">
                Current Plan
            </button>
        </div>

        {/* Pro Plan Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Pro Plan</h3>
            <p className="text-slate-500 text-sm mb-6">Industrial Zones, Smart Cities, Major Infrastructure</p>
            
            <div className="mb-6">
                <span className="text-2xl font-bold text-slate-900">Enterprise Pricing</span>
                <p className="text-xs text-slate-400">For Large Scale & Distributed Architecture</p>
            </div>

            <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span><strong>Unlimited Cameras</strong> (Supports Distributed Systems)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>Deep Analytics & Reports (By Area, Time, Risk Level)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>Custom Dashboard & Multi-channel Alerts</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>API Integration (GIS, Urban Management)</span>
                </li>
                 <li className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span>User Role Management (Decentralized)</span>
                </li>
            </ul>

            <button className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
                Contact Sales to Upgrade
            </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;