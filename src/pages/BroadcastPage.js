import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import NotificationSystem from '../components/NotificationSystem';
import LiveDataStream from '../components/LiveDataStream';

const BroadcastPage = () => {
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
      <h1 style={headerStyle}>📢 Broadcast Features</h1>

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

      {/* Broadcast Features Grid */}
      <div style={gridStyle}>
        {/* Notification System */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
            Notification System
          </h3>
          <NotificationSystem />
        </div>

        {/* Live Data Stream */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
            Live Data Stream
          </h3>
          <LiveDataStream />
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
          Broadcasting Overview
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#007bff', margin: '10px 0' }}>Notification System</h4>
            <ul style={{ color: '#666', lineHeight: '1.6' }}>
              <li>Broadcast notifications to all users</li>
              <li>System alerts and announcements</li>
              <li>Real-time message delivery</li>
              <li>Notification history tracking</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#007bff', margin: '10px 0' }}>Live Data Stream</h4>
            <ul style={{ color: '#666', lineHeight: '1.6' }}>
              <li>Real-time data updates</li>
              <li>Live metrics and statistics</li>
              <li>Event streaming</li>
              <li>Data visualization updates</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Broadcasting Types */}
      <div style={{
        background: 'white',
        margin: '20px 0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
          Broadcasting Types
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
            <h5 style={{ color: '#007bff', margin: '0 0 10px 0' }}>🔔 Push Notifications</h5>
            <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Instant alerts to all connected clients</p>
          </div>
          <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
            <h5 style={{ color: '#007bff', margin: '0 0 10px 0' }}>📊 Data Updates</h5>
            <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Real-time data synchronization</p>
          </div>
          <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
            <h5 style={{ color: '#007bff', margin: '0 0 10px 0' }}>🌐 System Events</h5>
            <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Server-wide event broadcasting</p>
          </div>
          <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
            <h5 style={{ color: '#007bff', margin: '0 0 10px 0' }}>⚡ Live Updates</h5>
            <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Continuous data stream updates</p>
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
          <strong>Note:</strong> Connect to WebSocket to enable broadcast features
        </div>
      )}
    </div>
  );
};

export default BroadcastPage;