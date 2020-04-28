import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [deviceData, setDeviceData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://127.0.0.1:8888/devices')
            .then((response) => {
                setDeviceData(response.data.data);
                console.log(response.data);
                console.log(response.data.data[0].name);
                console.log(response.data.data[0].active);
            })
            .catch((error) => {
                //handle error
                console.log(error);
            })
            .finally(() => {
                //always executed
            });
        }
      
        fetchData();
    }, []);
    console.log(deviceData);
    console.log(deviceData.data);

    return (
        <div>
            <div className='instructions'>
                <h1>Relayr Device Dashboard</h1>
            </div>
            {deviceData.map((device, index) => (
                <div className='instructions' key={index}>
                    <h1>Device Name: {device.name}</h1>
                    <p>Device Unit: {device.unit}</p>
                    <p>Device Timestamp: {device.timestamp}</p>
                    <p>Device Value: {device.value}</p>
                    <p>Device Active: {String(device.active)}</p>
                    <button>Toggle Active Status</button>
                </div>
            ))}
        </div>
    );
}

export default App;
