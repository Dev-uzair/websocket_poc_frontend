import React, { useState } from 'react';
import { useSubscription } from '../hooks/useWebSocket';
import webSocketService from '../services/WebSocketService';

const UserPresence = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [userId, setUserId] = useState('user123');
  const [userStatus, setUserStatus] = useState('ONLINE');

  const statusOptions = [
    { value: 'ONLINE', label: 'Online', color: '#28a745' },
    { value: 'AWAY', label: 'Away', color: '#ffc107' },
    { value: 'BUSY', label: 'Busy', color: '#fd7e14' },
    { value: 'OFFLINE', label: 'Offline', color: '#dc3545' }
  ];

  useSubscription('/topic/presence', (presence) => {
    setActiveUsers(prev => {
      const existingUserIndex = prev.findIndex(user => user.userId === presence.userId);

      if (existingUserIndex !== -1) {
        // Update existing user
        const updatedUsers = [...prev];
        updatedUsers[existingUserIndex] = presence;
        return updatedUsers;
      } else {
        // Add new user
        return [...prev, presence];
      }
    });
  }, []);

  const updatePresence = () => {
    if (!userId) {
      alert('Please enter a user ID');
      return;
    }

    const presence = {
      userId,
      status: userStatus
    };

    const success = webSocketService.publish('/app/presence.update', presence);
    if (!success) {
      alert('WebSocket not connected! Please connect first.');
    }
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.color : '#6c757d';
  };

  const getStatusLabel = (status) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.label : status;
  };

  const clearUsers = () => {
    setActiveUsers([]);
  };

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>User Presence Tracking</h3>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Status:</label>
        <select
          value={userStatus}
          onChange={(e) => setUserStatus(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <button
          onClick={updatePresence}
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
          Update Presence
        </button>
        <button
          onClick={clearUsers}
          style={{
            background: '#6c757d',
            color: 'white',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
        >
          Clear Users
        </button>
      </div>

      <h4>Active Users ({activeUsers.length})</h4>
      <div style={{
        background: '#e9ecef',
        padding: '10px',
        borderRadius: '4px',
        minHeight: '150px',
        maxHeight: '200px',
        overflowY: 'auto'
      }}>
        {activeUsers.length === 0 ? (
          <div style={{ color: '#6c757d', fontStyle: 'italic', textAlign: 'center', marginTop: '20px' }}>
            No users currently tracked
          </div>
        ) : (
          activeUsers.map((user, index) => (
            <div key={index} style={{
              padding: '8px',
              margin: '5px 0',
              background: 'white',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: getStatusColor(user.status),
                  marginRight: '10px'
                }}></div>
                <strong>{user.userId}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#666' }}>
                <span style={{
                  background: getStatusColor(user.status),
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginRight: '8px'
                }}>
                  {getStatusLabel(user.status)}
                </span>
                {user.lastSeen && (
                  <small>
                    {new Date(user.lastSeen).toLocaleTimeString()}
                  </small>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserPresence;