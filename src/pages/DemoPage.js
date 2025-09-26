import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import webSocketService from '../services/WebSocketService';

const DemoPage = () => {
  const [username, setUsername] = useState('anonymous');
  const { connected, connecting, connect, disconnect } = useWebSocket(username);

  const containerStyle = {
    maxWidth: '1000px',
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
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '8px',
    fontSize: '16px',
    fontWeight: 'bold'
  };

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

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>🔬 Demo & Testing</h1>

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

      {/* Demo Functions */}
      <div style={{
        background: 'white',
        margin: '20px 0',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
          Demo Functions
        </h2>

        <div style={{ margin: '20px 0' }}>
          <button
            onClick={() => testDemo('Hello from React demo!')}
            disabled={!connected}
            style={{
              ...buttonStyle,
              backgroundColor: !connected ? '#6c757d' : '#28a745'
            }}
          >
            🗨️ Demo Chat Message
          </button>

          <button
            onClick={() => testDemoNotification('Demo notification from React')}
            disabled={!connected}
            style={{
              ...buttonStyle,
              backgroundColor: !connected ? '#6c757d' : '#17a2b8'
            }}
          >
            🔔 Demo Notification
          </button>

          <button
            onClick={() => {
              window.location.reload();
            }}
            style={{
              ...buttonStyle,
              backgroundColor: '#6c757d'
            }}
          >
            🔄 Clear All Messages
          </button>
        </div>
      </div>

      {/* Testing Information */}
      <div style={{
        background: 'white',
        margin: '20px 0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
          Testing Guide
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ color: '#007bff', margin: '15px 0 10px 0' }}>Demo Chat</h4>
            <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
              Sends a test message through the chat system to verify bidirectional communication.
              Check the Chat page to see the message appear in real-time.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#007bff', margin: '15px 0 10px 0' }}>Demo Notification</h4>
            <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>
              Triggers a test notification broadcast to all connected clients.
              Check the Broadcast page to see the notification.
            </p>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div style={{
        background: 'white',
        margin: '20px 0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
          API Endpoints
        </h3>

        <div style={{ display: 'grid', gap: '10px' }}>
          <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px', fontFamily: 'monospace' }}>
            <strong>POST</strong> /api/demo/chat/{'{message}'} - Send demo chat message
          </div>
          <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px', fontFamily: 'monospace' }}>
            <strong>GET</strong> /api/demo/notification/{'{message}'} - Send demo notification
          </div>
          <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px', fontFamily: 'monospace' }}>
            <strong>POST</strong> /api/broadcast/notification - Broadcast notification
          </div>
          <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px', fontFamily: 'monospace' }}>
            <strong>POST</strong> /api/broadcast/data - Broadcast live data
          </div>
        </div>
      </div>

      {/* Connection Requirements */}
      <div style={{
        background: 'white',
        margin: '20px 0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
          Connection Requirements
        </h3>

        <ul style={{ color: '#666', lineHeight: '1.8' }}>
          <li><strong>Backend Server:</strong> Ensure the WebSocket server is running on localhost:8080</li>
          <li><strong>STOMP Protocol:</strong> Server must support STOMP over WebSocket</li>
          <li><strong>SockJS:</strong> Fallback transport for browsers that don't support WebSocket</li>
          <li><strong>Endpoints:</strong> Server should handle /ws endpoint for WebSocket connections</li>
        </ul>
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
          <strong>Note:</strong> Connect to WebSocket to enable demo functions
        </div>
      )}
    </div>
  );
};

export default DemoPage;