
import React from 'react';
import { Server } from '../types';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface ServerSelectorProps {
  server: Server;
  onClick: () => void;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({ server, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between bg-slate-700/50 hover:bg-slate-700 transition-colors duration-200 rounded-lg p-3 text-left"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{server.flag}</span>
        <div>
          <p className="font-semibold text-slate-100">{server.country}</p>
          <p className="text-xs text-slate-400">{server.city}</p>
        </div>
      </div>
      <ChevronDownIcon className="w-5 h-5 text-slate-400" />
    </button>
  );
};

export default ServerSelector;
