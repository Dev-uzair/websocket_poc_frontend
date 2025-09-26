import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWebSocket } from '../hooks/useWebSocket';

const Navigation = () => {
  const location = useLocation();
  const { connected, connecting } = useWebSocket();

  const navStyle = {
    background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
    padding: '0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
  };

  const brandStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: '15px 0'
  };

  const navLinksStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '0'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '18px 20px',
    transition: 'background-color 0.3s',
    fontWeight: '500',
    borderBottom: '3px solid transparent'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomColor: '#ffffff'
  };

  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const statusIndicatorStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: connected ? '#28a745' : connecting ? '#ffc107' : '#dc3545'
  };

  const statusTextStyle = {
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '500'
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={brandStyle}>
          🔌 WebSocket POC
        </Link>

        <ul style={navLinksStyle}>
          <li>
            <Link
              to="/"
              style={isActive('/') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              🏠 Home
            </Link>
          </li>
          <li>
            <Link
              to="/chat"
              style={isActive('/chat') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/chat')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/chat')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              💬 Chat
            </Link>
          </li>
          <li>
            <Link
              to="/group"
              style={isActive('/group') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/group')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/group')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              👥 Group
            </Link>
          </li>
          <li>
            <Link
              to="/broadcast"
              style={isActive('/broadcast') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/broadcast')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/broadcast')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              📢 Broadcast
            </Link>
          </li>
          <li>
            <Link
              to="/demo"
              style={isActive('/demo') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/demo')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/demo')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              🔬 Demo
            </Link>
          </li>
          <li>
            <Link
              to="/docs"
              style={isActive('/docs') ? activeLinkStyle : linkStyle}
              onMouseEnter={(e) => {
                if (!isActive('/docs')) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/docs')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              📚 Docs
            </Link>
          </li>
        </ul>

        <div style={statusStyle}>
          <div style={statusIndicatorStyle}></div>
          <span style={statusTextStyle}>
            {connecting ? 'Connecting...' : connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;