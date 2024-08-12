// Functions

function showLocation(data) {
  document.getElementById('weather-location').innerHTML = data.location.name;
}

function showTemperature(data) {
  document.getElementById('weather-temperature').innerHTML = data.current.temp_c + '°C';
}

function showIcon(data) {
  document.getElementById('weather-icon').src = data.current.condition.icon;
}

async function getWeather() {
  const apiKey = '00b6182fc54d4fe39be191558241706';
  const location = 'M1V';
  const days = 5;
  // Note that the URL uses backticks instead of single quotes
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${days}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    document.getElementById('weather-all').innerHTML = JSON.stringify(data, null, 2);
  }
  catch (error) {
    console.error('Error fetching weather data:', error);
  }
}


// Event Listeners
window.addEventListener('load', getWeather);

