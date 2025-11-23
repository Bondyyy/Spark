import React from 'react';
import { CAMERAS } from '../constants';
import { Maximize2, MoreVertical, Signal, AlertOctagon } from 'lucide-react';

const LiveMonitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Active Camera Matrix</h2>
        <div className="flex gap-2">
            <span className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                AI Processing Active
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CAMERAS.map((camera) => (
          <div key={camera.id} className="group relative aspect-video bg-black rounded-xl overflow-hidden shadow-md ring-1 ring-gray-900/5">
            {/* Image Feed */}
            <img 
              src={camera.thumbnailUrl} 
              alt={camera.name} 
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay Header */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/70 to-transparent">
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-white ${
                    camera.status === 'alert' ? 'bg-red-600 animate-pulse' : 'bg-green-600'
                }`}>
                    {camera.status === 'alert' ? 'DETECTING' : 'LIVE'}
                </div>
                <span className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                    {camera.id}
                </span>
              </div>
              <button className="text-white/80 hover:text-white bg-black/30 p-1.5 rounded-full hover:bg-black/50 backdrop-blur-sm transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>

            {/* AI Bounding Box (Only on Alert) */}
            {camera.status === 'alert' && (
              <div className="absolute top-[30%] left-[40%] w-[25%] h-[35%] border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse rounded-sm">
                 <div className="absolute -top-7 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm flex items-center gap-1">
                    <AlertOctagon size={12} />
                    SMOKE: 98.4%
                 </div>
              </div>
            )}

            {/* Overlay Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
               <div>
                  <h4 className="text-white font-medium text-sm text-shadow">{camera.name}</h4>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    <Signal size={12} />
                    {camera.location}
                  </p>
               </div>
               <button className="text-white/80 hover:text-white bg-white/10 p-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all">
                  <Maximize2 size={18} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMonitoring;