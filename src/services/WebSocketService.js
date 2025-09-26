import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.subscribers = new Map();
    this.connectionCallbacks = [];
    this.disconnectionCallbacks = [];
  }

  connect(username = 'anonymous') {
    if (this.client && this.connected) {
      console.log('Already connected');
      return Promise.resolve();
    }

    console.log(`Attempting to connect to WebSocket as user: ${username}`);

    return new Promise((resolve, reject) => {
      // Clean up any existing client
      if (this.client) {
        this.client.deactivate();
        this.client = null;
      }

      this.client = new Client({
        webSocketFactory: () => new SockJS(`http://localhost:8080/ws?user=${encodeURIComponent(username)}`),

        onConnect: (frame) => {
          console.log('Connected: ' + frame);
          this.connected = true;
          this.connectionCallbacks.forEach(callback => callback(frame));
          resolve(frame);
        },

        onDisconnect: () => {
          console.log('Disconnected');
          this.connected = false;
          this.disconnectionCallbacks.forEach(callback => callback());
        },

        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
          this.connected = false;
          reject(new Error(frame.headers['message']));
        },

        onWebSocketError: (event) => {
          console.error('WebSocket connection error:', event);
          this.connected = false;
          reject(new Error('WebSocket connection failed'));
        },

        onWebSocketClose: (event) => {
          console.log('WebSocket connection closed:', event.code, event.reason);
          this.connected = false;
        },

        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => {
          console.log('STOMP: ' + str);
        }
      });

      // Set a timeout to reject if connection takes too long
      const timeoutId = setTimeout(() => {
        this.connected = false;
        if (this.client) {
          this.client.deactivate();
        }
        reject(new Error('WebSocket connection timeout'));
      }, 10000);

      // Clear timeout on successful connection
      const originalOnConnect = this.client.onConnect;
      this.client.onConnect = (frame) => {
        clearTimeout(timeoutId);
        originalOnConnect(frame);
      };

      // Clear timeout on error
      const originalOnWebSocketError = this.client.onWebSocketError;
      this.client.onWebSocketError = (event) => {
        clearTimeout(timeoutId);
        originalOnWebSocketError(event);
      };

      const originalOnStompError = this.client.onStompError;
      this.client.onStompError = (frame) => {
        clearTimeout(timeoutId);
        originalOnStompError(frame);
      };

      try {
        this.client.activate();
      } catch (error) {
        clearTimeout(timeoutId);
        console.error('Failed to activate client:', error);
        this.connected = false;
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      this.connected = false;
      this.subscribers.clear();
    }
  }

  subscribe(destination, callback, headers = {}) {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return null;
    }

    const subscription = this.client.subscribe(destination, (message) => {
      try {
        const parsedMessage = JSON.parse(message.body);
        callback(parsedMessage);
      } catch (error) {
        console.error('Error parsing message:', error);
        callback(message.body);
      }
    }, headers);

    this.subscribers.set(destination, subscription);
    return subscription;
  }

  unsubscribe(destination) {
    const subscription = this.subscribers.get(destination);
    if (subscription) {
      subscription.unsubscribe();
      this.subscribers.delete(destination);
    }
  }

  publish(destination, body, headers = {}) {
    if (!this.client || !this.connected) {
      console.error('WebSocket not connected');
      return false;
    }

    this.client.publish({
      destination,
      body: typeof body === 'string' ? body : JSON.stringify(body),
      headers
    });
    return true;
  }

  // HTTP API calls for REST endpoints
  async sendNotification(notification) {
    try {
      const response = await fetch('/api/broadcast/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification)
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  async sendLiveData(data) {
    try {
      const response = await fetch('/api/broadcast/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending live data:', error);
      return false;
    }
  }

  async testDemo(message) {
    try {
      const response = await fetch(`/api/demo/chat/${encodeURIComponent(message)}`);
      return response.ok;
    } catch (error) {
      console.error('Error in demo:', error);
      return false;
    }
  }

  async testDemoNotification(message) {
    try {
      const response = await fetch(`/api/demo/notification/${encodeURIComponent(message)}`);
      return response.ok;
    } catch (error) {
      console.error('Error in demo notification:', error);
      return false;
    }
  }

  // Event listeners
  onConnect(callback) {
    this.connectionCallbacks.push(callback);
  }

  onDisconnect(callback) {
    this.disconnectionCallbacks.push(callback);
  }

  isConnected() {
    return this.connected;
  }
}

// Singleton instance
const webSocketService = new WebSocketService();
export default webSocketService;