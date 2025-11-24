import React, { useState } from 'react';
import { RECENT_ALERTS } from '../constants';
import { Eye, Download, Search, Filter, X, ChevronDown } from 'lucide-react';
import { AlertLog } from '../types';

const AlertLogs: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<AlertLog | null>(null);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
                type="text" 
                placeholder="Search by Location..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
            />
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors">
                <Filter size={16} />
                Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark shadow-sm text-sm font-medium transition-colors">
                <Download size={16} />
                Export CSV
            </button>
        </div>
      </div>

      {/* Modern Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-500">Severity</th>
                <th className="px-6 py-4 font-semibold text-slate-500">Time</th>
                <th className="px-6 py-4 font-semibold text-slate-500">Location</th>
                <th className="px-6 py-4 font-semibold text-slate-500">AI Confidence</th>
                <th className="px-6 py-4 font-semibold text-slate-500">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RECENT_ALERTS.map((alert) => (
                <tr key={alert.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={() => setSelectedAlert(alert)}>
                  {/* Severity Column */}
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        alert.severity === 'High' ? 'bg-red-50 text-red-700 border-red-100' :
                        alert.severity === 'Medium' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                        {alert.severity}
                    </span>
                  </td>
                  
                  {/* Time Column */}
                  <td className="px-6 py-4 text-slate-700 font-medium">
                    {alert.timestamp}
                  </td>

                  {/* Location Column */}
                  <td className="px-6 py-4">
                    <span className="text-slate-900 font-medium">{alert.location}</span>
                  </td>

                  {/* AI Confidence Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <span className="text-slate-700 font-bold w-9 text-right">{alert.confidence}%</span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                    alert.confidence > 90 ? 'bg-green-500' :
                                    alert.confidence > 75 ? 'bg-orange-400' : 'bg-red-400'
                                }`} 
                                style={{ width: `${alert.confidence}%` }}
                            ></div>
                        </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 pl-2 pr-3 py-1 rounded-full text-xs font-bold ${
                        alert.status === 'Sent' ? 'bg-green-50 text-green-700' :
                        alert.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                        alert.status === 'Failed' ? 'bg-red-50 text-red-700' :
                        'bg-gray-50 text-gray-600'
                     }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                            alert.status === 'Sent' ? 'bg-green-600' :
                            alert.status === 'Pending' ? 'bg-yellow-500' :
                            alert.status === 'Failed' ? 'bg-red-600' : 'bg-gray-400'
                        }`}></span>
                        {alert.status === 'Sent' ? 'Dispatched' : alert.status}
                        <ChevronDown size={10} className="opacity-50 ml-1" />
                     </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedAlert(alert); }}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-gray-100"
                        title="View Details"
                    >
                        <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all" onClick={() => setSelectedAlert(null)}>
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl ring-1 ring-black/5" onClick={e => e.stopPropagation()}>
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Detection Evidence</h3>
                        <p className="text-sm text-slate-500 mt-0.5">Alert ID: <span className="font-mono text-slate-700">{selectedAlert.id}</span> • {selectedAlert.timestamp}</p>
                    </div>
                    <button onClick={() => setSelectedAlert(null)} className="p-2 hover:bg-gray-200/50 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>
                
                <div className="relative bg-slate-900 flex items-center justify-center group">
                     {selectedAlert.imageUrl ? (
                        <img src={selectedAlert.imageUrl} alt="Detection Proof" className="w-full h-auto max-h-[400px] object-contain" />
                     ) : (
                         <div className="h-64 w-full flex items-center justify-center text-slate-500 flex-col gap-3">
                             <div className="bg-slate-800 p-4 rounded-full">
                                <Eye size={32} />
                             </div>
                             <span className="font-medium">No image data available</span>
                         </div>
                     )}
                     
                     <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                         <div className="bg-black/60 backdrop-blur-md text-white px-4 py-3 rounded-xl border border-white/10">
                            <p className="font-bold text-sm flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${selectedAlert.severity === 'High' ? 'bg-red-500' : 'bg-orange-500'}`}></span>
                                {selectedAlert.type} Detected
                            </p>
                            <p className="text-xs text-slate-300 mt-1">Confidence Score: <span className="text-white font-mono">{selectedAlert.confidence}%</span></p>
                         </div>
                     </div>
                </div>

                <div className="p-5 bg-white flex justify-end gap-3 border-t border-gray-100">
                    <button onClick={() => setSelectedAlert(null)} className="px-4 py-2.5 border border-gray-200 rounded-lg text-slate-600 font-medium hover:bg-gray-50 hover:text-slate-900 transition-colors">
                        Mark as False Alarm
                    </button>
                    <button onClick={() => setSelectedAlert(null)} className="px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primaryDark shadow-sm shadow-primary/30 transition-colors">
                        Confirm & Archive
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AlertLogs;