import React, { useState } from 'react';
import { useSubscription } from '../hooks/useWebSocket';
import webSocketService from '../services/WebSocketService';

const ServiceUpdates = () => {
  const [serviceUpdates, setServiceUpdates] = useState([]);
  const [carId, setCarId] = useState('CAR001');
  const [updateMessage, setUpdateMessage] = useState('Service completed');

  useSubscription('/topic/service-updates', (update) => {
    setServiceUpdates(prev => [...prev, update]);
  }, []);

  const sendServiceUpdate = () => {
    if (!carId || !updateMessage) {
      alert('Please fill in car ID and update message');
      return;
    }

    const message = {
      carId,
      sender: 'system',
      message: updateMessage
    };

    const success = webSocketService.publish('/app/update', message);
    if (!success) {
      alert('WebSocket not connected! Please connect first.');
    }
  };

  const clearUpdates = () => {
    setServiceUpdates([]);
  };

  const getUpdateTypeIcon = (message) => {
    if (message.toLowerCase().includes('completed')) return '✅';
    if (message.toLowerCase().includes('started')) return '🔧';
    if (message.toLowerCase().includes('scheduled')) return '📅';
    if (message.toLowerCase().includes('cancelled')) return '❌';
    if (message.toLowerCase().includes('delayed')) return '⏰';
    return '📝';
  };

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Service Updates</h3>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Car ID:</label>
        <input
          type="text"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Update:</label>
        <input
          type="text"
          value={updateMessage}
          onChange={(e) => setUpdateMessage(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px', width: '200px' }}
        />
        <button
          onClick={sendServiceUpdate}
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
          Send Service Update
        </button>
      </div>

      <div style={{ margin: '10px 0' }}>
        <button
          onClick={clearUpdates}
          style={{
            background: '#6c757d',
            color: 'white',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Updates
        </button>
      </div>

      <h4>Service Updates</h4>
      <div style={{
        height: '200px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: '10px',
        background: '#f9f9f9',
        margin: '10px 0'
      }}>
        {serviceUpdates.length === 0 ? (
          <div style={{ color: '#6c757d', fontStyle: 'italic', textAlign: 'center', marginTop: '50px' }}>
            No service updates yet
          </div>
        ) : (
          serviceUpdates.map((update, index) => (
            <div key={index} style={{
              margin: '5px 0',
              padding: '8px',
              background: 'white',
              borderLeft: '4px solid #007bff',
              borderRadius: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '16px', marginRight: '8px' }}>
                  {getUpdateTypeIcon(update.message)}
                </span>
                <strong>Car {update.carId}</strong>
                <small style={{ marginLeft: 'auto', color: '#666' }}>
                  {new Date(update.timestamp).toLocaleTimeString()}
                </small>
              </div>
              <div style={{ marginLeft: '24px', color: '#555' }}>
                {update.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceUpdates;