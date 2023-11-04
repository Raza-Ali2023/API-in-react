import { useState } from 'react';

function WeatherApp() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState('');
  const [error, setError] = useState('');

  const apiKey = '23a2652b429d0811593ec1c473bc54f3';

  const fetchWeatherData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const temperatureKelvin = data.main.temp;
        const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2); // Convert to Celsius and round to 2 decimal places
        const description = data.weather[0].description;

        const result = `Temperature: ${temperatureCelsius} °C<br>Weather: ${description}`;
        setWeatherData(result);
      })
      .catch((error) => {
        setError('Error: The city was not found');
      });
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        id="city"
        placeholder="Enter city name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button id="weather" onClick={fetchWeatherData}>
        Get Weather
      </button>
      <div id="weatherData" dangerouslySetInnerHTML={{ __html: weatherData }}></div>
    </div>
  );
}

export default WeatherApp;
