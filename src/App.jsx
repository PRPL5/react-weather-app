import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherArea from './components/WeatherArea';
import WeatherAreaRight from './components/WeatherAreaRight';
import WeatherWeek from './components/WeatherWeek';
import CityWeather from './components/CityWeather';
import "./scss/styles.css"
import MarketableArea from './components/MarketableArea';

const API_KEY = 'H58WMZYCZ9FEBWX3VQWZY9GQR';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [tempUnit, setTempUnit] = useState('C');

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          cityName
        )}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );
      const data = await response.json();
      console.log(data);

      const current = data.currentConditions;
      const today = data.days[0];
      const weeklyForecast = data.days.slice(0, 7).map((day) => ({
        date: day.datetime,
        description: day.conditions,
        temperature: Math.round(day.temp),
        temperatureF: Math.round(day.temp * 9 / 5 + 32),
        metric: 'C',
        icon: day.icon
          ? `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${day.icon}.png`
          : '',
      }));

      setWeatherData({
        location: `${data.address}`,
        time: new Date(current.datetimeEpoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        date: new Date(current.datetimeEpoch * 1000).toLocaleDateString(),
        temperature: Math.round(current.temp),
        temperatureF: Math.round(current.temp * 9 / 5 + 32),
        tempUnit,
        icon: current.icon
          ? `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${current.icon}.png`
          : '',
        description: current.conditions,
        feelsLike: Math.round(current.feelslike),
        feelsLikeF: Math.round(current.feelslike * 9 / 5 + 32),
        sunrise: today.sunrise,
        sunset: today.sunset,
        length: today.sunset && today.sunrise
          ? (() => {
            const [sh, sm] = today.sunrise.split(':').map(Number);
            const [eh, em] = today.sunset.split(':').map(Number);
            let start = sh * 60 + sm;
            let end = eh * 60 + em;
            let diff = end - start;
            return `${Math.floor(diff / 60)}h ${diff % 60}m`;
          })()
          : '',
        weeklyForecast,
      });
    } catch (error) {
      setWeatherData(null);
      alert('Could not fetch weather data.');
    }
  };

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };

  const handleTempToggle = () => {
    setTempUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <MarketableArea />
      <div className="content" style={{ flex: 1, minHeight: '100vh', height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap:'20px' }}>
        <SearchBar onSearch={handleSearch} />
        {weatherData && (
          <>
            <section className="top">
              <WeatherArea
                weatherData={weatherData}
                tempUnit={tempUnit}
                onTempToggle={handleTempToggle}
              />
              <WeatherAreaRight
                sunrise={weatherData.sunrise}
                sunset={weatherData.sunset}
                length={weatherData.length}
              />
            </section>
            <section className="bottom">
              <div className="weather-area-2">
                <div className="two">
                <h1 className="title">This Week</h1>
                <WeatherWeek weeklyForecast={weatherData.weeklyForecast} tempUnit={tempUnit} />
                </div>
              </div>
              <div className="cities">
                <CityWeather
                  city="London"
                  temperature={15}
                  temperatureF={Math.round(15 * 9 / 5 + 32)}
                  tempUnit={tempUnit}
                  weatherIcon={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/cloudy.png`}
                  description="Cloudy"
                />
                <CityWeather
                  city="Stockholm"
                  temperature={21}
                  temperatureF={Math.round(15 * 9 / 5 + 32)}
                  tempUnit={tempUnit}
                  weatherIcon={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/clear-day.png`}
                  description="Cloudy"
                />
              </div>
            </section>
          </>
        )}
      </div>
      <MarketableArea />
    </div>
  );
};

export default App;