import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    //State variable where the API response will be stored.
    const [deviceData, setDeviceData] = useState([]);
    //State variable where the searchTerm entered into the searchbar is stored.
    const [searchDeviceElement, setSearchDeviceElement] = useState();
    //State variable used to store a status message during API calls
    const [statusMsg, setStatusMsg] =useState();
    // Variable that is grabbing the number of 'True' boolean values in the deviceData Array
    let activeDevices = deviceData.filter(device => device.active).length;
    //Variable that is grabbing the number of 'False' boolean values in the deviceData array
    let inactiveDevices = deviceData.filter(device => !device.active).length;
    //Variable that stroes the Axios call to fetch the API data
    const fetchData = () => {
        //Show an 'Updating' message while the API call is being made
        setStatusMsg(
            <h3>Updating...</h3>
        );
        //Axios call to get the data from the backend API
        axios.get('http://127.0.0.1:8888/devices')
        .then((response) => {
            //setting the response as state
            setDeviceData(response.data.data);
            //logging the response in the console
            console.log(response.data);
            //Remove the 'Updating' message once the API call clears
            setStatusMsg();
        })
        .catch((error) => {
            //handle error
            console.log(error);
            //Display 'Call Failed' message is API call fails
            setStatusMsg(
                <h3 style={{color: "red"}}>Failed to retrieve device data!</h3>
            );
        })
    }

    useEffect(() => {
        //Initial Axios call to get the data from the backend API when the page loads
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
                    <button data-value={deviceData.indexOf(searchDevices)} onClick={() => toggleDeviceStatus(deviceData[deviceData.indexOf(searchDevices)])}>Toggle Active Status</button>
                    {statusMsg}
                </div> 
            );
            
        } else {
            //if searchDevices returns undefined generate 'not found' message
            setSearchDeviceElement(
                <p>Sorry! Unfortunately, no devices match that name. Please type the full name of the device you are trying to find.</p>
            );
        }
        document.getElementById('searchParameter').value = '';
    }

    function toggleDeviceStatus(deviceValues) {
        console.log('Button Clicked');
        console.log(deviceValues);
        let readingName = deviceValues.name;
        let active = !deviceValues.active;

        //Axios patch call to send the updated data to the backend API
        axios.patch('http://127.0.0.1:8888/devices/' + readingName + '?active=' + active + '')
        .then(function (response) {
            console.log(response);
            //Axios call to resend the data if the patch call clears
            fetchData();
        })
        .catch(function (error) {
            console.log(error);
            //if patch call fails send 'Resquest Failed' message
            setStatusMsg(
                <h3 style={{color: "red"}}>Request Failed! Please try again later.</h3>
            );
        });
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
                    <button data-value={index} onClick={() => toggleDeviceStatus(device)}>Toggle Active Status</button>
                    {statusMsg}
                </div>
            ))}
        </div>
    );
}

export default App;
