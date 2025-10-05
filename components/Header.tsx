
import React from 'react';
import { SettingsIcon } from './icons/SettingsIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />
        <h1 className="text-xl font-bold text-slate-100">Secure VPN</h1>
      </div>
      <button
        onClick={onSettingsClick}
        className="text-slate-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-slate-700"
        aria-label="Settings"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;
