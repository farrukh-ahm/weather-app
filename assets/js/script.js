function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(currentLocation)
    }
    else{
        document.getElementById("test").innerHTML = "Not Supported"
    }
}


function currentLocation(location){
    console.log(location)
    document.getElementById("test").innerHTML = `Longitude: ${location.coords.longitude}`;
    document.getElementById("test").innerHTML += `Latitude: ${location.coords.latitude}`;

    let x = new Date();
    console.log(`Locale String: ${x.toLocaleString()}`);
    console.log(`Date String: ${x.toDateString()}`);
    console.log(`Locale Date String: ${x.toLocaleDateString()}`);
    console.log(`ISO String: ${x.toISOString()}`);
    console.log(`Locale Time String: ${x.toLocaleTimeString()}`);
    console.log(`String: ${x.toString()}`);
    console.log(`Time String: ${x.toTimeString()}`);
}

let button = document.getElementById("btn")
button.addEventListener("click", getLocation)


// unix to loca timestamp
// dt=new Date(1234567890 * 1000).toLocaleString(); gives date+time — or use .toLocaleDateString() or .toLocaleTimeString()