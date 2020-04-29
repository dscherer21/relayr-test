import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    //State variable where the API response will be stored.
    const [deviceData, setDeviceData] = useState([]);
    const [searchDeviceElement, setSearchDeviceElement] = useState();
    // Variable that is grabbing the number of 'True' boolean values in the deviceData Array
    let activeDevices = deviceData.filter(device => device.active).length;
    //Variable that is grabbing the number of 'False' boolean values in the deviceData array
    let inactiveDevices = deviceData.filter(device => !device.active).length;

    useEffect(() => {
        const fetchData = () => {
            //Axios call to get the data from the backend API
            axios.get('http://127.0.0.1:8888/devices')
            .then((response) => {
                //setting the response as state
                setDeviceData(response.data.data);
                //logging the response in the console
                console.log(response.data);
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

    //Function that searches for the device name
    function searchDevices() {
        console.log(document.getElementById('searchParameter').value);
        //When the 'Search' button is clicked store the value of the input in the 'searchTerm' variable
        const searchTerm = document.getElementById('searchParameter').value;
        //Searching deviceData array for an object that matches the searchTerm value and storing it in a variable. The value will return undefined if nothing in the array matches.
        const searchDevices = deviceData.find((device) => device.name === searchTerm);
        
        if(searchDevices !== undefined) {
            //if searchDevices is not undefined generate a div with the device data
            setSearchDeviceElement(
                <div>
                    <h2>Device Name: {deviceData[deviceData.indexOf(searchDevices)].name}</h2>
                    <p>Device Unit: {deviceData[deviceData.indexOf(searchDevices)].unit}</p>
                    <p>Device Timestamp: {deviceData[deviceData.indexOf(searchDevices)].timestamp}</p>
                    <p>Device Value: {deviceData[deviceData.indexOf(searchDevices)].value}</p>
                    <p>Device Active: {String(deviceData[deviceData.indexOf(searchDevices)].active)}</p>
                    <button className={deviceData.indexOf(searchDevices)} onClick={toggleDeviceStatus}>Toggle Active Status</button>
                </div> 
            );
        } else {
            //if searchDevices returns undefined generate 'not found' message
            setSearchDeviceElement(
                <p>Sorry! Unfortunately, no devices match that name.</p>
            );
        }
    }

    function toggleDeviceStatus() {
        console.log('Button Clicked');
        console.log(document.getElementsByClassName().getAttribute('className'));
        //Axios call to get the data from the backend API
        /*axios.patch('http://127.0.0.1:8888/devices')
        .then((response) => {
            //setting the response as state
            setDeviceData(response.data.data);
            //logging the response in the console
            console.log(response.data);
        })
        .catch((error) => {
            //handle error
            console.log(error);
        })
        .finally(() => {
            //always executed
        });*/
    }

    return (
        <div>
            <div className='instructions'>
                <h1>Relayr Device Dashboard</h1>
            </div>
            <div className='instructions'>
                <h1>Device Search</h1>
                <input type='text' placeholder='Type device name here' id='searchParameter'/>
                <button onClick={searchDevices}>Search</button>
                {searchDeviceElement}
                
            </div>
            <div className='instructions'>
                <h1>Device Status</h1>
                <h2>Active Devices: {activeDevices}</h2>
                <h2>Inactive Devices: {inactiveDevices}</h2>
            </div>
            {deviceData.map((device, index) => (
                <div className='instructions' key={index}>
                    <h1>Device Name: {device.name}</h1>
                    <p>Device Unit: {device.unit}</p>
                    <p>Device Timestamp: {device.timestamp}</p>
                    <p>Device Value: {device.value}</p>
                    <p>Device Active: {String(device.active)}</p>
                    <button className={index} onClick={toggleDeviceStatus}>Toggle Active Status</button>
                </div>
            ))}
        </div>
    );
}

export default App;
