const KEY = "3322850824c94ab79c4164448220508";
let latitude = 0;
let longitude = 0;
let insert;
let insertForecast;
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
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
    getForecast(lat, lon);
}


async function getWeather(lat, lon){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${lat},${lon}&aqi=no`);
    const data = await response.json();

    if(response.ok){
        // console.log(data)
        displayData(data)
    }
    else{console.log("Error")}
}


async function getForecast(lat, lon){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${lat},${lon}&days=6&aqi=no&alerts=no`);
    const data = await response.json();

    if(response.ok){
        console.log(data)
        displayForecast(data);
    }
    else{console.log("Error")}
}


function displayData(data){
    document.getElementById("data-wrapper").removeChild(loading);
    insert = "";
    insert = `<div id="temp"><h2>${data.current.temp_c}<sup>o</sup> C</h2></div>`
    insert += `<p id="feels">Feels Like: ${data.current.feelslike_c}<sup>o</sup> C</p>`
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


function displayForecast(data){
    for(let i of data.forecast.forecastday){
        let dateFor = new Date(i.date_epoch * 1000).getDay();
        insertForecast = `<div class="forecast"><p>${DAYS[dateFor]}&nbsp;&nbsp; Max: ${i.day.maxtemp_c}<sup>o</sup> C | Min: ${i.day.mintemp_c}<sup>o</sup> C</p><img src="${i.day.condition.icon}" class="for_img"></div>`;
        document.getElementById("forecast-container").insertAdjacentHTML("beforeend", insertForecast);
        insertForecast = "";
        console.log(dateFor);
        console.log(i.day.maxtemp_c);
        console.log(i.day.mintemp_c);
        console.log(i.day.condition.icon);
    }
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