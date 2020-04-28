import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [deviceData, setDeviceData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://127.0.0.1:8888/devices')
            .then((response) => {
                //const data = Object.keys(response.data);
                setDeviceData(response.data);
                console.log(response.data);
                console.log(response.data.data[0].name);
            })
            .then(() => {
                console.log(deviceData);
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
        console.log(deviceData);
    }, []);

    return (
        <div>
            <div className='instructions'>
                <h1>Relayr Device Dashboard</h1>
                <p>Feel free to implement UI the way you like.</p>
            </div>

            <div className='instructions'>
                <p>Device Name: </p>
                <p>Device Unit: </p>
            </div>
            {Object.keys(deviceData).map((device, index) => (
                <div className='instructions' key={index}>
                    <h1>Device Name: {device}</h1>
                </div>
            ))}
        </div>
    );
}

export default App;
