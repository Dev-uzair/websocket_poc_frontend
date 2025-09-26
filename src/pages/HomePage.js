import React from 'react';
import { Link } from 'react-router-dom';
import { useWebSocket } from '../hooks/useWebSocket';

const HomePage = () => {
  const { connected, connecting, error } = useWebSocket();

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    textAlign: 'center'
  };

  const headerStyle = {
    color: '#333',
    marginBottom: '30px',
    fontSize: '2.5rem'
  };

  const cardStyle = {
    background: 'white',
    margin: '20px 0',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'left'
  };

  const statusStyle = {
    padding: '12px 24px',
    borderRadius: '25px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'inline-block',
    marginBottom: '30px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    margin: '30px 0'
  };

  const linkCardStyle = {
    background: 'white',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: '#333',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  };

  const featureIconStyle = {
    fontSize: '2rem',
    marginBottom: '10px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>WebSocket POC Dashboard</h1>

      <div style={cardStyle}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Connection Status</h2>

        <span style={{
          ...statusStyle,
          backgroundColor: connected ? '#28a745' : connecting ? '#ffc107' : '#dc3545'
        }}>
          {connecting ? 'Connecting...' : connected ? 'Connected' : 'Disconnected'}
        </span>

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '4px',
            marginTop: '15px'
          }}>
            Error: {error}
          </div>
        )}
      </div>

      <div style={gridStyle}>
        <Link to="/chat" style={linkCardStyle} onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}>
          <div style={featureIconStyle}>💬</div>
          <h3 style={{ margin: '10px 0', color: '#007bff' }}>Chat</h3>
          <p style={{ color: '#666', margin: 0 }}>Private messaging and room-based chat functionality</p>
        </Link>

        <Link to="/group" style={linkCardStyle} onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}>
          <div style={featureIconStyle}>👥</div>
          <h3 style={{ margin: '10px 0', color: '#007bff' }}>Group Features</h3>
          <p style={{ color: '#666', margin: 0 }}>User presence and group collaboration tools</p>
        </Link>

        <Link to="/broadcast" style={linkCardStyle} onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}>
          <div style={featureIconStyle}>📢</div>
          <h3 style={{ margin: '10px 0', color: '#007bff' }}>Broadcast</h3>
          <p style={{ color: '#666', margin: 0 }}>Notifications and live data streaming</p>
        </Link>

        <Link to="/demo" style={linkCardStyle} onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}>
          <div style={featureIconStyle}>🔬</div>
          <h3 style={{ margin: '10px 0', color: '#007bff' }}>Demo & Testing</h3>
          <p style={{ color: '#666', margin: 0 }}>Demo functions and testing utilities</p>
        </Link>

        <Link to="/docs" style={linkCardStyle} onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }} onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}>
          <div style={featureIconStyle}>📚</div>
          <h3 style={{ margin: '10px 0', color: '#007bff' }}>Documentation</h3>
          <p style={{ color: '#666', margin: 0 }}>Comprehensive API and integration documentation</p>
        </Link>
      </div>

      {!connected && (
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          padding: '15px',
          borderRadius: '4px',
          margin: '30px 0'
        }}>
          <strong>Note:</strong> Connect to WebSocket to enable all features
        </div>
      )}
    </div>
  );
};

export default HomePage;