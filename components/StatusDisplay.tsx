
import React from 'react';
import { ConnectionStatus } from '../types';

interface StatusDisplayProps {
  status: ConnectionStatus;
  ipAddress: string;
  duration: string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, ipAddress, duration }) => {
  const isConnecting = status === ConnectionStatus.CONNECTING || status === ConnectionStatus.DISCONNECTING;
  const isConnected = status === ConnectionStatus.CONNECTED;

  const statusColor =
    status === ConnectionStatus.CONNECTED ? 'text-emerald-400' :
    isConnecting ? 'text-yellow-400' :
    'text-slate-400';

  return (
    <div className="text-center space-y-1">
      <p className={`text-lg font-semibold transition-colors duration-300 ${statusColor}`}>
        {status}
      </p>
      <p className="text-sm text-slate-300 font-mono">{ipAddress}</p>
      {isConnected && <p className="text-xs text-slate-400 font-mono">{duration}</p>}
    </div>
  );
};

export default StatusDisplay;
