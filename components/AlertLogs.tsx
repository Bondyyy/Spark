import React, { useState } from 'react';
import { RECENT_ALERTS } from '../constants';
import { Eye, Download, Search, Filter, X } from 'lucide-react';
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
                placeholder="Search by ID or Location..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
                <Filter size={18} />
                Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark shadow-sm">
                <Download size={18} />
                Export CSV
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">ID</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Timestamp</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Location</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Severity</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {RECENT_ALERTS.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500">{alert.id}</td>
                  <td className="px-6 py-4 text-gray-900">{alert.timestamp}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{alert.location}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                        {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border ${
                        alert.status === 'Sent' ? 'bg-green-50 text-green-700 border-green-200' :
                        alert.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-gray-50 text-gray-600 border-gray-200'
                     }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                            alert.status === 'Sent' ? 'bg-green-600' :
                            alert.status === 'Failed' ? 'bg-red-600' : 'bg-gray-400'
                        }`}></span>
                        {alert.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => setSelectedAlert(alert)}
                        className="text-primary hover:text-primaryDark font-medium text-sm flex items-center justify-end gap-1 ml-auto"
                    >
                        <Eye size={16} />
                        View Proof
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedAlert(null)}>
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Detection Evidence</h3>
                        <p className="text-sm text-gray-500">Alert ID: {selectedAlert.id} • {selectedAlert.timestamp}</p>
                    </div>
                    <button onClick={() => setSelectedAlert(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                
                <div className="relative aspect-video bg-black">
                     {selectedAlert.imageUrl ? (
                        <img src={selectedAlert.imageUrl} alt="Detection Proof" className="w-full h-full object-contain" />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-500 flex-col gap-2">
                             <Eye size={48} />
                             <span>No image data available</span>
                         </div>
                     )}
                     
                     <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur text-white px-3 py-2 rounded-lg text-sm">
                        <p className="font-bold">{selectedAlert.type} Detected</p>
                        <p className="text-xs opacity-80">Confidence: {selectedAlert.confidence}%</p>
                     </div>
                </div>

                <div className="p-6 bg-white flex justify-end gap-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Mark as False Alarm</button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryDark shadow-sm">Confirm & Archive</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AlertLogs;