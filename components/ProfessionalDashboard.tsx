
import React, { useState } from 'react';
import { UserRole, ConsultationType } from '../types';
import ConsultationRoom from './ConsultationRoom';

interface ProfessionalDashboardProps {
  role: UserRole;
}

const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({ role }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeSession, setActiveSession] = useState<{ id: string, name: string, modality: ConsultationType } | null>(null);
  
  const mockQueue = [
    { id: '1', name: 'John Doe', age: 45, symptoms: 'Chest tightness, cough', priority: 'high', time: '5m ago', type: ConsultationType.VIDEO },
    { id: '2', name: 'Sarah Wilson', age: 29, symptoms: 'Severe rash on arm', priority: 'medium', time: '12m ago', type: ConsultationType.CHAT },
    { id: '3', name: 'Mike Johnson', age: 34, symptoms: 'Fever (101.5F), sore throat', priority: 'medium', time: '18m ago', type: ConsultationType.VIDEO },
    { id: '4', name: 'Emily Brown', age: 22, symptoms: 'Minor ear ache', priority: 'low', time: '25m ago', type: ConsultationType.CHAT },
  ];

  if (activeSession) {
    return (
      <ConsultationRoom 
        type={role === UserRole.NURSE ? 'NURSE' : 'DOCTOR'} 
        initialModality={activeSession.modality}
        onEnd={() => setActiveSession(null)}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
      {/* Left Column: Stats & Profile */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img 
              src={`https://picsum.photos/seed/${role}/200`} 
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl" 
              alt="Professional Profile"
            />
            <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{role === UserRole.NURSE ? 'Nurse Sarah Anderson' : 'Dr. James Smith'}</h2>
          <p className="text-gray-500 text-sm mb-6">{role === UserRole.NURSE ? 'Registered Nurse (RN) - Triage Specialist' : 'Chief Medical Officer - Pediatrics'}</p>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-6">
            <span className="text-sm font-medium text-gray-600">Availability Status</span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isOnline ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <p className="text-[10px] text-blue-600 font-bold uppercase">Sessions Today</p>
              <p className="text-2xl font-bold text-blue-700">12</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <p className="text-[10px] text-purple-600 font-bold uppercase">Avg. Rating</p>
              <p className="text-2xl font-bold text-purple-700">4.9</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-tools text-gray-400"></i> Quick Tools
          </h3>
          <div className="space-y-2">
            <button className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left text-sm font-medium text-gray-700 flex items-center justify-between">
              <span>Medical Guidelines</span>
              <i className="fas fa-chevron-right text-[10px]"></i>
            </button>
            <button className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left text-sm font-medium text-gray-700 flex items-center justify-between">
              <span>Drug Reference Database</span>
              <i className="fas fa-chevron-right text-[10px]"></i>
            </button>
            <button className="w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left text-sm font-medium text-gray-700 flex items-center justify-between">
              <span>Escalate to Specialist</span>
              <i className="fas fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Patient Queue */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Incoming Consultation Queue</h3>
              <p className="text-sm text-gray-500">4 patients waiting for triage evaluation</p>
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition">
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          
          <div className="divide-y divide-gray-50">
            {mockQueue.map(p => (
              <div key={p.id} className="p-6 hover:bg-gray-50 transition flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-800">{p.name}</h4>
                      <span className="text-xs text-gray-400">Age: {p.age}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        p.priority === 'high' ? 'bg-red-100 text-red-600' :
                        p.priority === 'medium' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {p.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{p.symptoms}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-[10px] text-gray-400 flex items-center gap-1">
                        <i className="far fa-clock"></i> {p.time}
                      </p>
                      <p className={`text-[10px] font-bold flex items-center gap-1 ${p.type === ConsultationType.VIDEO ? 'text-blue-600' : 'text-gray-400'}`}>
                        <i className={p.type === ConsultationType.VIDEO ? 'fas fa-video' : 'fas fa-comment'}></i> 
                        {p.type === ConsultationType.VIDEO ? 'Video Request' : 'Chat Request'}
                      </p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveSession({ id: p.id, name: p.name, modality: p.type })}
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-md shadow-blue-100 hover:bg-blue-700 transition transform group-hover:scale-105"
                >
                  Accept Session
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Mini View */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Patient Satisfaction (Last 30 Days)</h3>
          <div className="flex items-end gap-2 h-32">
            {[40, 65, 45, 90, 75, 55, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-1000 ${i === 3 ? 'bg-blue-600' : 'bg-blue-200'}`} 
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-[10px] text-gray-400">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
