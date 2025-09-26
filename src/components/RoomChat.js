import React, { useState } from 'react';
import { useSubscription } from '../hooks/useWebSocket';
import webSocketService from '../services/WebSocketService';

const RoomChat = () => {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('User1');
  const [selectedRoom, setSelectedRoom] = useState('general');
  const [message, setMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);

  const rooms = [
    { value: 'general', label: 'General' },
    { value: 'tech-support', label: 'Tech Support' },
    { value: 'announcements', label: 'Announcements' }
  ];

  // Subscribe to all room topics
  useSubscription('/topic/room.general', (message) => {
    setMessages(prev => [...prev, { ...message, room: 'general' }]);
  }, []);

  useSubscription('/topic/room.tech-support', (message) => {
    setMessages(prev => [...prev, { ...message, room: 'tech-support' }]);
  }, []);

  useSubscription('/topic/room.announcements', (message) => {
    setMessages(prev => [...prev, { ...message, room: 'announcements' }]);
  }, []);

  useSubscription('/topic/demo-chat', (message) => {
    setMessages(prev => [...prev, { ...message, room: 'demo' }]);
  }, []);

  const joinRoom = () => {
    const messageObj = { sender };
    const success = webSocketService.publish(`/app/chat.join.${selectedRoom}`, messageObj);
    if (success) {
      setCurrentRoom(selectedRoom);
      console.log(`Joined room: ${selectedRoom}`);
    } else {
      alert('WebSocket not connected! Please connect first.');
    }
  };

  const sendRoomMessage = () => {
    if (!sender || !message || !selectedRoom) {
      alert('Please fill in all fields and select a room');
      return;
    }

    const messageObj = {
      sender,
      message
    };

    const success = webSocketService.publish(`/app/chat.room.${selectedRoom}`, messageObj);
    if (success) {
      setMessage('');
      console.log('Room message sent successfully');
    } else {
      alert('WebSocket not connected! Please connect first.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendRoomMessage();
    }
  };

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Group Chat Rooms</h3>

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
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Room:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          {rooms.map(room => (
            <option key={room.value} value={room.value}>{room.label}</option>
          ))}
        </select>
        <button
          onClick={joinRoom}
          style={{
            background: '#28a745',
            color: 'white',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
        >
          Join Room
        </button>
      </div>

      {currentRoom && (
        <div style={{ margin: '10px 0', padding: '5px', background: '#d4edda', borderRadius: '4px' }}>
          Currently in room: <strong>{rooms.find(r => r.value === currentRoom)?.label}</strong>
        </div>
      )}

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Room Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type room message..."
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px', width: '200px' }}
        />
        <button
          onClick={sendRoomMessage}
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
          Send to Room
        </button>
      </div>

      <h4>Room Messages</h4>
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
            <strong>
              {msg.room ? `[${msg.room}] ` : ''}{msg.sender}:
            </strong> {msg.message}
            <small style={{ marginLeft: '10px', color: '#666' }}>
              ({new Date(msg.timestamp).toLocaleTimeString()})
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomChat;