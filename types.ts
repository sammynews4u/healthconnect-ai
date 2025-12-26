
export enum UserRole {
  PATIENT = 'PATIENT',
  NURSE = 'NURSE',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export enum ConsultationType {
  CHAT = 'CHAT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO'
}

export interface SymptomReport {
  symptoms: string[];
  severity: 'low' | 'medium' | 'high' | 'emergency';
  duration: string;
  description: string;
}

export interface ConsultationSession {
  id: string;
  patientId: string;
  professionalId: string;
  startTime: Date;
  type: ConsultationType;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  notes?: string;
  recommendation?: string;
}

export interface Message {
  id: string;
  senderId: string;
  role: UserRole;
  text: string;
  timestamp: Date;
}

export interface TriageResult {
  severity: 'low' | 'medium' | 'high' | 'emergency';
  recommendation: string;
  suggestedProfessional: UserRole.NURSE | UserRole.DOCTOR | 'ER';
  reasoning: string;
}
