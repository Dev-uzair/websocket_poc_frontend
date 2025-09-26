import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = new Client({
      // Option 1: Direct WebSocket (if your backend supports it)
      // brokerURL: "ws://localhost:8080/ws",
      
      // Option 2: If you must use SockJS, configure it properly
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      
      onConnect: () => {
        console.log("Connected to WebSocket");
        setConnected(true);
        
        client.subscribe("/topic/messages", (message) => {
          if (message.body) {
            setMessages((prev) => [...prev, message.body]);
          }
        });
      },
      
      onDisconnect: () => {
        console.log("Disconnected");
        setConnected(false);
      },
      
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && connected) {
      stompClient.publish({
        destination: "/app/chat",
        body: "Hello from React",
      });
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <p>Status: {connected ? "Connected" : "Disconnected"}</p>
      <button onClick={sendMessage} disabled={!connected}>
        Send Message
      </button>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;