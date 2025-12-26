
import React, { useState } from 'react';
import { UserRole } from './types';
import Layout from './components/Layout';
import PatientDashboard from './components/PatientDashboard';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import RoleSwitcher from './components/RoleSwitcher';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.PATIENT);

  const handleStart = () => setView('login');
  const handleLogin = () => setView('dashboard');
  const handleBackToLanding = () => setView('landing');

  if (view === 'landing') {
    return <LandingPage onStart={handleStart} />;
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <button 
          onClick={handleBackToLanding}
          className="absolute top-8 left-8 text-gray-400 hover:text-blue-600 font-medium flex items-center gap-2 transition"
        >
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>

        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
            <i className="fas fa-heartbeat text-white text-4xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AFYACAL</h1>
          <p className="text-gray-500 mb-8">Join thousands of patients receiving world-class digital care.</p>
          
          <div className="space-y-4">
            <button 
              onClick={handleLogin}
              className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
            >
              <i className="fas fa-envelope"></i> Continue with Email
            </button>
            <div className="flex gap-4">
              <button onClick={handleLogin} className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <i className="fab fa-google text-red-500"></i> Google
              </button>
              <button onClick={handleLogin} className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <i className="fab fa-apple text-gray-900"></i> Apple
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-gray-400">
            By continuing, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout currentRole={currentRole} onRoleChange={setCurrentRole}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {currentRole === UserRole.PATIENT ? "Patient Portal" : `${currentRole.charAt(0) + currentRole.slice(1).toLowerCase()} Dashboard`}
          </h1>
          <RoleSwitcher currentRole={currentRole} onRoleChange={setCurrentRole} />
        </div>

        {currentRole === UserRole.PATIENT ? (
          <PatientDashboard />
        ) : (
          <ProfessionalDashboard role={currentRole} />
        )}
      </div>
    </Layout>
  );
};

export default App;
