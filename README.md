# WebSocket POC - React Frontend

This React application demonstrates comprehensive WebSocket functionality including bidirectional chat, real-time notifications, live data streaming, and user presence tracking. Built with React 19, STOMP.js, and SockJS for robust WebSocket communication.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (requires backend at localhost:8080)
npm start

# Build for production
npm run build
```

Visit `http://localhost:3000` and navigate to **📚 Docs** for comprehensive documentation.

## 📋 Features

### 🔗 Connection Management
- Auto-connect on app load
- Manual connect/disconnect controls
- Real-time connection status display
- Username configuration

### 💬 Bidirectional Chat
- **Private Chat (1-to-1)**: Direct messaging between users
- **Group Chat Rooms**: Multiple room support (General, Tech Support, Announcements)
- Real-time message delivery
- Message history display

### 📢 Unidirectional Broadcasting
- **Notifications**: Broadcast system-wide notifications with severity levels
- **Live Data Streaming**: Real-time data updates (metrics, status, sensor data)
- Auto-simulation mode for demo purposes

### 👥 User Presence Tracking
- Online/Away/Busy/Offline status updates
- Real-time user list
- Status change broadcasting

### 📚 Documentation
- **Comprehensive Docs**: In-app documentation system with detailed API reference
- **Architecture Guide**: Complete frontend architecture documentation
- **Integration Flow**: Step-by-step WebSocket message flow diagrams
- **Component Reference**: Detailed component documentation with examples
- **Deployment Guide**: Production deployment instructions

## 📖 Documentation

This project includes comprehensive in-app documentation accessible via the **📚 Docs** section. The documentation covers:

- **Project Overview**: Features, architecture, and technology stack
- **Component Reference**: Detailed component APIs and usage examples
- **Backend Integration**: WebSocket protocol and message flow documentation
- **API Reference**: Complete STOMP and REST API documentation
- **Deployment Guide**: Production deployment and configuration instructions

## 🛠️ Technology Stack

- **React 19.1.1**: Modern React with hooks and functional components
- **React Router 7.9.2**: Client-side routing
- **@stomp/stompjs 7.1.1**: WebSocket messaging protocol
- **SockJS Client 1.6.1**: WebSocket fallback support
- **Create React App 5.0.1**: Build tooling and development server

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Backend WebSocket server running on `http://localhost:8080`
- Java 17+ (for running the Spring Boot backend)

### Installation
```bash
npm install
```

### Development
```bash
npm start
```
The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## WebSocket Configuration

The application connects to WebSocket server at:
- **URL**: `http://localhost:8080/ws`
- **Protocol**: SockJS + STOMP
- **User Parameter**: Configurable username in connection string

## API Endpoints

### WebSocket Topics (Subscribe)
- `/user/queue/messages` - Private messages
- `/topic/room.{roomName}` - Room messages
- `/topic/notifications` - System notifications
- `/topic/live-data` - Real-time data stream
- `/topic/presence` - User presence updates
- `/topic/service-updates` - Service notifications
- `/topic/demo-chat` - Demo messages

### WebSocket Destinations (Publish)
- `/app/chat.private` - Send private message
- `/app/chat.join.{roomName}` - Join chat room
- `/app/chat.room.{roomName}` - Send room message
- `/app/presence.update` - Update user presence
- `/app/update` - Send service update

### HTTP REST Endpoints
- `POST /api/broadcast/notification` - Send broadcast notification
- `POST /api/broadcast/data` - Send live data update
- `GET /api/demo/chat/{message}` - Demo chat test
- `GET /api/demo/notification/{message}` - Demo notification test

## Usage Examples

### Sending Private Messages
```javascript
const message = {
  sender: "User1",
  receiver: "User2",
  message: "Hello there!"
};
webSocketService.publish('/app/chat.private', message);
```

### Broadcasting Notifications
```javascript
const notification = {
  title: "System Alert",
  content: "Maintenance scheduled",
  severity: "WARNING"
};
webSocketService.sendNotification(notification);
```

### Updating User Presence
```javascript
const presence = {
  userId: "user123",
  status: "AWAY"
};
webSocketService.publish('/app/presence.update', presence);
```

## Architecture

### Components
- **WebSocketDemo**: Main container component
- **PrivateChat**: 1-to-1 messaging functionality
- **RoomChat**: Group chat rooms
- **NotificationSystem**: Broadcast notifications
- **LiveDataStream**: Real-time data streaming
- **UserPresence**: Presence tracking
- **ServiceUpdates**: Service notifications

### Services
- **WebSocketService**: Singleton service for WebSocket management
- **useWebSocket**: React hook for connection management
- **useSubscription**: React hook for topic subscriptions

## Demo Functions

The application includes demo buttons to test functionality:
- **Demo Chat**: Send test message to demo channel
- **Demo Notification**: Send test notification
- **Simulate Real-time Data**: Generate mock sensor data for 30 seconds
- **Clear All Messages**: Reset all message displays

## Responsive Design

The application is fully responsive and includes:
- Mobile-friendly layouts
- Touch-optimized buttons
- Scrollable message areas
- Collapsible sections on small screens

## Error Handling

- Connection state management
- Automatic reconnection
- Error notifications for failed operations
- Graceful degradation when disconnected

## Browser Compatibility

- Chrome/Chromium-based browsers
- Firefox
- Safari
- Edge

---

**Note**: Make sure your backend WebSocket server is running and configured to handle all the endpoints and topics listed above for full functionality.
