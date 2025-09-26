import React, { useState } from 'react';
import { useSubscription } from '../hooks/useWebSocket';
import webSocketService from '../services/WebSocketService';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState('Test Notification');
  const [content, setContent] = useState('This is a test notification');
  const [severity, setSeverity] = useState('INFO');

  const severityOptions = [
    { value: 'INFO', label: 'Info' },
    { value: 'SUCCESS', label: 'Success' },
    { value: 'WARNING', label: 'Warning' },
    { value: 'ERROR', label: 'Error' }
  ];

  useSubscription('/topic/notifications', (notification) => {
    setNotifications(prev => [...prev, notification]);
  }, []);

  const sendNotification = async () => {
    if (!title || !content) {
      alert('Please fill in title and content');
      return;
    }

    const notification = {
      title,
      content,
      severity
    };

    const success = await webSocketService.sendNotification(notification);
    if (!success) {
      console.error('Failed to send notification');
    }
  };

  const getNotificationStyle = (severity) => {
    const baseStyle = {
      padding: '10px',
      margin: '5px 0',
      borderRadius: '4px'
    };

    switch (severity) {
      case 'INFO':
        return { ...baseStyle, background: '#d1ecf1', border: '1px solid #bee5eb' };
      case 'SUCCESS':
        return { ...baseStyle, background: '#d4edda', border: '1px solid #c3e6cb' };
      case 'WARNING':
        return { ...baseStyle, background: '#fff3cd', border: '1px solid #ffeaa7' };
      case 'ERROR':
        return { ...baseStyle, background: '#f8d7da', border: '1px solid #f5c6cb' };
      default:
        return baseStyle;
    }
  };

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Notifications</h3>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px', width: '200px' }}
        />
      </div>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Content:</label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px', width: '200px' }}
        />
      </div>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Severity:</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          {severityOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <button
          onClick={sendNotification}
          style={{
            background: '#007bff',
            color: 'white',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
        >
          Send Broadcast
        </button>
      </div>

      <h4>Notifications</h4>
      <div style={{
        height: '200px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: '10px',
        background: '#f9f9f9',
        margin: '10px 0'
      }}>
        {notifications.map((notification, index) => (
          <div key={index} style={getNotificationStyle(notification.severity)}>
            <strong>{notification.title}</strong><br />
            {notification.content}
            <small style={{ marginLeft: '10px', color: '#666' }}>
              ({new Date(notification.timestamp).toLocaleTimeString()})
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSystem;