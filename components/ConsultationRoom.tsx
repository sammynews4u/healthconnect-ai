
import React, { useState, useEffect, useRef } from 'react';
import { generateSummary } from '../services/geminiService';
import { Message, UserRole, ConsultationType } from '../types';

interface ConsultationRoomProps {
  type: 'NURSE' | 'DOCTOR';
  initialModality?: ConsultationType;
  onEnd: () => void;
}

const ConsultationRoom: React.FC<ConsultationRoomProps> = ({ type, initialModality = ConsultationType.CHAT, onEnd }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'prof-1',
      role: type === 'NURSE' ? UserRole.NURSE : UserRole.DOCTOR,
      text: `Hello! I'm ${type === 'NURSE' ? 'Nurse Sarah' : 'Dr. Smith'}. I've reviewed your symptoms. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isCalling, setIsCalling] = useState(initialModality === ConsultationType.VIDEO);
  const [callStatus, setCallStatus] = useState<'connecting' | 'active' | 'idle'>(initialModality === ConsultationType.VIDEO ? 'connecting' : 'idle');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (callStatus === 'connecting') {
      const timer = setTimeout(() => setCallStatus('active'), 2000);
      return () => clearTimeout(timer);
    }
  }, [callStatus]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'patient-1',
      role: UserRole.PATIENT,
      text: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate professional response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'prof-1',
        role: type === 'NURSE' ? UserRole.NURSE : UserRole.DOCTOR,
        text: "I understand. Let's look into that. Are you experiencing any other discomfort or pain in the affected area?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const toggleCall = () => {
    if (isCalling) {
      setIsCalling(false);
      setCallStatus('idle');
    } else {
      setIsCalling(true);
      setCallStatus('connecting');
    }
  };

  const handleEndConsultation = async () => {
    setIsSummarizing(true);
    try {
      const history = messages.map(m => `${m.role}: ${m.text}`).join('\n');
      const summary = await generateSummary(history);
      alert(`Consultation ended. Summary:\n\n${summary}`);
      onEnd();
    } catch (error) {
      onEnd();
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-green-400 p-0.5">
            <img src={`https://picsum.photos/seed/${type}/100`} alt="Pro" className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{type === 'NURSE' ? 'Nurse Sarah' : 'Dr. James Smith'}</h3>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              {isCalling ? 'Encrypted Video Session' : 'Online & Ready'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleCall}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition ${isCalling ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
            title={isCalling ? "End Video Call" : "Start Video Call"}
          >
            <i className={`fas ${isCalling ? 'fa-video-slash' : 'fa-video'}`}></i>
          </button>
          <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center">
            <i className="fas fa-phone"></i>
          </button>
          <button 
            onClick={handleEndConsultation}
            className="ml-2 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition"
          >
            End Session
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Chat Area */}
        <div className={`flex-1 flex flex-col min-h-0 bg-gray-50/50 transition-all duration-500 ${isCalling ? 'hidden md:flex md:w-1/3 border-r border-gray-100' : 'w-full'}`}>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex justify-center">
              <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                Secure Triage Channel
              </span>
            </div>
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === UserRole.PATIENT ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                  m.role === UserRole.PATIENT 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.role === UserRole.PATIENT ? 'text-blue-100' : 'text-gray-400'}`}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl p-2 pr-4 border border-gray-200">
              <button className="w-10 h-10 rounded-xl hover:bg-gray-200 text-gray-500 transition">
                <i className="fas fa-paperclip"></i>
              </button>
              <input 
                type="text" 
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-700"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button 
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${inputValue.trim() ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-300'}`}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Video Area */}
        {isCalling && (
          <div className="flex-1 bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center">
            {callStatus === 'connecting' ? (
              <div className="text-center text-white z-10">
                <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h4 className="text-xl font-bold">Establishing Secure Connection...</h4>
                <p className="text-slate-400 mt-2">Connecting with {type === 'NURSE' ? 'Nurse Sarah' : 'Dr. Smith'}</p>
              </div>
            ) : (
              <>
                {/* Remote Professional Video Feed Placeholder */}
                <div className="w-full h-full relative group bg-slate-800 flex items-center justify-center">
                  <img 
                    src={`https://picsum.photos/seed/${type}video/1280/720`} 
                    alt="Professional Feed" 
                    className="w-full h-full object-cover" 
                  />
                  
                  {/* Watermark/Label for Distinction */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white border border-white/10 uppercase tracking-widest">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      PROFESSIONAL FEED - LIVE
                    </div>
                    <div className="bg-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 border border-white/20 w-fit">
                      <i className="fas fa-shield-alt text-[8px]"></i> End-to-End Encrypted
                    </div>
                  </div>

                  {/* Name Tag */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/50 backdrop-blur-lg p-3 rounded-2xl border border-white/10">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-400">
                      <img src={`https://picsum.photos/seed/${type}/50`} alt="Pro small" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight">{type === 'NURSE' ? 'Nurse Sarah Anderson' : 'Dr. James Smith'}</h4>
                      <p className="text-blue-300 text-[10px] font-medium">{type === 'NURSE' ? 'Triage Specialist' : 'Lead Physician'}</p>
                    </div>
                  </div>
                  
                  {/* Overlay Controls */}
                  <div className="absolute bottom-8 right-1/2 translate-x-1/2 md:right-8 md:translate-x-0 flex items-center gap-3 bg-black/30 backdrop-blur-xl p-3 rounded-3xl border border-white/20 transition-all opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition ${isMuted ? 'bg-red-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                    </button>
                    <button 
                      onClick={() => setIsCameraOff(!isCameraOff)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition ${isCameraOff ? 'bg-red-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      title={isCameraOff ? "Start Camera" : "Stop Camera"}
                    >
                      <i className={`fas ${isCameraOff ? 'fa-video-slash' : 'fa-video'}`}></i>
                    </button>
                    <button className="w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition">
                      <i className="fas fa-expand"></i>
                    </button>
                    <div className="w-[1px] h-6 bg-white/20 mx-1"></div>
                    <button 
                      onClick={toggleCall}
                      className="w-11 h-11 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center transition shadow-lg shadow-red-900/20"
                    >
                      <i className="fas fa-phone-slash"></i>
                    </button>
                  </div>
                </div>

                {/* Patient Self View Feed Placeholder */}
                <div className="absolute top-6 right-6 w-36 md:w-56 aspect-[3/4] rounded-2xl bg-slate-800 border-2 border-white/30 shadow-2xl overflow-hidden group/self ring-4 ring-black/20">
                  {isCameraOff ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 gap-3">
                      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-3xl"></i>
                      </div>
                      <span className="text-[10px] font-bold tracking-widest">CAMERA OFF</span>
                    </div>
                  ) : (
                    <>
                      <img src={`https://picsum.photos/seed/patient/400/600`} alt="Self" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md text-[8px] font-bold text-white border border-white/10 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        YOUR CAMERA
                      </div>
                    </>
                  )}
                  <div className="absolute bottom-3 left-3 text-[10px] text-white bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm font-medium border border-white/5">
                    Alex (Patient)
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      {isSummarizing && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-xs">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Medical Scribe Active</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Gemini AI is generating your consultation summary and medical next steps...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationRoom;
