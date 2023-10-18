async function getWeatherInfo(city, doc) {
    const apiKey = "f8d7314e87890b9ff6db65d1e9608a4a";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
    var weatherIcon = doc.getElementById("weather-icon");

    try {
        var response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (repsponse.status == 404) {
            doc.getElementById("weather-error").style.display = "block";
            doc.getElementById("weather-info").style.display = "none";
        }
        else {
            var data = await response.json();
        
            doc.getElementById("weather-city").innerHTML = data.name;
            doc.getElementById("weather-temp").innerHTML = Math.round(data.main.temp) + "°F";
            doc.getElementById("weather-humidity").innerHTML = data.main.humidity + "%";
            doc.getElementById("weather-wind").innerHTML = data.wind.speed + " mph";
        
            if(data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/weather/clouds.png";
            }
            else if(data.weather[0].main == "Clear") {
                weatherIcon.src = "images/weather/clear.png";
            }
            else if(data.weather[0].main == "Rain") {
                weatherIcon.src = "images/weather/rain.png";
            }
            else if(data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/weather/drizzle.png";
            }
            else if(data.weather[0].main == "Mist") {
                weatherIcon.src = "images/weather/mist.png";
            }
        
            doc.getElementById("weather-error").style.display = "none";
            doc.getElementById("weather-info").style.display = "block";
        }
    }
    catch (err) {
        doc.getElementById("weather-error").style.display = "block";
        doc.getElementById("weather-info").style.display = "none";
    }
}