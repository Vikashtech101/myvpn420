
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Server, Settings, Protocol, ConnectionStatus } from './types';
import { SERVERS } from './constants';
import Header from './components/Header';
import StatusDisplay from './components/StatusDisplay';
import ConnectButton from './components/ConnectButton';
import DataUsage from './components/DataUsage';
import ServerSelector from './components/ServerSelector';
import ServerList from './components/ServerList';
import SettingsPanel from './components/SettingsPanel';

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [currentIp, setCurrentIp] = useState<string>('192.168.1.1'); // Default public IP
  const [selectedServer, setSelectedServer] = useState<Server>(SERVERS[0]);
  const [dataUsage, setDataUsage] = useState<{ upload: number; download: number }>({ upload: 0, download: 0 });
  const [connectionDuration, setConnectionDuration] = useState<number>(0);
  const [isServerListOpen, setIsServerListOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>({
    autoConnect: false,
    killSwitch: true,
    protocol: 'WireGuard',
  });

  const timerRef = useRef<number | null>(null);

  const startTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setConnectionDuration(prev => prev + 1);
      setDataUsage(prev => ({
        upload: prev.upload + Math.random() * 10000,
        download: prev.download + Math.random() * 50000,
      }));
    }, 1000);
  }, []);

  const stopTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetStats = useCallback(() => {
      setConnectionDuration(0);
      setDataUsage({ upload: 0, download: 0 });
  }, []);


  const handleConnectToggle = useCallback(() => {
    if (isConnected) {
      setConnectionStatus(ConnectionStatus.DISCONNECTING);
      setTimeout(() => {
        setIsConnected(false);
        setConnectionStatus(ConnectionStatus.DISCONNECTED);
        setCurrentIp('192.168.1.1');
        stopTimers();
      }, 1500);
    } else {
      setConnectionStatus(ConnectionStatus.CONNECTING);
      resetStats();
      setTimeout(() => {
        setIsConnected(true);
        setConnectionStatus(ConnectionStatus.CONNECTED);
        setCurrentIp(selectedServer.ip);
        startTimers();
      }, 1500);
    }
  }, [isConnected, selectedServer.ip, startTimers, stopTimers, resetStats]);

  const handleServerSelect = useCallback((server: Server) => {
    setSelectedServer(server);
    setIsServerListOpen(false);
    if (isConnected) {
      handleConnectToggle(); // Disconnect
      setTimeout(() => handleConnectToggle(), 1600); // Reconnect to new server
    }
  }, [isConnected, handleConnectToggle]);
  
  const handleSettingsChange = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  useEffect(() => {
    return () => stopTimers(); // Cleanup on unmount
  }, [stopTimers]);

  return (
    <div className="min-h-screen flex items-center justify-center font-sans text-white p-4 bg-gradient-to-br from-slate-900 to-black">
      <main className="w-full max-w-xs mx-auto bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl shadow-emerald-500/10 p-6 space-y-6 relative overflow-hidden border border-slate-700">
        <Header onSettingsClick={() => setIsSettingsOpen(true)} />
        <StatusDisplay
          status={connectionStatus}
          ipAddress={currentIp}
          duration={formatDuration(connectionDuration)}
        />
        <ConnectButton
          status={connectionStatus}
          onClick={handleConnectToggle}
        />
        <DataUsage
          upload={formatBytes(dataUsage.upload)}
          download={formatBytes(dataUsage.download)}
        />
        <ServerSelector
          server={selectedServer}
          onClick={() => setIsServerListOpen(true)}
        />
        
        {isServerListOpen && (
          <ServerList
            servers={SERVERS}
            selectedServerId={selectedServer.id}
            onSelect={handleServerSelect}
            onClose={() => setIsServerListOpen(false)}
          />
        )}

        {isSettingsOpen && (
           <SettingsPanel
             settings={settings}
             onSettingsChange={handleSettingsChange}
             onClose={() => setIsSettingsOpen(false)}
           />
        )}
      </main>
    </div>
  );
};

export default App;
