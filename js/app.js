window.addEventListener("load", () =>{
    
    let cityZone = document.querySelector(".city-zone");
    let locationDay = document.querySelector(".location-day");
    let locationTime = document.querySelector(".location-time");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let temperatureSpan = document.querySelector(".temperature span");
    let tempDescription = document.querySelector(".temperature-description");
    let lat;
    let long;

    //get location of the user
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
            lat = position.coords.latitude;
            long = position.coords.longitude;

            //connect to the API
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/e81ae400aa6790b26d99ce873bfff85c/${lat},${long}`;

            //talk to api
            fetch(api)
            .then(repsonse =>{
                return repsonse.json();
            })
            .then(data =>{
                console.log(data);
                const {temperature, icon, summary, humidity, pressure, windspeed} = data.currently;

                cityZone.textContent = data.timezone;
                tempDescription.textContent = summary;
                temperatureDegree.textContent = temperature;


                setWeatherIcon(icon, document.querySelector(".icon"));
            })
        })
    }
    function setWeatherIcon(icon, iconID){
        const skycons = new Skycons({color: "red"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        //play animation
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
});