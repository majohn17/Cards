async function getWeatherInfo(city) {
    const apiKey = 'f8d7314e87890b9ff6db65d1e9608a4a';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';
    const weatherIcon = document.getElementById('weather-icon');

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status == 404) {
            document.getElementById('weather-error').style.display = 'block';
            document.getElementById('weather-info').style.display = 'none';
        }
        else {
            const data = await response.json();
        
            document.getElementById('weather-city').innerHTML = data.name;
            document.getElementById('weather-temp').innerHTML = Math.round(data.main.temp) + '°F'
            document.getElementById('weather-humidity').innerHTML = data.main.humidity + '%';
            document.getElementById('weather-wind').innerHTML = data.wind.speed + ' mph';
        
            if(data.weather[0].main == 'Clouds') {
                weatherIcon.src = 'images/weather/clouds.png';
            }
            else if(data.weather[0].main == 'Clear') {
                weatherIcon.src = 'images/weather/clear.png';
            }
            else if(data.weather[0].main == 'Rain') {
                weatherIcon.src = 'images/weather/rain.png';
            }
            else if(data.weather[0].main == 'Drizzle') {
                weatherIcon.src = 'images/weather/drizzle.png';
            }
            else if(data.weather[0].main == 'Mist') {
                weatherIcon.src = 'images/weather/mist.png';
            }
        
            document.getElementById('weather-error').style.display = 'none';
            document.getElementById('weather-info').style.display = 'block';

            document.querySelector('#weather-search input').value = '';
        }
    }
    catch (err) {
        document.getElementById('weather-error').style.display = 'block';
        document.getElementById('weather-info').style.display = 'none';
    }
}

function registerUnfocus() {
    document.getElementById('weather-card').onmouseleave = () => {
        document.querySelector('#weather-search input').value = '';
        document.activeElement.blur();
    }
}

registerUnfocus();