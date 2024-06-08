document.getElementById('fetchWeatherButton').addEventListener('click', fetchWeather);
document.getElementById('clearButton').addEventListener('click', clearWeather);

async function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '24d1ff8b1c9fa4a2709db758a7df98ed';  // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            handleErrors(data);
        }
    } catch (error) {
        alert('Error fetching weather data. Please try again.');
        console.error('Fetch error:', error);
    }
}

function handleErrors(data) {
    if (data.cod === '404') {
        alert('Location not found. Please try again.');
    } else if (data.cod === '401') {
        alert('Invalid API key. Please check your API key.');
    } else {
        alert('An error occurred: ' + data.message);
    }
}

function displayWeather(data) {
    document.getElementById('locationName').textContent = data.name;
    document.getElementById('weatherDescription').textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = `Visibility: ${data.visibility / 1000} km`;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.classList.add('visible');
    weatherDisplay.style.display = 'block';

    setBackground(data.weather[0].main);
}

function setBackground(weather) {
    let background = '';
    switch (weather.toLowerCase()) {
        case 'clear':
            background = 'linear-gradient(to right, #f7f7f7, #d7d7d7)';
            break;
        case 'clouds':
            background = 'linear-gradient(to right, #cfd9df, #e2ebf0)';
            break;
        case 'rain':
            background = 'linear-gradient(to right, #4e54c8, #8f94fb)';
            break;
        case 'snow':
            background = 'linear-gradient(to right, #e6e9f0, #eef1f5)';
            break;
        case 'thunderstorm':
            background = 'linear-gradient(to right, #141e30, #243b55)';
            break;
        default:
            background = 'linear-gradient(to right, #f7f7f7, #d7d7d7)';
    }
    document.body.style.background = background;
}

function clearWeather() {
    document.getElementById('locationInput').value = '';
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.classList.remove('visible');
    setTimeout(() => {
        weatherDisplay.style.display = 'none';
        document.getElementById('locationName').textContent = '';
        document.getElementById('weatherDescription').textContent = '';
        document.getElementById('temperature').textContent = '';
        document.getElementById('humidity').textContent = '';
        document.getElementById('windSpeed').textContent = '';
        document.getElementById('pressure').textContent = '';
        document.getElementById('visibility').textContent = '';
        document.getElementById('weatherIcon').src = '';
    }, 300);
}
