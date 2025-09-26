import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import UserPresence from '../components/UserPresence';
import ServiceUpdates from '../components/ServiceUpdates';

const GroupPage = () => {
  const [username, setUsername] = useState('anonymous');
  const { connected, connecting, connect, disconnect } = useWebSocket(username);

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

  const connectionSectionStyle = {
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
    marginTop: '20px'
  };

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>👥 Group Features</h1>

      {/* Connection Status */}
      <div style={connectionSectionStyle}>
        <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
          Connection Management
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

      {/* Group Features Grid */}
      <div style={gridStyle}>
        {/* User Presence */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
            User Presence
          </h3>
          <UserPresence />
        </div>

        {/* Service Updates */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
            Service Updates
          </h3>
          <ServiceUpdates />
        </div>
      </div>

      {/* Features Description */}
      <div style={{
        background: 'white',
        margin: '20px 0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
          Group Features Overview
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#007bff', margin: '10px 0' }}>User Presence</h4>
            <ul style={{ color: '#666', lineHeight: '1.6' }}>
              <li>Track who's online/offline</li>
              <li>Real-time status updates</li>
              <li>User activity monitoring</li>
              <li>Presence notifications</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#007bff', margin: '10px 0' }}>Service Updates</h4>
            <ul style={{ color: '#666', lineHeight: '1.6' }}>
              <li>System-wide announcements</li>
              <li>Service status changes</li>
              <li>Maintenance notifications</li>
              <li>Group coordination messages</li>
            </ul>
          </div>
        </div>
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
          <strong>Note:</strong> Connect to WebSocket to enable group features
        </div>
      )}
    </div>
  );
};

export default GroupPage;