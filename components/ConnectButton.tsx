
import React from 'react';
import { PowerIcon } from './icons/PowerIcon';
import { ConnectionStatus } from '../types';

interface ConnectButtonProps {
  status: ConnectionStatus;
  onClick: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ status, onClick }) => {
  const isConnecting = status === ConnectionStatus.CONNECTING || status === ConnectionStatus.DISCONNECTING;
  const isConnected = status === ConnectionStatus.CONNECTED;

  const baseClasses = "relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4";
  
  const stateClasses = isConnected
    ? "bg-slate-700 text-emerald-400 shadow-emerald-500/20 hover:shadow-emerald-500/40 focus:ring-emerald-500/50"
    : "bg-slate-700 text-slate-400 hover:text-white hover:shadow-slate-500/40 focus:ring-slate-500/50";
  
  const connectingClasses = isConnecting ? "animate-pulse" : "";
  
  return (
    <div className="flex justify-center my-8">
      <button onClick={onClick} className={`${baseClasses} ${stateClasses} ${connectingClasses}`}>
        <div className="absolute inset-0 rounded-full border-4 border-slate-600"></div>
        <div className={`absolute inset-2 rounded-full ${isConnected ? 'bg-gradient-to-br from-emerald-500/20 to-slate-900' : 'bg-slate-900'}`}></div>
        <PowerIcon className="w-16 h-16 z-10" />
      </button>
    </div>
  );
};

export default ConnectButton;
