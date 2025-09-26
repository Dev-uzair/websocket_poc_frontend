import React, { useState } from 'react';
import { useSubscription } from '../hooks/useWebSocket';
import webSocketService from '../services/WebSocketService';

const LiveDataStream = () => {
  const [liveData, setLiveData] = useState([]);
  const [dataType, setDataType] = useState('METRICS');
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationInterval, setSimulationInterval] = useState(null);

  const dataTypes = [
    { value: 'METRICS', label: 'Metrics' },
    { value: 'STATUS', label: 'Status' },
    { value: 'SENSOR_DATA', label: 'Sensor Data' }
  ];

  useSubscription('/topic/live-data', (data) => {
    setLiveData(prev => [...prev, data]);
  }, []);

  const sendLiveData = async () => {
    const data = {
      dataType,
      source: 'demo-source',
      data: {
        value: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString(),
        unit: 'units'
      }
    };

    const success = await webSocketService.sendLiveData(data);
    if (!success) {
      console.error('Failed to send live data');
    }
  };

  const simulateRealTimeData = () => {
    if (simulationActive) {
      // Stop simulation
      if (simulationInterval) {
        clearInterval(simulationInterval);
        setSimulationInterval(null);
      }
      setSimulationActive(false);
      return;
    }

    // Start simulation
    setSimulationActive(true);
    const interval = setInterval(async () => {
      if (webSocketService.isConnected()) {
        const data = {
          dataType: 'METRICS',
          source: 'sensor-' + Math.floor(Math.random() * 5),
          data: {
            temperature: (20 + Math.random() * 10).toFixed(1),
            humidity: (40 + Math.random() * 20).toFixed(1),
            timestamp: new Date().toISOString()
          }
        };

        await webSocketService.sendLiveData(data);
      } else {
        clearInterval(interval);
        setSimulationActive(false);
        setSimulationInterval(null);
      }
    }, 2000);

    setSimulationInterval(interval);

    // Auto-stop after 30 seconds
    setTimeout(() => {
      if (interval) {
        clearInterval(interval);
        setSimulationActive(false);
        setSimulationInterval(null);
      }
    }, 30000);
  };

  const clearData = () => {
    setLiveData([]);
  };

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Live Data Streaming</h3>

      <div style={{ margin: '10px 0' }}>
        <label style={{ display: 'inline-block', width: '100px', fontWeight: 'bold' }}>Data Type:</label>
        <select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          {dataTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        <button
          onClick={sendLiveData}
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
          Send Live Data
        </button>
      </div>

      <div style={{ margin: '10px 0' }}>
        <button
          onClick={simulateRealTimeData}
          style={{
            background: simulationActive ? '#dc3545' : '#28a745',
            color: 'white',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          {simulationActive ? 'Stop Simulation' : 'Simulate Real-time Data'}
        </button>
        <button
          onClick={clearData}
          style={{
            background: '#6c757d',
            color: 'white',
            padding: '8px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Data
        </button>
      </div>

      {simulationActive && (
        <div style={{ margin: '10px 0', padding: '8px', background: '#d1ecf1', borderRadius: '4px' }}>
          <strong>Simulation Active:</strong> Sending sensor data every 2 seconds (auto-stops in 30s)
        </div>
      )}

      <h4>Live Data</h4>
      <div style={{
        height: '250px',
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: '10px',
        background: '#f9f9f9',
        margin: '10px 0'
      }}>
        {liveData.map((data, index) => (
          <div key={index} style={{
            margin: '5px 0',
            padding: '5px',
            background: 'white',
            borderLeft: '4px solid #007bff'
          }}>
            <strong>[{data.dataType}] {data.source}:</strong>
            <br />
            <code style={{ background: '#f8f9fa', padding: '2px 4px', borderRadius: '3px' }}>
              {JSON.stringify(data.data)}
            </code>
            <small style={{ marginLeft: '10px', color: '#666' }}>
              ({new Date(data.timestamp).toLocaleTimeString()})
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveDataStream;