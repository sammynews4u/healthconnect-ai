
import React from 'react';
import { UserRole } from '../types';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ currentRole, onRoleChange }) => {
  return (
    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
      <button 
        onClick={() => onRoleChange(UserRole.PATIENT)}
        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${currentRole === UserRole.PATIENT ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-gray-500 hover:text-gray-800'}`}
      >
        Patient
      </button>
      <button 
        onClick={() => onRoleChange(UserRole.NURSE)}
        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${currentRole === UserRole.NURSE ? 'bg-green-600 text-white shadow-md shadow-green-200' : 'text-gray-500 hover:text-gray-800'}`}
      >
        Nurse
      </button>
      <button 
        onClick={() => onRoleChange(UserRole.DOCTOR)}
        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${currentRole === UserRole.DOCTOR ? 'bg-purple-600 text-white shadow-md shadow-purple-200' : 'text-gray-500 hover:text-gray-800'}`}
      >
        Doctor
      </button>
    </div>
  );
};

export default RoleSwitcher;
