import { useState } from 'react';

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  };

  const sidebarStyle = {
    position: 'fixed',
    left: '20px',
    top: '100px',
    width: '250px',
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    height: 'calc(100vh - 140px)',
    overflowY: 'auto'
  };

  const contentStyle = {
    marginLeft: '290px',
    background: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    minHeight: '80vh'
  };

  const navItemStyle = {
    padding: '10px 15px',
    margin: '5px 0',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  };

  const activeNavItemStyle = {
    ...navItemStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  const codeBlockStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '4px',
    padding: '15px',
    margin: '15px 0',
    fontFamily: 'Monaco, Consolas, monospace',
    fontSize: '14px',
    overflow: 'auto'
  };

  const sections = [
    { id: 'overview', title: 'Project Overview' },
    { id: 'architecture', title: 'Frontend Architecture' },
    { id: 'components', title: 'Components' },
    { id: 'services', title: 'Services & Hooks' },
    { id: 'integration', title: 'Backend Integration' },
    { id: 'websocket-flow', title: 'WebSocket Flow' },
    { id: 'api-reference', title: 'API Reference' },
    { id: 'deployment', title: 'Deployment' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div>
            <h1>WebSocket POC Frontend Documentation</h1>
            <p>
              This React application demonstrates comprehensive WebSocket functionality including
              bidirectional chat, real-time notifications, live data streaming, and user presence tracking.
            </p>

            <h2>🚀 Features</h2>
            <ul>
              <li><strong>Private Chat:</strong> 1-to-1 messaging between users</li>
              <li><strong>Group Chat Rooms:</strong> Multi-user chat rooms with join/leave functionality</li>
              <li><strong>Real-time Notifications:</strong> System-wide and user-specific notifications</li>
              <li><strong>Live Data Streaming:</strong> Real-time data broadcasts and metrics</li>
              <li><strong>User Presence:</strong> Online/offline status tracking</li>
              <li><strong>Service Updates:</strong> System status updates and announcements</li>
            </ul>

            <h2>🛠️ Technology Stack</h2>
            <ul>
              <li><strong>React 19.1.1:</strong> Frontend framework</li>
              <li><strong>React Router 7.9.2:</strong> Client-side routing</li>
              <li><strong>STOMP.js (@stomp/stompjs 7.1.1):</strong> WebSocket messaging protocol</li>
              <li><strong>SockJS Client 1.6.1:</strong> WebSocket fallback support</li>
              <li><strong>Create React App 5.0.1:</strong> Build tooling and development server</li>
            </ul>

            <h2>📁 Project Structure</h2>
            <pre style={codeBlockStyle}>{`src/
├── components/           # Reusable UI components
│   ├── Navigation.js     # Top navigation bar
│   ├── PrivateChat.js    # 1-to-1 messaging component
│   ├── RoomChat.js       # Group chat component
│   ├── UserPresence.js   # User status display
│   ├── NotificationSystem.js  # Notification handling
│   ├── LiveDataStream.js # Real-time data display
│   └── WebSocketDemo.js  # Demo utilities
├── pages/               # Route-based page components
│   ├── HomePage.js      # Dashboard with feature overview
│   ├── ChatPage.js      # Chat functionality page
│   ├── GroupPage.js     # Group features page
│   ├── BroadcastPage.js # Broadcasting features
│   └── DemoPage.js      # Testing and demo utilities
├── services/            # Business logic and external integrations
│   └── WebSocketService.js  # WebSocket connection management
├── hooks/               # Custom React hooks
│   └── useWebSocket.js  # WebSocket state management
└── App.js              # Main application component`}</pre>
          </div>
        );

      case 'architecture':
        return (
          <div>
            <h1>Frontend Architecture</h1>

            <h2>🏗️ Component Architecture</h2>
            <p>
              The application follows a modular architecture with clear separation of concerns:
            </p>

            <h3>Pages (Route Components)</h3>
            <ul>
              <li><strong>HomePage:</strong> Dashboard showing connection status and feature navigation</li>
              <li><strong>ChatPage:</strong> Dedicated chat interface with private and room chat</li>
              <li><strong>GroupPage:</strong> User presence and group collaboration features</li>
              <li><strong>BroadcastPage:</strong> Notification and live data streaming interface</li>
              <li><strong>DemoPage:</strong> Testing utilities and demo functions</li>
            </ul>

            <h3>Reusable Components</h3>
            <ul>
              <li><strong>Navigation:</strong> Consistent navigation across all pages</li>
              <li><strong>PrivateChat:</strong> Encapsulated 1-to-1 messaging functionality</li>
              <li><strong>RoomChat:</strong> Group chat with room management</li>
              <li><strong>UserPresence:</strong> Real-time user status display</li>
              <li><strong>NotificationSystem:</strong> Toast notifications and alerts</li>
              <li><strong>LiveDataStream:</strong> Real-time data visualization</li>
            </ul>

            <h2>🔄 State Management</h2>
            <p>
              The application uses React's built-in state management with custom hooks:
            </p>
            <ul>
              <li><strong>useWebSocket:</strong> Connection state and lifecycle management</li>
              <li><strong>useSubscription:</strong> WebSocket topic subscriptions</li>
              <li><strong>Component State:</strong> Local state for UI interactions and message lists</li>
            </ul>

            <h2>🌐 Routing Strategy</h2>
            <p>
              React Router provides client-side navigation with feature-based routes:
            </p>
            <pre style={codeBlockStyle}>{`Routes:
/ - HomePage (Dashboard)
/chat - ChatPage (Private & Group Chat)
/group - GroupPage (User Presence)
/broadcast - BroadcastPage (Notifications & Live Data)
/demo - DemoPage (Testing Utilities)`}</pre>
          </div>
        );

      case 'components':
        return (
          <div>
            <h1>Components Reference</h1>

            <h2>🏠 HomePage</h2>
            <p><strong>Location:</strong> <code>src/pages/HomePage.js</code></p>
            <p>Main dashboard component displaying WebSocket connection status and navigation to features.</p>
            <h3>Key Features:</h3>
            <ul>
              <li>Real-time connection status indicator</li>
              <li>Feature cards with hover effects</li>
              <li>Connection error display</li>
              <li>Responsive grid layout</li>
            </ul>

            <h2>💬 PrivateChat</h2>
            <p><strong>Location:</strong> <code>src/components/PrivateChat.js</code></p>
            <p>Handles 1-to-1 messaging between users.</p>
            <h3>Props & State:</h3>
            <pre style={codeBlockStyle}>{`State:
- messages: Array of received private messages
- sender: Current user's name
- receiver: Target user's name
- message: Current message input

WebSocket Integration:
- Subscribes to: /user/queue/messages
- Publishes to: /app/chat.private`}</pre>

            <h2>👥 RoomChat</h2>
            <p><strong>Location:</strong> <code>src/components/RoomChat.js</code></p>
            <p>Group chat functionality with multiple room support.</p>
            <h3>Supported Rooms:</h3>
            <ul>
              <li><strong>general:</strong> Default public room</li>
              <li><strong>tech-support:</strong> Technical support discussions</li>
              <li><strong>announcements:</strong> Official announcements</li>
            </ul>
            <h3>WebSocket Integration:</h3>
            <pre style={codeBlockStyle}>{`Subscriptions:
- /topic/room.general
- /topic/room.tech-support
- /topic/room.announcements
- /topic/demo-chat

Publishing:
- /app/chat.join.[roomId] (to join room)
- /app/chat.room.[roomId] (to send message)`}</pre>

            <h2>🔔 NotificationSystem</h2>
            <p><strong>Location:</strong> <code>src/components/NotificationSystem.js</code></p>
            <p>Handles system notifications and alerts.</p>
            <h3>Notification Types:</h3>
            <ul>
              <li><strong>INFO:</strong> General information</li>
              <li><strong>WARNING:</strong> Warnings and cautions</li>
              <li><strong>ERROR:</strong> Error messages</li>
              <li><strong>SUCCESS:</strong> Success confirmations</li>
            </ul>

            <h2>📊 LiveDataStream</h2>
            <p><strong>Location:</strong> <code>src/components/LiveDataStream.js</code></p>
            <p>Displays real-time data streams and metrics.</p>
            <h3>Data Types:</h3>
            <ul>
              <li><strong>METRICS:</strong> System performance metrics</li>
              <li><strong>SENSOR:</strong> IoT sensor data</li>
              <li><strong>STATUS:</strong> Service status updates</li>
            </ul>

            <h2>👤 UserPresence</h2>
            <p><strong>Location:</strong> <code>src/components/UserPresence.js</code></p>
            <p>Tracks and displays user online/offline status.</p>
            <h3>Status Types:</h3>
            <ul>
              <li><strong>ONLINE:</strong> User is actively connected</li>
              <li><strong>AWAY:</strong> User is idle</li>
              <li><strong>OFFLINE:</strong> User has disconnected</li>
            </ul>
          </div>
        );

      case 'services':
        return (
          <div>
            <h1>Services & Hooks</h1>

            <h2>🔌 WebSocketService</h2>
            <p><strong>Location:</strong> <code>src/services/WebSocketService.js</code></p>
            <p>Singleton service managing WebSocket connections using STOMP protocol.</p>

            <h3>Core Methods:</h3>
            <pre style={codeBlockStyle}>{`// Connection Management
connect(username = 'anonymous'): Promise<Frame>
disconnect(): void
isConnected(): boolean

// Messaging
subscribe(destination, callback, headers = {}): Subscription
unsubscribe(destination): void
publish(destination, body, headers = {}): boolean

// Event Listeners
onConnect(callback): void
onDisconnect(callback): void

// REST API Integration
sendNotification(notification): Promise<boolean>
sendLiveData(data): Promise<boolean>
testDemo(message): Promise<boolean>`}</pre>

            <h3>Configuration:</h3>
            <pre style={codeBlockStyle}>{`WebSocket URL: ws://localhost:8080/ws
Protocol: STOMP over SockJS
Heartbeat: 4000ms (incoming/outgoing)
Reconnect Delay: 5000ms
Connection Timeout: 10000ms`}</pre>

            <h2>🎣 useWebSocket Hook</h2>
            <p><strong>Location:</strong> <code>src/hooks/useWebSocket.js</code></p>
            <p>React hook for WebSocket connection state management.</p>

            <h3>Return Values:</h3>
            <pre style={codeBlockStyle}>{`const {
  connected,    // boolean: connection status
  connecting,   // boolean: connection in progress
  error,        // string: connection error message
  connect,      // function: initiate connection
  disconnect    // function: close connection
} = useWebSocket(username);`}</pre>

            <h3>Automatic Behavior:</h3>
            <ul>
              <li>Auto-connects on component mount</li>
              <li>Auto-disconnects on component unmount</li>
              <li>Handles connection state transitions</li>
              <li>Provides error handling and recovery</li>
            </ul>

            <h2>🎣 useSubscription Hook</h2>
            <p><strong>Location:</strong> <code>src/hooks/useWebSocket.js</code></p>
            <p>React hook for managing WebSocket topic subscriptions.</p>

            <h3>Usage:</h3>
            <pre style={codeBlockStyle}>{`useSubscription('/topic/messages', (message) => {
  console.log('Received:', message);
  setMessages(prev => [...prev, message]);
}, [dependencies]);

// Automatically handles:
// - Subscription lifecycle
// - Connection state checking
// - Cleanup on unmount`}</pre>

            <h2>🌐 HTTP API Integration</h2>
            <p>WebSocketService also provides REST API methods for triggering server-side actions:</p>
            <pre style={codeBlockStyle}>{`// Broadcast notification to all users
POST /api/broadcast/notification
{
  "title": "System Alert",
  "content": "Maintenance starting soon",
  "severity": "WARNING"
}

// Send live data stream
POST /api/broadcast/data
{
  "dataType": "METRICS",
  "source": "server-1",
  "data": { "cpu": 75, "memory": 60 }
}

// Demo endpoints
GET /api/demo/chat/{message}
GET /api/demo/notification/{message}`}</pre>
          </div>
        );

      case 'integration':
        return (
          <div>
            <h1>Backend Integration</h1>

            <h2>🔗 WebSocket Connection</h2>
            <p>The frontend connects to a Spring Boot backend using STOMP over SockJS.</p>

            <h3>Connection Flow:</h3>
            <pre style={codeBlockStyle}>{`1. Client initiates connection to ws://localhost:8080/ws
2. SockJS negotiates transport (WebSocket preferred)
3. STOMP handshake establishes protocol
4. Client subscribes to relevant topics
5. Bidirectional messaging begins`}</pre>

            <h3>Authentication:</h3>
            <p>Username is passed as query parameter during connection:</p>
            <pre style={codeBlockStyle}>{`ws://localhost:8080/ws?user=john_doe`}</pre>

            <h2>📡 Message Destinations</h2>

            <h3>Client → Server (Publishing):</h3>
            <pre style={codeBlockStyle}>{`/app/chat.private          - Send private message
/app/chat.room.{roomId}     - Send message to room
/app/chat.join.{roomId}     - Join a chat room
/app/update                 - Send service update
/app/presence.update        - Update user presence`}</pre>

            <h3>Server → Client (Subscriptions):</h3>
            <pre style={codeBlockStyle}>{`/topic/notifications        - System notifications
/topic/live-data            - Live data streams
/topic/presence             - User presence updates
/topic/service-updates      - Service status updates
/topic/room.{roomId}        - Room-specific messages
/topic/demo-chat            - Demo messages
/user/queue/messages        - Private messages (user-specific)
/user/queue/notifications   - Private notifications (user-specific)`}</pre>

            <h2>🏗️ Backend Architecture</h2>
            <p>The Spring Boot backend provides:</p>

            <h3>WebSocket Configuration:</h3>
            <ul>
              <li><strong>Endpoint:</strong> `/ws` with SockJS fallback</li>
              <li><strong>Message Broker:</strong> Simple broker with `/topic` and `/queue` prefixes</li>
              <li><strong>Application Prefix:</strong> `/app` for client-to-server messages</li>
              <li><strong>User Prefix:</strong> `/user` for user-specific messages</li>
            </ul>

            <h3>Message Types:</h3>
            <pre style={codeBlockStyle}>{`ServiceMessage {
  sender: string
  receiver?: string
  message: string
  timestamp: Date
}

NotificationMessage {
  title: string
  content: string
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS'
  timestamp: Date
}

LiveDataMessage {
  dataType: 'METRICS' | 'SENSOR' | 'STATUS'
  source: string
  data: object
  timestamp: Date
}

UserPresence {
  username: string
  status: 'ONLINE' | 'AWAY' | 'OFFLINE'
  lastSeen: Date
}`}</pre>

            <h2>🔄 Data Flow</h2>
            <p>Typical message flow patterns:</p>

            <h3>Private Chat:</h3>
            <pre style={codeBlockStyle}>{`1. User A sends message to /app/chat.private
2. Backend processes and routes to User B
3. User B receives on /user/queue/messages
4. Message appears in User B's chat interface`}</pre>

            <h3>Group Chat:</h3>
            <pre style={codeBlockStyle}>{`1. User joins room via /app/chat.join.general
2. User sends message to /app/chat.room.general
3. Backend broadcasts to /topic/room.general
4. All room subscribers receive the message`}</pre>

            <h3>Notifications:</h3>
            <pre style={codeBlockStyle}>{`1. System/Admin triggers notification via REST API
2. Backend broadcasts to /topic/notifications
3. All connected clients receive notification
4. Frontend displays toast/alert to users`}</pre>
          </div>
        );

      case 'websocket-flow':
        return (
          <div>
            <h1>WebSocket Message Flow</h1>

            <h2>🔄 Connection Lifecycle</h2>
            <pre style={codeBlockStyle}>{`┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Spring Server  │
└─────────────────┘    └─────────────────┘
         │                       │
         │ 1. Connect Request     │
         │──────────────────────→│
         │                       │
         │ 2. SockJS Negotiation │
         │←─────────────────────→│
         │                       │
         │ 3. STOMP Handshake    │
         │←─────────────────────→│
         │                       │
         │ 4. Subscribe Topics   │
         │──────────────────────→│
         │                       │
         │ 5. Connection Ready   │
         │←──────────────────────│`}</pre>

            <h2>💬 Chat Message Flow</h2>

            <h3>Private Chat:</h3>
            <pre style={codeBlockStyle}>{`User A                    Server                    User B
  │                          │                          │
  │ 1. Send private msg      │                          │
  │────/app/chat.private────→│                          │
  │                          │                          │
  │                          │ 2. Route to User B       │
  │                          │──/user/queue/messages───→│
  │                          │                          │
  │ 3. Confirmation          │                          │
  │←─────────────────────────│                          │
  │                          │                          │
  │                          │                          │
  │                          │ 4. Message delivered     │
  │                          │←─────────────────────────│`}</pre>

            <h3>Group Chat:</h3>
            <pre style={codeBlockStyle}>{`User A              Server              All Room Members
  │                     │                        │
  │ 1. Join room        │                        │
  │──/app/chat.join────→│                        │
  │                     │                        │
  │ 2. Send room msg    │                        │
  │─/app/chat.room.X───→│                        │
  │                     │                        │
  │                     │ 3. Broadcast to room   │
  │                     │──/topic/room.X────────→│
  │                     │                        │
  │ 4. Receive own msg  │                        │
  │←────────────────────│                        │`}</pre>

            <h2>🔔 Notification Flow</h2>
            <pre style={codeBlockStyle}>{`Admin/System          Server              All Clients
     │                     │                     │
     │ 1. POST /api/       │                     │
     │    broadcast/       │                     │
     │    notification     │                     │
     │────────────────────→│                     │
     │                     │                     │
     │                     │ 2. Broadcast        │
     │                     │  /topic/           │
     │                     │  notifications     │
     │                     │────────────────────→│
     │                     │                     │
     │ 3. HTTP Response    │                     │
     │←────────────────────│                     │
     │                     │                     │
     │                     │                     │
     │                     │ 4. Display toast    │
     │                     │←────────────────────│`}</pre>

            <h2>📊 Live Data Streaming</h2>
            <pre style={codeBlockStyle}>{`Data Source          Server              All Subscribers
     │                     │                        │
     │ 1. POST /api/       │                        │
     │    broadcast/data   │                        │
     │────────────────────→│                        │
     │                     │                        │
     │                     │ 2. Stream to topic     │
     │                     │  /topic/live-data      │
     │                     │───────────────────────→│
     │                     │                        │
     │ 3. Success response │                        │
     │←────────────────────│                        │
     │                     │                        │
     │                     │                        │
     │                     │ 4. Update UI           │
     │                     │←───────────────────────│`}</pre>

            <h2>👤 Presence Updates</h2>
            <pre style={codeBlockStyle}>{`User                 Server              All Clients
  │                     │                      │
  │ 1. Status change    │                      │
  │  /app/presence.     │                      │
  │  update             │                      │
  │────────────────────→│                      │
  │                     │                      │
  │                     │ 2. Broadcast update  │
  │                     │  /topic/presence     │
  │                     │─────────────────────→│
  │                     │                      │
  │ 3. Update own UI    │                      │
  │←────────────────────│                      │
  │                     │                      │
  │                     │                      │
  │                     │ 4. Update presence   │
  │                     │  indicators          │
  │                     │←─────────────────────│`}</pre>

            <h2>⚠️ Error Handling</h2>
            <p>The system handles various error scenarios:</p>
            <ul>
              <li><strong>Connection Failure:</strong> Automatic reconnection with exponential backoff</li>
              <li><strong>Message Send Failure:</strong> User notification and retry option</li>
              <li><strong>Subscription Failure:</strong> Automatic resubscription on reconnect</li>
              <li><strong>Invalid Messages:</strong> Error logging and graceful degradation</li>
            </ul>
          </div>
        );

      case 'api-reference':
        return (
          <div>
            <h1>API Reference</h1>

            <h2>🔌 WebSocket STOMP Endpoints</h2>

            <h3>Client → Server (Application Destinations)</h3>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>/app/chat.private</code></h4>
              <p>Send a private message to a specific user.</p>
              <pre style={codeBlockStyle}>{`Payload: {
  "sender": "john_doe",
  "receiver": "jane_smith",
  "message": "Hello Jane!"
}`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>/app/chat.room.&#123;roomId&#125;</code></h4>
              <p>Send a message to a specific chat room.</p>
              <pre style={codeBlockStyle}>{`Payload: {
  "sender": "john_doe",
  "message": "Hello everyone!"
}

Examples:
- /app/chat.room.general
- /app/chat.room.tech-support
- /app/chat.room.announcements`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>/app/chat.join.&#123;roomId&#125;</code></h4>
              <p>Join a chat room.</p>
              <pre style={codeBlockStyle}>{`Payload: {
  "sender": "john_doe"
}`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>/app/presence.update</code></h4>
              <p>Update user presence status.</p>
              <pre style={codeBlockStyle}>{`Payload: {
  "username": "john_doe",
  "status": "ONLINE" | "AWAY" | "OFFLINE"
}`}</pre>
            </div>

            <h3>Server → Client (Subscription Topics)</h3>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>/topic/notifications</code></h4>
              <p>System-wide notifications broadcast to all users.</p>
              <pre style={codeBlockStyle}>{`Message: {
  "title": "System Alert",
  "content": "Maintenance window starts in 10 minutes",
  "severity": "WARNING",
  "timestamp": "2024-01-20T10:30:00Z"
}`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>/topic/live-data</code></h4>
              <p>Real-time data streams and metrics.</p>
              <pre style={codeBlockStyle}>{`Message: {
  "dataType": "METRICS",
  "source": "server-1",
  "data": {
    "cpu": 75.5,
    "memory": 60.2,
    "disk": 45.8
  },
  "timestamp": "2024-01-20T10:30:00Z"
}`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>/topic/presence</code></h4>
              <p>User presence updates.</p>
              <pre style={codeBlockStyle}>{`Message: {
  "username": "john_doe",
  "status": "ONLINE",
  "lastSeen": "2024-01-20T10:30:00Z"
}`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>/topic/room.&#123;roomId&#125;</code></h4>
              <p>Messages broadcasted to specific chat rooms.</p>
              <pre style={codeBlockStyle}>{`Message: {
  "sender": "john_doe",
  "message": "Welcome to the general room!",
  "timestamp": "2024-01-20T10:30:00Z"
}`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>/user/queue/messages</code></h4>
              <p>Private messages sent to a specific user.</p>
              <pre style={codeBlockStyle}>{`Message: {
  "sender": "jane_smith",
  "receiver": "john_doe",
  "message": "Hi John!",
  "timestamp": "2024-01-20T10:30:00Z"
}`}</pre>
            </div>

            <h2>🌐 REST API Endpoints</h2>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>POST /api/broadcast/notification</code></h4>
              <p>Broadcast a notification to all connected users.</p>
              <pre style={codeBlockStyle}>{`Request Body: {
  "title": "System Alert",
  "content": "Server maintenance scheduled",
  "severity": "INFO" | "WARNING" | "ERROR" | "SUCCESS"
}

Response: 200 OK (boolean success)`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>POST /api/broadcast/data</code></h4>
              <p>Broadcast live data to all subscribers.</p>
              <pre style={codeBlockStyle}>{`Request Body: {
  "dataType": "METRICS" | "SENSOR" | "STATUS",
  "source": "sensor-id-123",
  "data": {
    "temperature": 25.5,
    "humidity": 60.0
  }
}

Response: 200 OK (boolean success)`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>GET /api/users/active</code></h4>
              <p>Get list of currently active users.</p>
              <pre style={codeBlockStyle}>{`Response: [
  {
    "username": "john_doe",
    "status": "ONLINE",
    "lastSeen": "2024-01-20T10:30:00Z"
  },
  {
    "username": "jane_smith",
    "status": "AWAY",
    "lastSeen": "2024-01-20T10:25:00Z"
  }
]`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>GET /api/demo/chat/&#123;message&#125;</code></h4>
              <p>Demo endpoint to broadcast a chat message.</p>
              <pre style={codeBlockStyle}>{`URL: /api/demo/chat/Hello%20World
Response: 200 OK (message broadcasted to /topic/demo-chat)`}</pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h4><code>GET /api/demo/notification/&#123;message&#125;</code></h4>
              <p>Demo endpoint to send a notification.</p>
              <pre style={codeBlockStyle}>{`URL: /api/demo/notification/Test%20Alert
Response: 200 OK (notification sent to /topic/notifications)`}</pre>
            </div>

            <h2>⚙️ Configuration</h2>
            <pre style={codeBlockStyle}>{`WebSocket Configuration:
- Endpoint: ws://localhost:8080/ws
- SockJS Enabled: Yes
- STOMP Protocol: Yes
- Heartbeat Interval: 4000ms
- Reconnect Delay: 5000ms
- Connection Timeout: 10000ms

CORS Configuration:
- Allowed Origins: * (development)
- Allowed Methods: GET, POST
- Allowed Headers: Content-Type

Message Size Limits:
- Max Message Size: 64KB
- Max Buffer Size: 32KB`}</pre>
          </div>
        );

      case 'deployment':
        return (
          <div>
            <h1>Deployment Guide</h1>

            <h2>🏗️ Development Setup</h2>

            <h3>Prerequisites:</h3>
            <ul>
              <li>Node.js 16+ and npm</li>
              <li>Java 17+ (for backend)</li>
              <li>Spring Boot 3.5.5 backend running on port 8080</li>
            </ul>

            <h3>Installation:</h3>
            <pre style={codeBlockStyle}>{`# Clone the repository
git clone [repository-url]
cd websocket-chat

# Install dependencies
npm install

# Start development server
npm start

# Backend should be running at:
# http://localhost:8080`}</pre>

            <h3>Available Scripts:</h3>
            <pre style={codeBlockStyle}>{`npm start     # Start development server (port 3000)
npm build     # Build for production
npm test      # Run test suite
npm eject     # Eject from Create React App`}</pre>

            <h2>🚀 Production Build</h2>

            <h3>Build Process:</h3>
            <pre style={codeBlockStyle}>{`# Create optimized production build
npm run build

# Output directory: build/
# - Minified JavaScript bundles
# - Optimized CSS
# - Static assets
# - index.html entry point`}</pre>

            <h3>Environment Configuration:</h3>
            <p>Update WebSocket URL for production in <code>WebSocketService.js</code>:</p>
            <pre style={codeBlockStyle}>{`// Development
const wsUrl = 'http://localhost:8080/ws';

// Production
const wsUrl = 'wss://your-domain.com/ws';
// or
const wsUrl = \`\${window.location.protocol === 'https:' ? 'wss' : 'ws'}://\${window.location.host}/ws\`;`}</pre>

            <h2>🌐 Deployment Options</h2>

            <h3>Static Hosting (Netlify, Vercel, S3):</h3>
            <pre style={codeBlockStyle}>{`# Build the project
npm run build

# Deploy build/ directory to static hosting
# Configure backend CORS for your domain
# Update WebSocket URLs for production`}</pre>

            <h3>Docker Deployment:</h3>
            <pre style={codeBlockStyle}>{`# Dockerfile
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}</pre>

            <h3>Nginx Configuration:</h3>
            <pre style={codeBlockStyle}>{`# nginx.conf
server {
    listen 80;
    server_name your-domain.com;

    # Serve React app
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy WebSocket connections
    location /ws {
        proxy_pass http://backend:8080/ws;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Proxy API calls
    location /api {
        proxy_pass http://backend:8080/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`}</pre>

            <h2>🔧 Configuration Management</h2>

            <h3>Environment Variables:</h3>
            <pre style={codeBlockStyle}>{`# .env file
REACT_APP_WS_URL=ws://localhost:8080/ws
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_ENV=development

# Production .env
REACT_APP_WS_URL=wss://api.yourdomain.com/ws
REACT_APP_API_BASE_URL=https://api.yourdomain.com/api
REACT_APP_ENV=production`}</pre>

            <h3>Runtime Configuration:</h3>
            <p>For dynamic configuration, consider using a config endpoint:</p>
            <pre style={codeBlockStyle}>{`// config.js
const getConfig = async () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      wsUrl: 'ws://localhost:8080/ws',
      apiUrl: 'http://localhost:8080/api'
    };
  }

  // Fetch from backend config endpoint
  const response = await fetch('/api/config');
  return response.json();
};`}</pre>

            <h2>📊 Monitoring & Analytics</h2>

            <h3>Performance Monitoring:</h3>
            <ul>
              <li><strong>Web Vitals:</strong> Already integrated via <code>reportWebVitals.js</code></li>
              <li><strong>Connection Metrics:</strong> WebSocket connection success/failure rates</li>
              <li><strong>Message Metrics:</strong> Message send/receive rates and latency</li>
            </ul>

            <h3>Error Tracking:</h3>
            <pre style={codeBlockStyle}>{`// Add Sentry or similar error tracking
npm install @sentry/react

// In index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.REACT_APP_ENV
});`}</pre>

            <h2>🔒 Security Considerations</h2>

            <h3>Production Checklist:</h3>
            <ul>
              <li>✅ Use HTTPS/WSS in production</li>
              <li>✅ Implement proper CORS configuration</li>
              <li>✅ Add authentication/authorization</li>
              <li>✅ Validate all user inputs</li>
              <li>✅ Rate limit WebSocket connections</li>
              <li>✅ Implement message size limits</li>
              <li>✅ Add CSP headers</li>
              <li>✅ Regular dependency updates</li>
            </ul>

            <h3>WebSocket Security:</h3>
            <pre style={codeBlockStyle}>{`// Add authentication token to connection
const client = new Client({
  webSocketFactory: () => new SockJS(\`\${wsUrl}?token=\${authToken}\`),
  // ... other options
});

// Validate messages on both client and server
// Implement user permissions and access control
// Add message encryption for sensitive data`}</pre>
          </div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar Navigation */}
      <div style={sidebarStyle}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>📚 Documentation</h3>
        {sections.map(section => (
          <div
            key={section.id}
            style={activeSection === section.id ? activeNavItemStyle : navItemStyle}
            onClick={() => setActiveSection(section.id)}
            onMouseEnter={(e) => {
              if (activeSection !== section.id) {
                e.target.style.backgroundColor = '#f8f9fa';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== section.id) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            {section.title}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={contentStyle}>
        {renderContent()}
      </div>
    </div>
  );
};

export default DocsPage;