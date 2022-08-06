const KEY = "3322850824c94ab79c4164448220508";
let latitude = 0;
let longitude = 0;

// let button = document.getElementById("btn")
// button.addEventListener("click", getWeather)

document.addEventListener("DOMContentLoaded", ()=>{

    getLocation();

})



function getLocation(){
    if(navigator.geolocation){
        let x = navigator.geolocation.getCurrentPosition(currentLocation)
    }
    else{
        document.getElementById("test").innerHTML = "Not Supported"
    }
}


function currentLocation(location){
    lat = location.coords.latitude;
    lon = location.coords.longitude;
    document.getElementById("test").innerHTML = `Latitude: ${lat}   Longitude: ${lon}`
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

    document.getElementById("name").innerHTML = `Name: ${data.location.name}`;
    document.getElementById("region").innerHTML = `Region: ${data.location.region}`;
    document.getElementById("country").innerHTML = `Country: ${data.location.country}`;
    let loTime = new Date(data.location.localtime_epoch * 1000).toLocaleTimeString();
    document.getElementById("time").innerHTML = `Time: ${loTime}`;
    document.getElementById("temp").innerHTML = `Current-Temp: ${data.current.temp_c}C`;
    document.getElementById("feels-like").innerHTML = `Feels-Like: ${data.current.feelslike_c}C`;
    document.getElementById("humidity").innerHTML = `Humidity: ${data.current.humidity}`;

}



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