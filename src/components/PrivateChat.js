import React, { useState } from 'react';
import { useSubscription } from '../hooks/useWebSocket';
import webSocketService from '../services/WebSocketService';

const PrivateChat = () => {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('User1');
  const [receiver, setReceiver] = useState('User2');
  const [message, setMessage] = useState('');

  useSubscription('/user/queue/messages', (message) => {
    console.log('Private message received:', message);
    setMessages(prev => [...prev, message]);
  }, []);

  const sendPrivateMessage = () => {
    if (!sender || !receiver || !message) {
      alert('Please fill in all fields: sender, receiver, and message');
      return;
    }

    const messageObj = {
      sender,
      receiver,
      message
    };

    const success = webSocketService.publish('/app/chat.private', messageObj);
    if (success) {
      setMessage('');
      console.log('Private message sent successfully');
    } else {
      alert('WebSocket not connected! Please connect first.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendPrivateMessage();
    }
  };

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Private Chat (1-to-1)</h3>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Your Name:</label>
        <input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>To User:</label>
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px', width: '200px' }}
        />
        <button
          onClick={sendPrivateMessage}
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
          Send Private
        </button>
      </div>

      <h4>Private Messages</h4>
      <div style={{
        height: '200px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: '10px',
        background: '#f9f9f9',
        margin: '10px 0'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            margin: '5px 0',
            padding: '5px',
            background: 'white',
            borderLeft: '4px solid #007bff'
          }}>
            <strong>{msg.sender} to {msg.receiver}:</strong> {msg.message}
            <small style={{ marginLeft: '10px', color: '#666' }}>
              ({new Date(msg.timestamp).toLocaleTimeString()})
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateChat;