
import React, { useState } from 'react';
import SymptomChecker from './SymptomChecker';
import ConsultationRoom from './ConsultationRoom';
import { TriageResult, ConsultationType } from '../types';

const PatientDashboard: React.FC = () => {
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [activeConsultation, setActiveConsultation] = useState<{ type: 'NURSE' | 'DOCTOR', modality: ConsultationType } | null>(null);
  const [lastTriage, setLastTriage] = useState<TriageResult | null>(null);

  const startTriage = () => setShowSymptomChecker(true);
  
  const handleTriageComplete = (result: TriageResult) => {
    setLastTriage(result);
    setShowSymptomChecker(false);
  };

  if (showSymptomChecker) {
    return <SymptomChecker onComplete={handleTriageComplete} onCancel={() => setShowSymptomChecker(false)} />;
  }

  if (activeConsultation) {
    return (
      <ConsultationRoom 
        type={activeConsultation.type} 
        initialModality={activeConsultation.modality}
        onEnd={() => setActiveConsultation(null)} 
      />
    );
  }

  return (
    <div className="space-y-8 pb-16 md:pb-0">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Hello, Alex! 👋</h2>
          <p className="text-blue-100 text-lg mb-8">How are you feeling today? Describe your symptoms to get a quick evaluation and connect with a medical professional.</p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={startTriage}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition shadow-lg flex items-center gap-3 text-lg"
            >
              <i className="fas fa-stethoscope"></i> Check Symptoms
            </button>
            <button 
              onClick={() => setActiveConsultation({ type: 'NURSE', modality: ConsultationType.VIDEO })}
              className="px-8 py-4 bg-blue-500/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition shadow-lg flex items-center gap-3 text-lg"
            >
              <i className="fas fa-video"></i> Instant Video Triage
            </button>
          </div>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
          <i className="fas fa-user-md text-[240px]"></i>
        </div>
      </div>

      {/* Emergency Card */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start gap-4">
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
        </div>
        <div>
          <h3 className="font-bold text-red-800 text-lg">Is this an emergency?</h3>
          <p className="text-red-600 mb-4">If you are experiencing severe chest pain, shortness of breath, or uncontrolled bleeding, please call emergency services immediately.</p>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition shadow-md shadow-red-200">Call Emergency (911)</button>
            <button className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg font-semibold hover:bg-red-50 transition">Local ER Locations</button>
          </div>
        </div>
      </div>

      {lastTriage && (
        <div className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800">Your Last Evaluation</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              lastTriage.severity === 'emergency' ? 'bg-red-100 text-red-600' :
              lastTriage.severity === 'high' ? 'bg-orange-100 text-orange-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {lastTriage.severity} Priority
            </span>
          </div>
          <p className="text-gray-600 mb-6 italic">"{lastTriage.reasoning}"</p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setActiveConsultation({ 
                type: lastTriage.suggestedProfessional === 'ER' ? 'DOCTOR' : (lastTriage.suggestedProfessional as 'NURSE' | 'DOCTOR'),
                modality: ConsultationType.CHAT
              })}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition"
            >
              Chat with {lastTriage.suggestedProfessional}
            </button>
            <button 
              onClick={() => setActiveConsultation({ 
                type: lastTriage.suggestedProfessional === 'ER' ? 'DOCTOR' : (lastTriage.suggestedProfessional as 'NURSE' | 'DOCTOR'),
                modality: ConsultationType.VIDEO
              })}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition"
            >
              Video Call {lastTriage.suggestedProfessional}
            </button>
            <button 
              onClick={() => setLastTriage(null)}
              className="px-6 py-3 border border-gray-200 text-gray-500 rounded-xl font-medium hover:bg-gray-50 transition"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <i className="fas fa-user-nurse text-green-600 text-xl"></i>
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Talk to a Nurse</h3>
          <p className="text-gray-500 text-sm mb-4">Ideal for minor symptoms and advice. Quickest access to care.</p>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setActiveConsultation({ type: 'NURSE', modality: ConsultationType.CHAT })}
              className="py-3 text-green-600 font-bold border border-green-200 rounded-xl hover:bg-green-50 transition text-sm"
            >
              Chat
            </button>
            <button 
              onClick={() => setActiveConsultation({ type: 'NURSE', modality: ConsultationType.VIDEO })}
              className="py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition text-sm flex items-center justify-center gap-2"
            >
              <i className="fas fa-video"></i> Video
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <i className="fas fa-user-md text-purple-600 text-xl"></i>
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Talk to a Doctor</h3>
          <p className="text-gray-500 text-sm mb-4">Diagnosis, prescriptions, and specialist recommendations.</p>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setActiveConsultation({ type: 'DOCTOR', modality: ConsultationType.CHAT })}
              className="py-3 text-purple-600 font-bold border border-purple-200 rounded-xl hover:bg-purple-50 transition text-sm"
            >
              Chat
            </button>
            <button 
              onClick={() => setActiveConsultation({ type: 'DOCTOR', modality: ConsultationType.VIDEO })}
              className="py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition text-sm flex items-center justify-center gap-2"
            >
              <i className="fas fa-video"></i> Video
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <i className="fas fa-file-medical-alt text-blue-600 text-xl"></i>
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Recent Records</h3>
          <p className="text-gray-500 text-sm mb-4">Access your consultation summaries, prescriptions, and results.</p>
          <button className="w-full py-3 text-blue-600 font-bold border border-blue-200 rounded-xl hover:bg-blue-50 transition">
            View History
          </button>
        </div>
      </div>
      
      {/* Health Tips */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Health Tips</h3>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {[1, 2, 3].map(i => (
            <div key={i} className="min-w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img src={`https://picsum.photos/seed/health${i}/400/200`} alt="Health tip" className="w-full h-32 object-cover" />
              <div className="p-4">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Nutrition</span>
                <h4 className="font-bold text-gray-800 mt-1">Superfoods to boost your immune system</h4>
                <p className="text-xs text-gray-500 mt-2">Discover how berries and greens can help you fight seasonal colds...</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;
