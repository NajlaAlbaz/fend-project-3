/*

created by: Najla Albaz

*/
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const url = 'https://api.openweathermap.org/data/2.5/';
const key = '&APPID=178cf20f954b1bfb0d125c9b6a3c6198';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', action);

/* Function called by event listener */
function action(){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getDataFromAPI(url+`weather?zip=${zip}`+key).then((data)=>{
        postDataToServer('/addData', {'date': newDate, 'temp': data.main.temp, 'content': feelings});
    }).then(() => {
        updateUI();
        console.log('UI updated');
    });
}

/* Function to GET Web API Data*/
const getDataFromAPI = async (url = '') => {
    console.log('Client requesting data from API: ');
    const response = await fetch(url);

    try{
        let APIData = await response.json();
        console.log(APIData);
        return APIData;
    }catch(err){
        console.log(err, "error in getting data from web API");
    }
}


/* Function to POST data */
const postDataToServer = async (url = '', data = {}) => {
    console.log('Client posting data to server:');
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    try{
        let newData = await response.json();
        console.log(newData);
        return newData;
    }catch(err){
        console.log('Error posting data to server.', err);
    }
}

/* Function to GET Project Data */
const getData = async (url = '') => {
    console.log('Client getting server project data:');
    const response = await fetch(url);

    try{
        let data = await response.json();
        console.log(data);
        return data;
    }catch(err){
        console.log(err, "error in getting data from client");
    }
}


/* Function to update UI components */
const updateUI = async () => {
    try{
        let allData = await getData('/all');
        let data = allData[allData.length-1];
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.content;
    }catch(err){
        console.log(err, 'error updating UI');
    }
}