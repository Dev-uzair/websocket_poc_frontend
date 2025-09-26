import { useState, useEffect, useCallback } from 'react';
import webSocketService from '../services/WebSocketService';

export const useWebSocket = (username = 'anonymous') => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connect = useCallback(async () => {
    if (webSocketService.isConnected()) return;

    setConnecting(true);
    setError(null);
    try {
      await webSocketService.connect(username);
      setConnected(true);
    } catch (error) {
      console.error('Connection failed:', error);
      setConnected(false);
      setError(error.message);
    } finally {
      setConnecting(false);
    }
  }, [username]);

  const disconnect = useCallback(() => {
    webSocketService.disconnect();
    setConnected(false);
  }, []);

  useEffect(() => {
    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    webSocketService.onConnect(handleConnect);
    webSocketService.onDisconnect(handleDisconnect);

    // Auto-connect on mount
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return {
    connected,
    connecting,
    error,
    connect,
    disconnect
  };
};

export const useSubscription = (destination, callback, deps = []) => {
  useEffect(() => {
    if (!webSocketService.isConnected()) return;

    const subscription = webSocketService.subscribe(destination, callback);

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination, callback, ...deps]);
};

export default useWebSocket;