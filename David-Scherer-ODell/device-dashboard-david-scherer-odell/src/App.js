import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [deviceData, setDeviceData] = useState();
    //let devices;
    //setDeviceData(devices);

    useEffect(async () => {
        const devices = await axios.get('http://127.0.0.1:8888/devices')
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });
        setDeviceData(Array.from(devices));
    });

    console.log(deviceData);

    return (
        <div>
            <div className='instructions'>
                <h1>Relayr Device Dashboard</h1>
                <p>Feel free to implement UI the way you like.</p>
            </div>

            <div className='instructions'>
                <p>Device Name: {deviceData}</p>
                <p>Device Unit: {deviceData}</p>
            </div>
        </div>
    );
}

export default App;
