
import React, { useState } from 'react';
import { performTriage } from '../services/geminiService';
import { SymptomReport, TriageResult } from '../types';

interface SymptomCheckerProps {
  onComplete: (result: TriageResult) => void;
  onCancel: () => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [report, setReport] = useState<SymptomReport>({
    symptoms: [],
    severity: 'low',
    duration: '1-3 days',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const symptomOptions = ['Fever', 'Cough', 'Chest Pain', 'Headache', 'Rash', 'Sore Throat', 'Nausea', 'Shortness of Breath'];

  const toggleSymptom = (s: string) => {
    setReport(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(s) 
        ? prev.symptoms.filter(item => item !== s)
        : [...prev.symptoms, s]
    }));
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await performTriage(report);
      onComplete(result);
    } catch (error) {
      console.error("Triage failed:", error);
      alert("Something went wrong analyzing your symptoms. Please try again or contact a professional.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl max-w-2xl mx-auto overflow-hidden">
      <div className="bg-blue-600 px-8 py-6 text-white">
        <h2 className="text-2xl font-bold">Smart Symptom Checker</h2>
        <p className="text-blue-100">Answer a few questions for an AI-guided evaluation.</p>
        <div className="flex gap-2 mt-6">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition ${i <= step ? 'bg-white' : 'bg-blue-400 opacity-30'}`}></div>
          ))}
        </div>
      </div>

      <div className="p-8 min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">What symptoms are you experiencing?</h3>
            <div className="grid grid-cols-2 gap-3">
              {symptomOptions.map(s => (
                <button
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className={`p-4 rounded-2xl border-2 text-left transition ${
                    report.symptoms.includes(s) 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' 
                      : 'border-gray-100 hover:border-blue-200 text-gray-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">How long has this been going on?</h3>
            <div className="space-y-3">
              {['Less than 24 hours', '1-3 days', '4-7 days', 'More than a week'].map(d => (
                <button
                  key={d}
                  onClick={() => setReport({ ...report, duration: d })}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition ${
                    report.duration === d 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' 
                      : 'border-gray-100 hover:border-blue-200 text-gray-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-8">Severity?</h3>
            <div className="flex gap-3">
              {(['low', 'medium', 'high'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setReport({ ...report, severity: s })}
                  className={`flex-1 p-4 rounded-2xl border-2 text-center capitalize transition ${
                    report.severity === s 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' 
                      : 'border-gray-100 hover:border-blue-200 text-gray-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Describe it in your own words</h3>
            <textarea
              className="w-full h-40 p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-400 focus:outline-none text-gray-600 transition"
              placeholder="Tell us more about how you feel. e.g. 'I have a sharp pain in my chest when I breathe deeply...'"
              value={report.description}
              onChange={(e) => setReport({ ...report, description: e.target.value })}
            ></textarea>
            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex gap-3">
              <i className="fas fa-info-circle text-yellow-600 mt-1"></i>
              <p className="text-sm text-yellow-800">This AI tool provides guidance, not a diagnosis. For medical emergencies, call emergency services immediately.</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 border-t border-gray-50 flex justify-between items-center bg-gray-50/50">
        <button 
          onClick={step === 1 ? onCancel : handleBack}
          className="px-6 py-3 font-semibold text-gray-500 hover:text-gray-800 transition"
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <button 
          onClick={step === 3 ? handleSubmit : handleNext}
          disabled={isLoading || (step === 1 && report.symptoms.length === 0)}
          className={`px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg transition flex items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {isLoading ? (
            <><i className="fas fa-spinner fa-spin"></i> Analyzing...</>
          ) : (
            <>{step === 3 ? 'Get Results' : 'Next Step'} <i className="fas fa-arrow-right text-xs"></i></>
          )}
        </button>
      </div>
    </div>
  );
};

export default SymptomChecker;
