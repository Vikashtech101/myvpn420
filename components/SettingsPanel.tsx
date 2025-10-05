
import React from 'react';
import { Settings, Protocol } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (newSettings: Partial<Settings>) => void;
  onClose: () => void;
}

const Toggle: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void }> = ({ label, enabled, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-300">{label}</span>
      <button onClick={() => onChange(!enabled)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 ${enabled ? 'bg-emerald-500' : 'bg-slate-600'}`}>
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
};


const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-slate-100">Settings</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white">
            <CloseIcon className="w-5 h-5" />
          </button>
        </header>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400">General</h3>
            <Toggle label="Auto-connect on startup" enabled={settings.autoConnect} onChange={(val) => onSettingsChange({ autoConnect: val })} />
            <Toggle label="Kill Switch" enabled={settings.killSwitch} onChange={(val) => onSettingsChange({ killSwitch: val })} />
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-400">Protocol</h3>
            <div className="flex bg-slate-700 rounded-lg p-1">
              {(['OpenVPN', 'WireGuard'] as Protocol[]).map((protocol) => (
                <button
                  key={protocol}
                  onClick={() => onSettingsChange({ protocol })}
                  className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                    settings.protocol === protocol ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {protocol}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
