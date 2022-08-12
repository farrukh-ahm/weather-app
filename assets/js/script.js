const KEY = "3322850824c94ab79c4164448220508";
let latitude = 0;
let longitude = 0;
let insert;
let loading = document.getElementById("loading-box");

// let button = document.getElementById("btn")
// button.addEventListener("click", getWeather)

document.addEventListener("DOMContentLoaded", ()=>{
    getLocation();
    setInterval(displayTime, 100)

})



function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(currentLocation, errorCode)
    }
    else{
        document.getElementById("test").innerHTML = "Not Supported"
    }
}


function currentLocation(location){
    lat = location.coords.latitude;
    lon = location.coords.longitude;
    getWeather(lat, lon);
}


async function getWeather(lat, lon){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${lat},${lon}&aqi=no`);
    const data = await response.json();

    if(response.ok){
        console.log(data)
        displayData(data)
    }
    else{console.log("Error")}
}


function displayData(data){
    document.getElementById("data-wrapper").removeChild(loading);
    insert = "";
    insert = `<div id="temp"><h2>${data.current.temp_c} C</h2></div>`
    insert += `<p id="feels">Feels Like: ${data.current.feelslike_c} C</p>`
    insert += `<p id="humidity">Humidity: ${data.current.humidity}</p>`
    insert += `<img src="${data.current.condition.icon}" id="condition-icon">`
    insert += `<p id="condition">${data.current.condition.text}</p>`
    insert += `<p id="wind">Wind: ${data.current.wind_kph}kph</p>`
    insert += `<p id="location">${data.location.name}, ${data.location.region}, ${data.location.country}</p>`
    // let loTime = new Date(data.location.localtime_epoch * 1000).toLocaleTimeString();
    // insert += `<p id="time">${loTime}</p>`
    document.getElementById("container").insertAdjacentHTML("beforeend", insert);
    // document.getElementById("condition").style.backgroundImage = `url("${data.current.condition.icon}")`
}

function displayTime(){
    let currentTime = new Date()
    document.getElementById("time").innerText = currentTime.toLocaleTimeString();
}


function errorCode(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            alert("User denied the request for GeoLocation");
            break
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable");
            break
        case error.TIMEOUT:
            alert("The request timed out");
            break
        case error.UNKNOWN_ERROR:
            alert("An unknown error occured");
            break
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------

// unix to loca timestamp
// dt=new Date(1234567890 * 1000).toLocaleString(); gives date+time — or use .toLocaleDateString() or .toLocaleTimeString()

// let x = new Date();
    // console.log(`Locale String: ${x.toLocaleString()}`);
    // console.log(`Date String: ${x.toDateString()}`);
    // console.log(`Locale Date String: ${x.toLocaleDateString()}`);
    // console.log(`ISO String: ${x.toISOString()}`);
    // console.log(`Locale Time String: ${x.toLocaleTimeString()}`);
    // console.log(`String: ${x.toString()}`);
    // console.log(`Time String: ${x.toTimeString()}`);