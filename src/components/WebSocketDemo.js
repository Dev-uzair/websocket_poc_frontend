import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import webSocketService from '../services/WebSocketService';
import PrivateChat from './PrivateChat';
import RoomChat from './RoomChat';
import NotificationSystem from './NotificationSystem';
import LiveDataStream from './LiveDataStream';
import UserPresence from './UserPresence';
import ServiceUpdates from './ServiceUpdates';

const WebSocketDemo = () => {
  const [username, setUsername] = useState('anonymous');
  const { connected, connecting, connect, disconnect } = useWebSocket(username);

  const testDemo = async (message) => {
    const success = await webSocketService.testDemo(message);
    if (!success) {
      console.error('Demo test failed');
    }
  };

  const testDemoNotification = async (message) => {
    const success = await webSocketService.testDemoNotification(message);
    if (!success) {
      console.error('Demo notification failed');
    }
  };

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  };

  const statusSectionStyle = {
    background: 'white',
    margin: '20px 0',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  };

  const statusStyle = {
    padding: '8px 16px',
    borderRadius: '15px',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'inline-block',
    marginRight: '10px'
  };

  const buttonStyle = {
    background: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px',
    fontSize: '14px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  };

  const demoSectionStyle = {
    background: 'white',
    margin: '20px 0',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>WebSocket POC - Multiple Use Cases</h1>

      {/* Connection Status */}
      <div style={statusSectionStyle}>
        <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
          Connection Status
        </h2>

        <div style={{ margin: '20px 0' }}>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={connected}
            style={{
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginRight: '10px'
            }}
          />
        </div>

        <span style={{
          ...statusStyle,
          backgroundColor: connected ? '#28a745' : connecting ? '#ffc107' : '#dc3545'
        }}>
          {connecting ? 'Connecting...' : connected ? 'Connected' : 'Disconnected'}
        </span>

        <div style={{ marginTop: '15px' }}>
          <button
            onClick={handleConnect}
            disabled={connected || connecting}
            style={{
              ...buttonStyle,
              backgroundColor: connected || connecting ? '#6c757d' : '#28a745'
            }}
          >
            Connect
          </button>
          <button
            onClick={handleDisconnect}
            disabled={!connected}
            style={{
              ...buttonStyle,
              backgroundColor: !connected ? '#6c757d' : '#dc3545'
            }}
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Main Features Grid */}
      <div style={gridStyle}>
        {/* Chat Section */}
        <div>
          <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
            Bidirectional Chat
          </h2>
          <PrivateChat />
          <div style={{ marginTop: '20px' }}>
            <RoomChat />
          </div>
        </div>

        {/* Broadcasting Section */}
        <div>
          <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
            Unidirectional Broadcasting
          </h2>
          <NotificationSystem />
          <div style={{ marginTop: '20px' }}>
            <LiveDataStream />
          </div>
        </div>
      </div>

      {/* Secondary Features Grid */}
      <div style={gridStyle}>
        <UserPresence />
        <ServiceUpdates />
      </div>

      {/* Demo Functions */}
      <div style={demoSectionStyle}>
        <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
          Demo Functions
        </h2>
        <button
          onClick={() => testDemo('Hello from React demo!')}
          style={buttonStyle}
        >
          Demo Chat
        </button>
        <button
          onClick={() => testDemoNotification('Demo notification from React')}
          style={buttonStyle}
        >
          Demo Notification
        </button>
        <button
          onClick={() => {
            // Clear all message displays
            window.location.reload();
          }}
          style={{
            ...buttonStyle,
            backgroundColor: '#6c757d'
          }}
        >
          Clear All Messages
        </button>
      </div>

      {/* Status Information */}
      {!connected && (
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          padding: '15px',
          borderRadius: '4px',
          margin: '20px 0',
          textAlign: 'center'
        }}>
          <strong>Note:</strong> Connect to WebSocket to enable all features
        </div>
      )}
    </div>
  );
};

export default WebSocketDemo;