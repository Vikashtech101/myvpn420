
export interface Server {
  id: string;
  country: string;
  flag: string;
  city: string;
  ip: string;
}

export type Protocol = 'OpenVPN' | 'WireGuard';

export interface Settings {
  autoConnect: boolean;
  killSwitch: boolean;
  protocol: Protocol;
}

export enum ConnectionStatus {
  CONNECTED = "Connected",
  DISCONNECTED = "Not Connected",
  CONNECTING = "Connecting...",
  DISCONNECTING = "Disconnecting...",
}
