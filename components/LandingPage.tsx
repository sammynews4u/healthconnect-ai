
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-heartbeat text-white"></i>
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">AFYACAL</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-500 hover:text-blue-600 font-medium transition">Features</a>
          <a href="#how-it-works" className="text-gray-500 hover:text-blue-600 font-medium transition">How it works</a>
          <a href="#professionals" className="text-gray-500 hover:text-blue-600 font-medium transition">For Professionals</a>
        </div>
        <button 
          onClick={onStart}
          className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-100"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest rounded-full mb-6">
            Healthcare reimagined
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Your Health, <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">On Demand</span>.
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-lg">
            Connect with certified nurses and doctors in seconds. Get smart triage advice, prescriptions, and follow-ups—all from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-200 text-lg flex items-center justify-center gap-3"
            >
              Get Started Now <i className="fas fa-arrow-right"></i>
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition text-lg">
              Watch Demo
            </button>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="user" />
              ))}
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Join <span className="text-gray-900 font-bold">10k+</span> patients receiving better care.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            className="relative rounded-[40px] shadow-2xl border-8 border-white object-cover aspect-square"
            alt="Doctor Consultation"
          />
          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 animate-bounce-slow">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
              <div>
                <p className="text-xs text-gray-400 font-bold">NURSE VERIFIED</p>
                <p className="font-bold text-gray-900">Dr. Sarah Smith</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic">"I've reviewed your symptoms, Alex. Let's start the call."</p>
          </div>
        </div>
      </section>

      {/* Stats/Logos */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-8 opacity-50 grayscale">
          <span className="text-2xl font-bold text-slate-400">MayoClinic</span>
          <span className="text-2xl font-bold text-slate-400">HealthLine</span>
          <span className="text-2xl font-bold text-slate-400">Medscape</span>
          <span className="text-2xl font-bold text-slate-400">WebMD</span>
          <span className="text-2xl font-bold text-slate-400">Aetna</span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Built for Modern Healthcare</h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Avoid long wait times at the ER. Our AI-driven triage and human-centric care provide immediate clarity on your symptoms.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">
              <i className="fas fa-stethoscope"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Triage</h3>
            <p className="text-gray-500 leading-relaxed">
              Describe your symptoms and our Gemini AI analyzes the severity to recommend the best next step.
            </p>
          </div>
          <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition group">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">
              <i className="fas fa-video"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Video Calls</h3>
            <p className="text-gray-500 leading-relaxed">
              Connect via HD video or chat with nurses and doctors for immediate visual diagnostics and care.
            </p>
          </div>
          <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition group">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">
              <i className="fas fa-prescription-bottle-alt"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Digital Records</h3>
            <p className="text-gray-500 leading-relaxed">
              All summaries, notes, and recommendations are stored securely for you to access anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-heartbeat text-white"></i>
              </div>
              <span className="font-bold text-xl tracking-tight">AFYACAL</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8">
              Transforming the way patients interact with healthcare professionals through secure, AI-powered technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition">How it Works</a></li>
              <li><a href="#" className="hover:text-white transition">Triage AI</a></li>
              <li><a href="#" className="hover:text-white transition">For Doctors</a></li>
              <li><a href="#" className="hover:text-white transition">For Nurses</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          © 2025 AFYACAL. All rights reserved. Professional verification required for providers.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
