
import React from 'react';
import { Server } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface ServerListProps {
  servers: Server[];
  selectedServerId: string;
  onSelect: (server: Server) => void;
  onClose: () => void;
}

const ServerList: React.FC<ServerListProps> = ({ servers, selectedServerId, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-slate-100">Select Server</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white">
            <CloseIcon className="w-5 h-5" />
          </button>
        </header>
        <ul className="p-2 space-y-1 overflow-y-auto max-h-[60vh] custom-scrollbar">
          {servers.map((server) => (
            <li key={server.id}>
              <button
                onClick={() => onSelect(server)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                  server.id === selectedServerId
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'hover:bg-slate-700/50'
                }`}
              >
                <span className="text-2xl">{server.flag}</span>
                <div>
                  <p className="font-semibold text-slate-100">{server.country}</p>
                  <p className="text-xs text-slate-400">{server.city}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServerList;
